import { supabase } from './config';
import type { Database } from './types';

type Tables = Database['public']['Tables'];

export async function updateCase(
  id: string,
  updates: Partial<Tables['cases']['Update']>
) {
  const { data, error } = await supabase
    .from('cases')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateShippingInfo(
  id: string,
  updates: Partial<Tables['shipping_info']['Update']>
) {
  const { data, error } = await supabase
    .from('shipping_info')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCustomer(
  id: string,
  updates: Partial<Tables['customers']['Update']>
) {
  const { data, error } = await supabase
    .from('customers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}