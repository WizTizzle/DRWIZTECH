/*
  # Custom Storage Implementation
  
  1. New Tables
    - `storage_buckets`: Manages storage containers
      - `id` (text, primary key)
      - `name` (text)
      - `public` (boolean)
      - `owner_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `storage_objects`: Stores file metadata
      - `id` (uuid, primary key)
      - `bucket_id` (text, references storage_buckets)
      - `name` (text)
      - `owner_id` (uuid, references auth.users)
      - `size` (bigint)
      - `mime_type` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public access and authenticated operations
*/

-- Create storage buckets table
CREATE TABLE IF NOT EXISTS storage_buckets (
  id text PRIMARY KEY,
  name text NOT NULL,
  public boolean DEFAULT false,
  owner_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create storage objects table
CREATE TABLE IF NOT EXISTS storage_objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_id text NOT NULL REFERENCES storage_buckets(id),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id),
  size bigint,
  mime_type text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (bucket_id, name)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_name 
ON storage_objects(bucket_id, name);

CREATE INDEX IF NOT EXISTS idx_storage_objects_owner 
ON storage_objects(owner_id);

-- Create public bucket
INSERT INTO storage_buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage_buckets ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_objects ENABLE ROW LEVEL SECURITY;

-- Create policies for storage_buckets
CREATE POLICY "Public buckets are viewable by everyone"
ON storage_buckets FOR SELECT
USING (public = true);

CREATE POLICY "Users can create public buckets"
ON storage_buckets FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Bucket owners can update their buckets"
ON storage_buckets FOR UPDATE
TO authenticated
USING (owner_id = auth.uid());

-- Create policies for storage_objects
CREATE POLICY "Public Access"
ON storage_objects FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM storage_buckets 
    WHERE storage_buckets.id = storage_objects.bucket_id 
    AND storage_buckets.public = true
  )
);

CREATE POLICY "Authenticated users can upload files"
ON storage_objects FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM storage_buckets 
    WHERE storage_buckets.id = storage_objects.bucket_id
  )
);

CREATE POLICY "Object owners can update their files"
ON storage_objects FOR UPDATE
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Object owners can delete their files"
ON storage_objects FOR DELETE
TO authenticated
USING (owner_id = auth.uid());