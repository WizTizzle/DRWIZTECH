/*
  # Custom Storage Implementation
  
  1. Tables
    - storage_buckets: Manages storage buckets
    - storage_objects: Stores file metadata
  
  2. Security
    - Enable RLS on storage_objects
    - Public read access for public bucket
    - Authenticated users can manage their files
*/

-- Create custom storage tables
CREATE TABLE IF NOT EXISTS public.storage_buckets (
  id text PRIMARY KEY,
  name text NOT NULL,
  public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.storage_objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket_id text NOT NULL REFERENCES public.storage_buckets(id),
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_name ON public.storage_objects(bucket_id, name);
CREATE INDEX IF NOT EXISTS idx_storage_objects_owner ON public.storage_objects(owner_id);

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

CREATE POLICY "Authenticated users can update own files"
ON public.storage_objects FOR UPDATE
TO authenticated
USING (owner_id = auth.uid() AND bucket_id = 'public');

CREATE POLICY "Authenticated users can delete own files"
ON public.storage_objects FOR DELETE
TO authenticated
USING (owner_id = auth.uid() AND bucket_id = 'public');

-- Create function to update last_accessed_at
CREATE OR REPLACE FUNCTION public.update_storage_object_access()
RETURNS trigger AS $$
BEGIN
  NEW.last_accessed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for last_accessed_at
CREATE TRIGGER update_storage_object_access_trigger
  BEFORE UPDATE ON public.storage_objects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_storage_object_access();