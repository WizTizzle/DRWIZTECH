import { supabase } from './config';
import type { Database } from './types';

type Customer = Database['public']['Tables']['customers']['Insert'];
type Case = Database['public']['Tables']['cases']['Insert'];
type Assessment = Database['public']['Tables']['assessments']['Insert'];

export async function createTicketFromAssessment(
  customerData: Customer,
  assessmentData: Record<string, any>
) {
  try {
    // Create customer record first
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();

    if (customerError) throw customerError;

    // Create case record
    const caseData: Case = {
      customer_id: customer.id,
      device_type: assessmentData.storage_type || 'unknown',
      issue_type: assessmentData.data_loss_type || 'unknown',
      device_state: assessmentData.device_state || 'unknown',
      physical_condition: assessmentData.physical_condition,
      assessment_data: assessmentData,
      status: 'pending'
    };

    const { data: case_, error: caseError } = await supabase
      .from('cases')
      .insert(caseData)
      .select()
      .single();

    if (caseError) throw caseError;

    // Create assessment record
    const assessmentRecord: Assessment = {
      case_id: case_.id,
      answers: assessmentData,
      severity: assessmentData.severity || 'standard',
      message: assessmentData.message || ''
    };

    const { error: assessmentError } = await supabase
      .from('assessments')
      .insert(assessmentRecord);

    if (assessmentError) throw assessmentError;

    return { customer, case: case_ };
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
}