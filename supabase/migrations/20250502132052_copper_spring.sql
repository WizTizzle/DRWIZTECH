/*
  # Add location tracking to images table
  
  1. Changes
    - Add location column to images table
    - Add unique constraint on location
    - Add index for faster lookups
    
  2. Security
    - Update RLS policies for location-based access
*/

-- Add location column
ALTER TABLE images ADD COLUMN location text;

-- Add unique constraint to prevent duplicates
ALTER TABLE images ADD CONSTRAINT unique_image_location UNIQUE (location);

-- Add index for faster lookups
CREATE INDEX idx_images_location ON images(location);

-- Update RLS policies
CREATE POLICY "Public can view images"
ON images FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage images"
ON images FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);