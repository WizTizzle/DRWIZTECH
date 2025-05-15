/*
  # Fix RLS policies for images table
  
  1. Changes
    - Drop existing policies
    - Create new policies with proper authentication checks
    - Add admin-only insert/update/delete policies
    
  2. Security
    - Public read access remains
    - Admin-only write operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view images" ON images;
DROP POLICY IF EXISTS "Authenticated users can manage images" ON images;

-- Create new policies
CREATE POLICY "Public can view images"
ON images FOR SELECT
USING (true);

CREATE POLICY "Admin can insert images"
ON images FOR INSERT
TO authenticated
WITH CHECK (auth.email() = current_setting('app.admin_email', true));

CREATE POLICY "Admin can update images"
ON images FOR UPDATE
TO authenticated
USING (auth.email() = current_setting('app.admin_email', true))
WITH CHECK (auth.email() = current_setting('app.admin_email', true));

CREATE POLICY "Admin can delete images"
ON images FOR DELETE
TO authenticated
USING (auth.email() = current_setting('app.admin_email', true));

-- Set admin email from environment variable
ALTER DATABASE postgres SET app.admin_email = 'paul@wiztech.zip';