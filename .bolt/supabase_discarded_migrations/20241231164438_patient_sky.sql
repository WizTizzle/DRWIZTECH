-- Drop all existing storage policies first
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
END $$;

-- Delete all objects in the public bucket
DELETE FROM storage.objects WHERE bucket_id = 'public';

-- Delete the public bucket
DELETE FROM storage.buckets WHERE id = 'public';

-- Drop the storage extension
DROP EXTENSION IF EXISTS "storage";