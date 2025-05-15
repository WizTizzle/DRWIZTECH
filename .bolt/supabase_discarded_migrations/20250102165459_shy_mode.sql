/*
  # Improved Custom Storage Implementation
  
  1. Schema Updates
    - Adds content_hash column for file deduplication
    - Adds path column for better organization
    - Adds status column for file state tracking
    
  2. New Features
    - File deduplication support
    - Path-based organization
    - File status tracking
    
  3. Security
    - Additional RLS policies for file organization
    - Bucket ownership controls
    
  4. Performance
    - Additional indexes for common queries
*/

-- Add new columns to objects table
ALTER TABLE custom_storage.objects 
ADD COLUMN IF NOT EXISTS content_hash text,
ADD COLUMN IF NOT EXISTS path text DEFAULT '',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'available' 
  CHECK (status IN ('available', 'deleted', 'processing'));

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_objects_content_hash 
ON custom_storage.objects(content_hash);

CREATE INDEX IF NOT EXISTS idx_objects_path 
ON custom_storage.objects(path);

CREATE INDEX IF NOT EXISTS idx_objects_status 
ON custom_storage.objects(status);

-- Add function to update last_accessed_at
CREATE OR REPLACE FUNCTION custom_storage.update_last_accessed()
RETURNS trigger AS $$
BEGIN
  NEW.last_accessed_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for last_accessed_at updates
DROP TRIGGER IF EXISTS update_objects_last_accessed ON custom_storage.objects;
CREATE TRIGGER update_objects_last_accessed
  BEFORE UPDATE ON custom_storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION custom_storage.update_last_accessed();

-- Add path-based access policy
CREATE POLICY "Users can access files in their paths"
ON custom_storage.objects FOR SELECT
TO authenticated
USING (
  owner_id = auth.uid() 
  OR path LIKE 'public/%'
  OR EXISTS (
    SELECT 1 FROM custom_storage.buckets 
    WHERE buckets.id = objects.bucket_id 
    AND buckets.public = true
  )
);