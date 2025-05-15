import { supabase } from './supabase';

export async function getPublicUrl(path: string) {
  try {
    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(path);
    
    // Verify the URL is accessible
    const response = await fetch(publicUrl, { method: 'HEAD' });
    if (!response.ok) {
      throw new Error(`Failed to access ${path}`);
    }
    
    return publicUrl;
  } catch (error) {
    console.error('Error getting public URL:', error);
    return null;
  }
}

export async function uploadFile(file: File, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from('public')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    return await getPublicUrl(path);
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}