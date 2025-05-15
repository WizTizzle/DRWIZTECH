/*
  # Update case management schema
  
  1. Changes
    - Add priority and estimated completion to cases
    - Add communication preferences to customers
    - Add indexes for performance optimization
    - Add RLS policies for data access
*/

-- Add priority field to cases if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'priority'
  ) THEN
    ALTER TABLE cases ADD COLUMN priority smallint DEFAULT 3;
  END IF;
END $$;

-- Add estimated completion if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'cases' AND column_name = 'estimated_completion'
  ) THEN
    ALTER TABLE cases ADD COLUMN estimated_completion date;
  END IF;
END $$;

-- Add communication preferences to customers if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customers' AND column_name = 'preferred_contact'
  ) THEN
    ALTER TABLE customers ADD COLUMN preferred_contact text DEFAULT 'email';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'customers' AND column_name = 'notification_preferences'
  ) THEN
    ALTER TABLE customers ADD COLUMN notification_preferences jsonb DEFAULT '{"email": true, "sms": false}'::jsonb;
  END IF;
END $$;

-- Add indexes for better performance if they don't exist
CREATE INDEX IF NOT EXISTS idx_cases_customer_id ON cases(customer_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at);
CREATE INDEX IF NOT EXISTS idx_assessments_case_id ON assessments(case_id);
CREATE INDEX IF NOT EXISTS idx_shipping_info_case_id ON shipping_info(case_id);
CREATE INDEX IF NOT EXISTS idx_case_updates_case_id ON case_updates(case_id);

-- Add RLS policies for insert operations
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'cases' AND policyname = 'Users can insert own cases'
  ) THEN
    CREATE POLICY "Users can insert own cases"
      ON cases
      FOR INSERT
      TO authenticated
      WITH CHECK (customer_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'assessments' AND policyname = 'Users can insert own assessments'
  ) THEN
    CREATE POLICY "Users can insert own assessments"
      ON assessments
      FOR INSERT
      TO authenticated
      WITH CHECK (EXISTS (
        SELECT 1 FROM cases 
        WHERE cases.id = case_id 
        AND cases.customer_id = auth.uid()
      ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'shipping_info' AND policyname = 'Users can insert own shipping info'
  ) THEN
    CREATE POLICY "Users can insert own shipping info"
      ON shipping_info
      FOR INSERT
      TO authenticated
      WITH CHECK (EXISTS (
        SELECT 1 FROM cases 
        WHERE cases.id = case_id 
        AND cases.customer_id = auth.uid()
      ));
  END IF;
END $$;

-- Add RLS policies for update operations
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'cases' AND policyname = 'Users can update own cases'
  ) THEN
    CREATE POLICY "Users can update own cases"
      ON cases
      FOR UPDATE
      TO authenticated
      USING (customer_id = auth.uid())
      WITH CHECK (customer_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'shipping_info' AND policyname = 'Users can update own shipping info'
  ) THEN
    CREATE POLICY "Users can update own shipping info"
      ON shipping_info
      FOR UPDATE
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM cases 
        WHERE cases.id = case_id 
        AND cases.customer_id = auth.uid()
      ))
      WITH CHECK (EXISTS (
        SELECT 1 FROM cases 
        WHERE cases.id = case_id 
        AND cases.customer_id = auth.uid()
      ));
  END IF;
END $$;