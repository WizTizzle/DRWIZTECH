-- Cleanup all storage-related items
DO $$ 
BEGIN
    -- Drop policies if they exist
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
EXCEPTION 
    WHEN undefined_table THEN 
        NULL;
END $$;

-- Clean up any existing objects and buckets
DO $$ 
BEGIN
    DELETE FROM storage.objects WHERE bucket_id = 'public';
    DELETE FROM storage.buckets WHERE id = 'public';
EXCEPTION 
    WHEN undefined_table THEN 
        NULL;
END $$;

-- Drop the extension if it exists
DROP EXTENSION IF EXISTS "storage";