-- Drop extension if it exists (to ensure clean state)
DROP EXTENSION IF EXISTS "storage";

-- Create extension in extensions schema
CREATE EXTENSION IF NOT EXISTS "storage" WITH SCHEMA extensions;

-- Ensure public bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('public', 'public', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Public Access" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;
    
    -- Create new policies
    CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'public');

    CREATE POLICY "Authenticated users can upload files"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'public');

    CREATE POLICY "Authenticated users can update files"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'public');

    CREATE POLICY "Authenticated users can delete files"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'public');
END $$;