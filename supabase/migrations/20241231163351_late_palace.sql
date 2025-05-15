/*
  # Update storage policies
  
  1. Security Updates
    - Ensure RLS is enabled
    - Create policies if they don't exist
    - Safe policy creation with existence checks
*/

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
    -- Public Access policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Public Access'
    ) THEN
        CREATE POLICY "Public Access"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'public');
    END IF;

    -- Upload policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Authenticated users can upload files'
    ) THEN
        CREATE POLICY "Authenticated users can upload files"
        ON storage.objects FOR INSERT
        TO authenticated
        WITH CHECK (bucket_id = 'public');
    END IF;

    -- Update policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Authenticated users can update files'
    ) THEN
        CREATE POLICY "Authenticated users can update files"
        ON storage.objects FOR UPDATE
        TO authenticated
        USING (bucket_id = 'public');
    END IF;

    -- Delete policy
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Authenticated users can delete files'
    ) THEN
        CREATE POLICY "Authenticated users can delete files"
        ON storage.objects FOR DELETE
        TO authenticated
        USING (bucket_id = 'public');
    END IF;
END $$;