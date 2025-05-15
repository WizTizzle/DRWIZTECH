import { supabase } from './config';
import type { Database } from './types';

type Tables = Database['public']['Tables'];

export async function getCustomerCases(customerId: string) {
  const { data, error } = await supabase
    .from('cases')
    .select(`
      *,
      assessments (*),
      shipping_info (*)
    `)
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as (Tables['cases']['Row'] & {
    assessments: Tables['assessments']['Row'][];
    shipping_info: Tables['shipping_info']['Row'] | null;
  })[];
}

export async function getCaseDetails(caseId: string) {
  const { data, error } = await supabase
    .from('cases')
    .select(`
      *,
      customers (*),
      assessments (*),
      shipping_info (*)
    `)
    .eq('id', caseId)
    .single();

  if (error) throw error;
  return data as Tables['cases']['Row'] & {
    customers: Tables['customers']['Row'];
    assessments: Tables['assessments']['Row'][];
    shipping_info: Tables['shipping_info']['Row'] | null;
  };
}