import React, { useState } from 'react';
import { User, MapPin, Mail, Phone } from 'lucide-react';
import { LocationSelect } from './LocationSelect';
import { CitySelect } from './CitySelect';
import type { MailInFormData } from '../../types/mailIn';

interface ContactInfoFormProps {
  onSubmissionSuccess: (formData: MailInFormData) => void;
}

export function ContactInfoForm({ onSubmissionSuccess }: ContactInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MailInFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'state', 'zipCode', 'country'];
    return requiredFields.every(field => formData[field as keyof MailInFormData]?.toString().trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate brief processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Contact form submitted:', formData);
      onSubmissionSuccess(formData);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error processing your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <User className="text-primary-500 mr-3" size={24} />
        <div>
          <h3 className="text-2xl font-semibold text-primary-900">Contact & Shipping Information</h3>
          <p className="text-primary-600">Please provide your details to begin the assessment</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information Section */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-center mb-4">
            <Mail className="text-primary-400 mr-2" size={20} />
            <h4 className="text-lg font-medium text-gray-900">Contact Information</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </div>

        {/* Shipping Address Section */}
        <div>
          <div className="flex items-center mb-4">
            <MapPin className="text-primary-400 mr-2" size={20} />
            <h4 className="text-lg font-medium text-gray-900">Shipping Address</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
              <input
                type="text"
                name="address1"
                required
                value={formData.address1}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Street address, P.O. box, company name, c/o"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Apartment, suite, unit, building, floor, etc."
              />
            </div>

            <LocationSelect
              country={formData.country}
              state={formData.state}
              onCountryChange={(value) => handleChange({ target: { name: 'country', value } } as any)}
              onStateChange={(value) => handleChange({ target: { name: 'state', value } } as any)}
            />

            <CitySelect
              country={formData.country}
              state={formData.state}
              value={formData.city}
              onChange={(value) => handleChange({ target: { name: 'city', value } } as any)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP/Postal Code *</label>
              <input
                type="text"
                name="zipCode"
                required
                value={formData.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="12345 or A1B 2C3"
              />
            </div>
          </div>
        </div>

        <div className="bg-primary-50 p-4 rounded-lg">
          <h5 className="font-medium text-primary-900 mb-2">What happens next?</h5>
          <p className="text-sm text-primary-700">
            After providing your contact information, you'll complete a brief assessment about your device 
            and data recovery needs. This helps us provide you with the most accurate evaluation and service recommendations.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            'Continue to Assessment'
          )}
        </button>
      </form>
    </div>
  );
}