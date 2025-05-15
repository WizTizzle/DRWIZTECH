-- Create schema for our custom storage implementation
CREATE SCHEMA IF NOT EXISTS custom_storage;

-- Create storage buckets table
CREATE TABLE IF NOT EXISTS custom_storage.buckets (
  id text PRIMARY KEY,
  name text NOT NULL,
  public boolean DEFAULT false,
  owner_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create storage objects table
CREATE TABLE IF NOT EXISTS custom_storage.objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_id text NOT NULL REFERENCES custom_storage.buckets(id),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  size bigint,
  mime_type text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  UNIQUE (bucket_id, name)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_objects_bucket_name 
ON custom_storage.objects(bucket_id, name);

CREATE INDEX IF NOT EXISTS idx_objects_owner 
ON custom_storage.objects(owner_id);

-- Create public bucket
INSERT INTO custom_storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE custom_storage.buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies for buckets
CREATE POLICY "Public buckets are viewable by everyone"
ON custom_storage.buckets FOR SELECT
USING (public = true);

CREATE POLICY "Users can create public buckets"
ON custom_storage.buckets FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policies for objects
CREATE POLICY "Public Access"
ON custom_storage.objects FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM custom_storage.buckets 
    WHERE buckets.id = objects.bucket_id 
    AND buckets.public = true
  )
);

CREATE POLICY "Authenticated users can upload files"
ON custom_storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM custom_storage.buckets 
    WHERE buckets.id = objects.bucket_id
    AND buckets.public = true
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