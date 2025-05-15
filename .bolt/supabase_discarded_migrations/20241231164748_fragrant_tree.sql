-- Enable storage extension if not exists
CREATE EXTENSION IF NOT EXISTS "storage" SCHEMA extensions;

-- Create public bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
    -- Public read access
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage'
        AND policyname = 'Public Access'
    ) THEN
        CREATE POLICY "Public Access"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'public');
    END IF;

    -- Authenticated user upload
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage'
        AND policyname = 'Authenticated users can upload files'
    ) THEN
        CREATE POLICY "Authenticated users can upload files"
        ON storage.objects FOR INSERT
        TO authenticated
        WITH CHECK (bucket_id = 'public');
    END IF;

    -- Authenticated user update
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage'
        AND policyname = 'Authenticated users can update files'
    ) THEN
        CREATE POLICY "Authenticated users can update files"
        ON storage.objects FOR UPDATE
        TO authenticated
        USING (bucket_id = 'public');
    END IF;

    -- Authenticated user delete
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage'
        AND policyname = 'Authenticated users can delete files'
    ) THEN
        CREATE POLICY "Authenticated users can delete files"
        ON storage.objects FOR DELETE
        TO authenticated
        USING (bucket_id = 'public');
    END IF;
END $$;