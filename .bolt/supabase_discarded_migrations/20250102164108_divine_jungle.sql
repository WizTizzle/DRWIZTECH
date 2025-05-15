-- Enable the storage extension in the extensions schema
CREATE EXTENSION IF NOT EXISTS "storage" SCHEMA extensions;

-- Ensure the public bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create storage policies
DO $$ 
BEGIN
    -- Public read access
    CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'public');

    -- Authenticated user upload
    CREATE POLICY "Authenticated users can upload files"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'public');

    -- Authenticated user update
    CREATE POLICY "Authenticated users can update files"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'public');

    -- Authenticated user delete
    CREATE POLICY "Authenticated users can delete files"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'public');
END $$;