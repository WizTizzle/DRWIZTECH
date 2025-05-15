/*
  # Set up storage policies for public assets
  
  1. Security
    - Allow public read access to public bucket
    - Allow authenticated users to upload and update files
    - Enable anonymous access for public bucket
*/

-- Enable public access to the storage.objects for the public bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'public');

-- Create policy for authenticated uploads
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public');

-- Create policy for authenticated updates
CREATE POLICY "Authenticated users can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'public');

-- Create policy for authenticated deletes
CREATE POLICY "Authenticated users can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public');