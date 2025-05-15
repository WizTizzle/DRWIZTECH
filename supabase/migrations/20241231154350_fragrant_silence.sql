/*
  # Fix ENUM casting issues

  1. Changes
    - Add temporary column for status
    - Safely migrate existing data
    - Drop old column and rename new one
    
  2. Notes
    - Preserves existing data
    - Maintains referential integrity
    - Handles NULL values
*/

-- First create the ENUMs
CREATE TYPE case_status AS ENUM (
  'pending',
  'assessment_complete',
  'awaiting_device',
  'received',
  'in_progress',
  'recovered',
  'completed',
  'cancelled'
);

CREATE TYPE device_type AS ENUM (
  'internal_hdd',
  'external_hdd',
  'ssd',
  'nvme',
  'flash_drive',
  'memory_card',
  'raid'
);

CREATE TYPE severity_level AS ENUM (
  'standard',
  'moderate',
  'advanced'
);

-- Add new column with ENUM type
ALTER TABLE cases ADD COLUMN status_new case_status;

-- Update the new column based on existing values
DO $$ 
BEGIN 
  -- Set default value for existing rows
  UPDATE cases 
  SET status_new = 'pending'::case_status 
  WHERE status IS NULL;

  -- Map existing values to ENUM values
  UPDATE cases 
  SET status_new = status::case_status 
  WHERE status IS NOT NULL;
END $$;

-- Drop old column and rename new one
ALTER TABLE cases DROP COLUMN status;
ALTER TABLE cases RENAME COLUMN status_new TO status;

-- Set default for new rows
ALTER TABLE cases ALTER COLUMN status SET DEFAULT 'pending'::case_status;

-- Repeat for device_type
ALTER TABLE cases ADD COLUMN device_type_new device_type;

DO $$ 
BEGIN 
  UPDATE cases 
  SET device_type_new = device_type::device_type 
  WHERE device_type IS NOT NULL;
END $$;

ALTER TABLE cases DROP COLUMN device_type;
ALTER TABLE cases RENAME COLUMN device_type_new TO device_type;

-- Add other columns and indexes
ALTER TABLE cases ADD COLUMN IF NOT EXISTS priority smallint DEFAULT 3;
ALTER TABLE cases ADD COLUMN IF NOT EXISTS estimated_completion date;

-- Add communication preferences to customers
ALTER TABLE customers ADD COLUMN IF NOT EXISTS preferred_contact text DEFAULT 'email';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{"email": true, "sms": false}'::jsonb;

-- Add severity level to assessments with the same pattern
ALTER TABLE assessments ADD COLUMN severity_new severity_level;

DO $$ 
BEGIN 
  UPDATE assessments 
  SET severity_new = severity::severity_level 
  WHERE severity IS NOT NULL;
END $$;

ALTER TABLE assessments DROP COLUMN severity;
ALTER TABLE assessments RENAME COLUMN severity_new TO severity;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cases_customer_id ON cases(customer_id);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at);
CREATE INDEX IF NOT EXISTS idx_assessments_case_id ON assessments(case_id);
CREATE INDEX IF NOT EXISTS idx_shipping_info_case_id ON shipping_info(case_id);
CREATE INDEX IF NOT EXISTS idx_case_updates_case_id ON case_updates(case_id);