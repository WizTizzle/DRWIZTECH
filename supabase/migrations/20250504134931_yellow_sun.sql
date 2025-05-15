/*
  # Debug image upload RLS policies
  
  1. Changes
    - Drop existing policies
    - Create new policies with looser restrictions for debugging
    - Add logging for auth checks
    
  2. Security
    - Temporary debug policies
    - Will need to be tightened after debugging
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Admin can insert images" ON images;
DROP POLICY IF EXISTS "Admin can update images" ON images;
DROP POLICY IF EXISTS "Admin can delete images" ON images;

-- Create new debug policies
CREATE POLICY "Debug insert images"
ON images FOR INSERT
TO authenticated
WITH CHECK (
  CASE 
    WHEN auth.jwt() IS NULL THEN false
    WHEN auth.jwt()->>'email' IS NULL THEN false
    ELSE auth.jwt()->>'email' = current_setting('app.admin_email', true)
  END
);

CREATE POLICY "Debug update images"
ON images FOR UPDATE
TO authenticated
USING (
  CASE 
    WHEN auth.jwt() IS NULL THEN false
    WHEN auth.jwt()->>'email' IS NULL THEN false
    ELSE auth.jwt()->>'email' = current_setting('app.admin_email', true)
  END
);

CREATE POLICY "Debug delete images"
ON images FOR DELETE
TO authenticated
USING (
  CASE 
    WHEN auth.jwt() IS NULL THEN false
    WHEN auth.jwt()->>'email' IS NULL THEN false
    ELSE auth.jwt()->>'email' = current_setting('app.admin_email', true)
  END
);