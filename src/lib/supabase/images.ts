import { supabase } from './config';

export interface ImageUploadResult {
  url: string | null;
  error: Error | null;
  metadata?: {
    id: string;
    filename: string;
    mime_type: string;
    size: number;
  };
}

export async function uploadImage(
  file: File,
  folder: 'services' | 'logos' | 'products' = 'services'
): Promise<ImageUploadResult> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('public')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath);

    const { data: imageData, error: dbError } = await supabase
      .from('images')
      .insert({
        url: publicUrl,
        filename: fileName,
        mime_type: file.type,
        size: file.size
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return { 
      url: publicUrl, 
      error: null,
      metadata: {
        id: imageData.id,
        filename: imageData.filename,
        mime_type: imageData.mime_type,
        size: imageData.size
      }
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return { 
      url: null, 
      error: error instanceof Error ? error : new Error('Failed to upload image')
    };
  }
}

export async function deleteImage(path: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage
      .from('public')
      .remove([path]);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { 
      error: error instanceof Error ? error : new Error('Failed to delete image')
    };
  }
}

export async function listImages(folder: string = 'services') {
  try {
    const { data, error } = await supabase.storage
      .from('public')
      .list(folder);

    if (error) throw error;
    return { 
      files: data, 
      error: null,
    };
  } catch (error) {
    console.error('Error listing images:', error);
    return { 
      files: [], 
      error: error instanceof Error ? error : new Error('Failed to list images')
    };
  }
}