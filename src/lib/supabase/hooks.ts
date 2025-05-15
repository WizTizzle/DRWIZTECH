import { useEffect, useState } from 'react';
import { supabase } from './config';
import type { Database } from './types';

export function useCustomer(id: string | undefined) {
  const [customer, setCustomer] = useState<Database['public']['Tables']['customers']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchCustomer() {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCustomer(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch customer'));
      } finally {
        setLoading(false);
      }
    }

    fetchCustomer();
  }, [id]);

  return { customer, loading, error };
}

export function useCase(id: string | undefined) {
  const [case_, setCase] = useState<Database['public']['Tables']['cases']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchCase() {
      try {
        const { data, error } = await supabase
          .from('cases')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setCase(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch case'));
      } finally {
        setLoading(false);
      }
    }

    fetchCase();
  }, [id]);

  return { case: case_, loading, error };
}