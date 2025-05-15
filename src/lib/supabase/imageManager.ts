import { supabase } from './config';
import type { FileObject } from '@supabase/storage-js';

export type ImageFolder = 'services' | 'logos' | 'products';

export class ImageManager {
  private static instance: ImageManager;
  private uploadQueue: Map<string, Promise<string | null>>;

  private constructor() {
    this.uploadQueue = new Map();
  }

  static getInstance(): ImageManager {
    if (!ImageManager.instance) {
      ImageManager.instance = new ImageManager();
    }
    return ImageManager.instance;
  }

  async uploadImage(file: File, folder: ImageFolder): Promise<string | null> {
    const key = `${folder}/${file.name}_${Date.now()}`;
    
    if (this.uploadQueue.has(key)) {
      return this.uploadQueue.get(key) as Promise<string | null>;
    }

    const uploadPromise = this.performUpload(file, folder, key);
    this.uploadQueue.set(key, uploadPromise);
    
    try {
      return await uploadPromise;
    } finally {
      this.uploadQueue.delete(key);
    }
  }

  private async performUpload(file: File, folder: ImageFolder, key: string): Promise<string | null> {
    try {
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(`${folder}/${key}`, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(`${folder}/${key}`);

      return publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  }

  async deleteImage(path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from('public')
        .remove([path]);

      return !error;
    } catch {
      return false;
    }
  }

  async listImages(folder: ImageFolder): Promise<FileObject[]> {
    try {
      const { data, error } = await supabase.storage
        .from('public')
        .list(folder);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to list images:', error);
      return [];
    }
  }
}

export const imageManager = ImageManager.getInstance();