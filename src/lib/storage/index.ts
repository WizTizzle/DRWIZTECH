import { supabase } from '../supabase/config';

export interface ImageUploadResult {
  url: string | null;
  error: Error | null;
}

export async function getPublicUrl(path: string): Promise<string | null> {
  try {
    // First try to get from Supabase storage
    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(path);

    // Verify the URL is accessible
    const response = await fetch(publicUrl, { method: 'HEAD' });
    if (response.ok) {
      return publicUrl;
    }

    // Fallback to local public directory
    const localUrl = `/images/${path}`;
    const localResponse = await fetch(localUrl, { method: 'HEAD' });
    if (localResponse.ok) {
      return localUrl;
    }

    console.warn(`Image not found in either storage or public directory: ${path}`);
    return null;
  } catch (error) {
    console.error('Error getting public URL:', error);
    return null;
  }
}

export async function uploadImage(file: File, location: string): Promise<string | null> {
  try {
    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${location}/${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
    
    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('public')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    return await getPublicUrl(fileName);
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}