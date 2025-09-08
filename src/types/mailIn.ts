export interface MailInFormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Information
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Device Information (will be populated later)
  deviceType?: string;
  deviceState?: string;
  issueDescription?: string;
  previousAttempts?: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ShippingInfo {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}