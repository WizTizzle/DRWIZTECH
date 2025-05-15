// Simple helper to get public URL for images
const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || '/images';

export interface ImageUploadResult {
  url: string | null;
  error: Error | null;
}

export async function getPublicUrl(path: string): Promise<string | null> {
  try {
    const url = `${PUBLIC_URL}/${path}`;
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok ? url : null;
  } catch (error) {
    console.error('Error checking URL:', error);
    return null;
  }
}

export async function uploadImage(file: File, location: string): Promise<string | null> {
  try {
    // Create unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${location}/${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
    
    // For now, just return the public URL since we're using static files
    const url = `${PUBLIC_URL}/${fileName}`;
    return url;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}