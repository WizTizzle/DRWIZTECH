import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { mapAssessmentToDescription } from '../../utils/assessmentMapping';
import { LocationSelect } from './LocationSelect';
import { CitySelect } from './CitySelect';
import { ConfirmationScreen } from './ConfirmationScreen';

interface MailInFormProps {
  assessmentAnswers: Record<string, string>;
  onSubmissionSuccess?: () => void;
}

export function MailInForm({ assessmentAnswers, onSubmissionSuccess }: MailInFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    deviceDetails: mapAssessmentToDescription(assessmentAnswers),
    additionalNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'state', 'zipCode', 'country'];
    return requiredFields.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission - in production, this would integrate with your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Mail-in form submitted:', formData);
      setIsSubmitted(true);
      
      // Call the success callback to notify parent component
      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <ConfirmationScreen />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Lightbulb className="text-primary-500 mr-3" size={24} />
        <div>
          <h3 className="text-xl font-semibold text-primary-900">Mail-In Service Details</h3>
          <p className="text-primary-600">Please provide your shipping information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
            <input
              type="text"
              name="address1"
              required
              value={formData.address1}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Device Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Device Details</label>
          <textarea
            name="deviceDetails"
            rows={4}
            value={formData.deviceDetails}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            name="additionalNotes"
            rows={4}
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Any special handling instructions or additional information..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting Request...
            </div>
          ) : (
            'Submit Recovery Request'
          )}
        </button>
      </form>
    </div>
  );
}