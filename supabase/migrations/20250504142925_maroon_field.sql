/*
  # Simplify RLS policies for images table
  
  1. Changes
    - Drop existing complex policies
    - Create simplified policies using direct email check
    - Maintain public read access
    
  2. Security
    - Public read access remains unchanged
    - Write operations restricted to admin email
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Debug insert images" ON images;
DROP POLICY IF EXISTS "Debug update images" ON images;
DROP POLICY IF EXISTS "Debug delete images" ON images;

-- Create new simplified policies
CREATE POLICY "Admin can insert images"
ON images FOR INSERT
TO authenticated
WITH CHECK (auth.email() = current_setting('app.admin_email'));

CREATE POLICY "Admin can update images"
ON images FOR UPDATE
TO authenticated
USING (auth.email() = current_setting('app.admin_email'))
WITH CHECK (auth.email() = current_setting('app.admin_email'));

CREATE POLICY "Admin can delete images"
ON images FOR DELETE
TO authenticated
USING (auth.email() = current_setting('app.admin_email'));

-- Set admin email
ALTER DATABASE postgres SET "app.admin_email" TO 'paul@wiztech.zip';