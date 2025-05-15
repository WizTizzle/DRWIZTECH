/*
  # Create images table for storing uploaded image metadata
  
  1. New Tables
    - `images`
      - `id` (uuid, primary key)
      - `url` (text)
      - `filename` (text)
      - `mime_type` (text)
      - `size` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for authenticated uploads
*/

CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  filename text NOT NULL,
  mime_type text,
  size integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public Access"
ON images FOR SELECT
USING (true);

-- Create policy for authenticated uploads
CREATE POLICY "Authenticated users can upload images"
ON images FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated updates
CREATE POLICY "Authenticated users can update images"
ON images FOR UPDATE
TO authenticated
USING (true);

-- Create policy for authenticated deletes
CREATE POLICY "Authenticated users can delete images"
ON images FOR DELETE
TO authenticated
USING (true);