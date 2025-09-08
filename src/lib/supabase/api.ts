import { supabase } from './config';
import type { Database } from './types';

type Customer = Database['public']['Tables']['customers']['Insert'];
type Case = Database['public']['Tables']['cases']['Insert'];
type Assessment = Database['public']['Tables']['assessments']['Insert'];
type ShippingInfo = Database['public']['Tables']['shipping_info']['Insert'];

export async function createTicketFromAssessment(
  customerData: Customer,
  assessmentData: Record<string, any>
) {
  try {
    // Extract customer data from the combined assessment data
    const extractedCustomerData: Customer = {
      email: assessmentData.email || customerData.email,
      first_name: assessmentData.firstName || customerData.first_name,
      last_name: assessmentData.lastName || customerData.last_name,
      phone: assessmentData.phone || customerData.phone,
      preferred_contact: 'email',
      notification_preferences: { email: true, sms: false }
    };

    // Create customer record first
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert(extractedCustomerData)
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

    // Create shipping info record if address data is available
    if (assessmentData.address1 && assessmentData.city && assessmentData.state && assessmentData.zipCode && assessmentData.country) {
      const shippingData: ShippingInfo = {
        case_id: case_.id,
        address1: assessmentData.address1,
        address2: assessmentData.address2 || null,
        city: assessmentData.city,
        state: assessmentData.state,
        zip_code: assessmentData.zipCode,
        country: assessmentData.country,
        shipping_notes: null
      };

      const { error: shippingError } = await supabase
        .from('shipping_info')
        .insert(shippingData);

      if (shippingError) {
        console.error('Error creating shipping info:', shippingError);
        // Don't fail the entire process for shipping info errors
      }
    }

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