/*
  # Custom Storage Implementation
  
  1. New Tables
    - `storage_buckets`: Manages storage buckets
      - `id` (text, primary key)
      - `name` (text)
      - `public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `storage_objects`: Stores file metadata
      - `id` (uuid, primary key)
      - `bucket_id` (text, foreign key)
      - `name` (text)
      - `size` (bigint)
      - `mime_type` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on storage_objects
    - Add policies for public access and authenticated operations
*/

-- Create storage buckets table
CREATE TABLE IF NOT EXISTS public.storage_buckets (
  id text PRIMARY KEY,
  name text NOT NULL,
  public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create storage objects table
CREATE TABLE IF NOT EXISTS public.storage_objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_id text NOT NULL REFERENCES public.storage_buckets(id),
  name text NOT NULL,
  size bigint,
  mime_type text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (bucket_id, name)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_name 
ON public.storage_objects(bucket_id, name);

-- Create public bucket
INSERT INTO public.storage_buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.storage_objects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public Access"
ON public.storage_objects FOR SELECT
USING (bucket_id = 'public');

CREATE POLICY "Authenticated users can upload files"
ON public.storage_objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public');

CREATE POLICY "Authenticated users can update files"
ON public.storage_objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public');

CREATE POLICY "Authenticated users can delete files"
ON public.storage_objects FOR DELETE
TO authenticated
USING (bucket_id = 'public');