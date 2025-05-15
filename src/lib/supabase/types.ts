import { Database as DatabaseGenerated } from '@supabase/supabase-js';

export interface Database extends DatabaseGenerated {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone: string | null;
          created_at: string;
          preferred_contact: string;
          notification_preferences: {
            email: boolean;
            sms: boolean;
          };
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
      cases: {
        Row: {
          id: string;
          customer_id: string;
          device_type: string;
          issue_type: string;
          device_state: string;
          physical_condition: string | null;
          assessment_data: Record<string, any> | null;
          status: string;
          created_at: string;
          priority: number;
          estimated_completion: string | null;
        };
        Insert: Omit<Database['public']['Tables']['cases']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['cases']['Insert']>;
      };
      assessments: {
        Row: {
          id: string;
          case_id: string;
          answers: Record<string, any>;
          severity: string;
          message: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['assessments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['assessments']['Insert']>;
      };
      shipping_info: {
        Row: {
          id: string;
          case_id: string;
          address1: string;
          address2: string | null;
          city: string;
          state: string;
          zip_code: string;
          country: string;
          shipping_notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['shipping_info']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['shipping_info']['Insert']>;
      };
    };
  };
}