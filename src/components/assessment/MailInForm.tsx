import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { mapAssessmentToDescription } from '../../utils/assessmentMapping';
import { LocationSelect } from './LocationSelect';
import { CitySelect } from './CitySelect';
import { ConfirmationScreen } from './ConfirmationScreen';

interface MailInFormProps {
  assessmentAnswers: Record<string, string>;
}

export function MailInForm({ assessmentAnswers }: MailInFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
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
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}