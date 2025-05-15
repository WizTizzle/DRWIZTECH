import React, { useState, useEffect } from 'react';
import { useAssessment } from '../contexts/AssessmentContext';
import { mapDeviceTypeToFormOption, generateProblemDescription } from '../utils/deviceMapping';

export function MailInForm() {
  const { assessmentData } = useAssessment();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    deviceType: '',
    description: ''
  });

  useEffect(() => {
    if (assessmentData.answers.device_type) {
      const deviceType = mapDeviceTypeToFormOption(assessmentData.answers.device_type);
      const initialDescription = generateProblemDescription(assessmentData.answers);
      
      setFormData(prev => ({
        ...prev,
        deviceType,
        description: initialDescription
      }));
    }
  }, [assessmentData.answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in production, this would connect to a backend
    alert('Form submitted successfully! We will contact you with shipping instructions.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6">Mail-In Service Request</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.country}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
          <input
            type="text"
            name="address"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.address}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Device Type</label>
          <select
            name="deviceType"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.deviceType}
          >
            <option value="">Select device type</option>
            <option value="hdd">Hard Drive</option>
            <option value="ssd">SSD/NVMe</option>
            <option value="usb">USB Drive</option>
            <option value="memory-card">Memory Card</option>
            <option value="raid">RAID/NAS</option>
            <option value="server">Server</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Details</label>
          <textarea
            name="description"
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.description}
            placeholder="Please provide any additional details about your device or data loss situation..."
          ></textarea>
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