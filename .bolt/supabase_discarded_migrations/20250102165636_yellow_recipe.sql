/*
  # Complete Storage System Setup
  
  1. Schema Creation
    - Creates custom_storage schema
    - Sets up buckets and objects tables
    - Adds necessary indexes
    
  2. Security
    - Enables RLS
    - Creates comprehensive access policies
    
  3. Features
    - File metadata tracking
    - Access timestamps
    - Content hashing
    - Path-based organization
*/

-- Create schema
CREATE SCHEMA IF NOT EXISTS custom_storage;

-- Create buckets table
CREATE TABLE IF NOT EXISTS custom_storage.buckets (
  id text PRIMARY KEY,
  name text NOT NULL,
  public boolean DEFAULT false,
  owner_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(name)
);

-- Create objects table
CREATE TABLE IF NOT EXISTS custom_storage.objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_id text NOT NULL REFERENCES custom_storage.buckets(id),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  size bigint,
  mime_type text,
  content_hash text,
  path text DEFAULT '',
  metadata jsonb,
  status text DEFAULT 'available' CHECK (status IN ('available', 'deleted', 'processing')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  UNIQUE (bucket_id, path, name)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_objects_bucket_name ON custom_storage.objects(bucket_id, name);
CREATE INDEX IF NOT EXISTS idx_objects_owner ON custom_storage.objects(owner_id);
CREATE INDEX IF NOT EXISTS idx_objects_content_hash ON custom_storage.objects(content_hash);
CREATE INDEX IF NOT EXISTS idx_objects_path ON custom_storage.objects(path);
CREATE INDEX IF NOT EXISTS idx_objects_status ON custom_storage.objects(status);

-- Create public bucket
INSERT INTO custom_storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE custom_storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_storage.objects ENABLE ROW LEVEL SECURITY;

-- Create bucket policies
CREATE POLICY "Public buckets are viewable by everyone"
ON custom_storage.buckets FOR SELECT
USING (public = true);

CREATE POLICY "Users can create public buckets"
ON custom_storage.buckets FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Bucket owners can update their buckets"
ON custom_storage.buckets FOR UPDATE
TO authenticated
USING (owner_id = auth.uid());

-- Create object policies
CREATE POLICY "Public Access"
ON custom_storage.objects FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM custom_storage.buckets 
    WHERE buckets.id = objects.bucket_id 
    AND buckets.public = true
  )
  OR owner_id = auth.uid()
  OR path LIKE 'public/%'
);

CREATE POLICY "Authenticated users can upload files"
ON custom_storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM custom_storage.buckets 
    WHERE buckets.id = objects.bucket_id
    AND (buckets.public = true OR buckets.owner_id = auth.uid())
  )
);

CREATE POLICY "Object owners can update their files"
ON custom_storage.objects FOR UPDATE
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Object owners can delete their files"
ON custom_storage.objects FOR DELETE
TO authenticated
USING (owner_id = auth.uid());

-- Create last_accessed update function
CREATE OR REPLACE FUNCTION custom_storage.update_last_accessed()
RETURNS trigger AS $$
BEGIN
  NEW.last_accessed_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create last_accessed trigger
DROP TRIGGER IF EXISTS update_objects_last_accessed ON custom_storage.objects;
CREATE TRIGGER update_objects_last_accessed
  BEFORE UPDATE ON custom_storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION custom_storage.update_last_accessed();