/*
  # WizTech Data Recovery Database Schema

  1. New Tables
    - `assessments`
      - Stores customer assessment responses and results
      - Links to cases for tracking
    
    - `shipping_info`
      - Stores customer shipping details for mail-in service
      - Links to cases for tracking

    - `case_updates`
      - Tracks progress updates for recovery cases
      - Enables customer communication

  2. Security
    - Enable RLS on all tables
    - Add policies for customer data access
    - Add policies for staff access (future)
*/

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES cases(id),
  answers jsonb NOT NULL,
  severity text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create shipping_info table
CREATE TABLE IF NOT EXISTS shipping_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES cases(id),
  address1 text NOT NULL,
  address2 text,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  country text NOT NULL,
  shipping_notes text,
  created_at timestamptz DEFAULT now()
);

-- Create case_updates table
CREATE TABLE IF NOT EXISTS case_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid REFERENCES cases(id),
  status text NOT NULL,
  message text NOT NULL,
  staff_notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_updates ENABLE ROW LEVEL SECURITY;

-- Create policies for assessments
CREATE POLICY "Users can read own assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM cases 
    WHERE cases.id = assessments.case_id 
    AND cases.customer_id = auth.uid()
  ));

-- Create policies for shipping_info
CREATE POLICY "Users can read own shipping info"
  ON shipping_info
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM cases 
    WHERE cases.id = shipping_info.case_id 
    AND cases.customer_id = auth.uid()
  ));

-- Create policies for case_updates
CREATE POLICY "Users can read own case updates"
  ON case_updates
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM cases 
    WHERE cases.id = case_updates.case_id 
    AND cases.customer_id = auth.uid()
  ));