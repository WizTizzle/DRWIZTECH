import { supabase } from '../supabase/config';
import type { StorageObject } from './types';

export async function getObject(bucket: string, path: string): Promise<StorageObject | null> {
  const { data, error } = await supabase
    .from('storage_objects')
    .select('*')
    .eq('bucket_id', bucket)
    .eq('name', path)
    .single();

  if (error) {
    console.error('Error fetching object:', error);
    return null;
  }

  return data;
}

export async function createObject(object: Partial<StorageObject>) {
  const { data, error } = await supabase
    .from('storage_objects')
    .insert(object)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteObject(bucket: string, path: string) {
  const { error } = await supabase
    .from('storage_objects')
    .delete()
    .eq('bucket_id', bucket)
    .eq('name', path);

  if (error) throw error;
  return true;
}