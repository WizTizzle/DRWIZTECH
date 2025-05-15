import { supabase } from '../config';
import type { FileObject } from '@supabase/storage-js';

export type StorageFolder = 'services' | 'logos' | 'products';

class StorageManager {
  private static instance: StorageManager;
  private uploadQueue: Map<string, Promise<string | null>>;

  private constructor() {
    this.uploadQueue = new Map();
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  async getPublicUrl(path: string): Promise<string | null> {
    try {
      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(path);
      
      return publicUrl;
    } catch (error) {
      console.error('Error getting public URL:', error);
      return null;
    }
  }

  async uploadFile(file: File, folder: StorageFolder): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
    const key = `${folder}/${fileName}`;
    
    if (this.uploadQueue.has(key)) {
      return this.uploadQueue.get(key) as Promise<string | null>;
    }

    const uploadPromise = this.performUpload(file, key);
    this.uploadQueue.set(key, uploadPromise);
    
    try {
      return await uploadPromise;
    } finally {
      this.uploadQueue.delete(key);
    }
  }

  private async performUpload(file: File, path: string): Promise<string | null> {
    try {
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;
      return this.getPublicUrl(path);
    } catch (error) {
      console.error('Upload failed:', error);
      return null;
    }
  }

  async deleteFile(path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from('public')
        .remove([path]);

      return !error;
    } catch {
      return false;
    }
  }

  async listFiles(folder: StorageFolder): Promise<FileObject[]> {
    try {
      const { data, error } = await supabase.storage
        .from('public')
        .list(folder);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to list files:', error);
      return [];
    }
  }
}

export const storageManager = StorageManager.getInstance();