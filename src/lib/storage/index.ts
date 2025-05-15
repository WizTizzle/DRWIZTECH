import { supabase } from '../supabase/config';

export interface ImageUploadResult {
  url: string | null;
  error: Error | null;
}

export async function getPublicUrl(path: string): Promise<string | null> {
  try {
    console.log('Getting public URL for path:', path);

    // First try to get from Supabase storage
    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(path);

    console.log('Supabase public URL:', publicUrl);

    // Verify the URL is accessible
    const response = await fetch(publicUrl, { method: 'HEAD' });
    if (response.ok) {
      console.log('Supabase URL is accessible');
      return publicUrl;
    }

    // Fallback to local public directory
    const localUrl = `/images/${path}`;
    console.log('Trying local URL:', localUrl);
    
    const localResponse = await fetch(localUrl, { method: 'HEAD' });
    if (localResponse.ok) {
      console.log('Local URL is accessible');
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
    console.log('Uploading image:', { fileName: file.name, location });

    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${location}/${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
    
    console.log('Generated filename:', fileName);

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('public')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    console.log('Upload successful, getting public URL');
    const url = await getPublicUrl(fileName);
    console.log('Final image URL:', url);

    return url;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}