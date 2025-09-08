import React, { useState } from 'react';
import { CheckCircle, Image } from 'lucide-react';
import { getResultClass } from '../../utils/styles';
import type { MailInFormData } from '../../types/mailIn';

interface AssessmentResultProps {
  assessment: {
    severity: string;
    message: string;
  };
  answers: Record<string, string>;
  deviceImages?: string[];
  onReset: () => void;
  ticketId?: string;
  contactInfo?: MailInFormData | null;
}

export function AssessmentResult({ assessment, answers, deviceImages, onReset, ticketId, contactInfo }: AssessmentResultProps) {
  // Since contact info is now collected upfront, we can show the completion state immediately
  const [showCompletion, setShowCompletion] = useState(true);

  const renderPreviousAttempts = () => {
    if (answers.previous_recovery === 'no') return null;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h4 className="text-lg font-semibold mb-4">Previous Recovery Attempts</h4>
        
        {(answers.previous_recovery === 'repair_shop' || answers.previous_recovery === 'both') && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-900">Repair Shop Details</h5>
            <p className="text-gray-700 mb-2">Company: {answers.repair_shop_name}</p>
            <p className="text-gray-700">Diagnosis: {answers.repair_shop_diagnosis}</p>
          </div>
        )}

        {(answers.previous_recovery === 'recovery_service' || answers.previous_recovery === 'both') && (
          <div>
            <h5 className="font-medium text-gray-900">Data Recovery Company Details</h5>
            <p className="text-gray-700 mb-2">Company: {answers.recovery_company_name}</p>
            <p className="text-gray-700">Diagnosis: {answers.recovery_company_diagnosis}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className={`p-6 rounded-lg ${getResultClass(assessment.severity)}`}>
        <div className="flex items-center space-x-4 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h4 className="text-lg font-semibold">Initial Assessment Complete</h4>
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            Thank you for providing the details about your data recovery needs. Our initial assessment indicates that your case requires professional data recovery services.
          </p>
          <div className="bg-white bg-opacity-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Next Steps:</h5>
            <div className="space-y-2">
              <p>You'll receive a detailed assessment email with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Preliminary diagnosis of your device's condition</li>
                <li>Recommended recovery approach</li>
                <li>Estimated timeline and pricing</li>
                <li>Secure shipping instructions (if needed)</li>
              </ul>
              <p>A recovery specialist will contact you to discuss any questions and next steps</p>
            </div>
          </div>
          <p className="text-sm font-medium">
            For urgent cases or immediate assistance, please contact us at (248) 403-8665
          </p>
        </div>
      </div>

      {/* Contact Information Summary */}
      {contactInfo && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4">Contact & Shipping Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Contact Details</h5>
              <p className="text-gray-700">{contactInfo.firstName} {contactInfo.lastName}</p>
              <p className="text-gray-700">{contactInfo.email}</p>
              <p className="text-gray-700">{contactInfo.phone}</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Shipping Address</h5>
              <p className="text-gray-700">{contactInfo.address1}</p>
              {contactInfo.address2 && <p className="text-gray-700">{contactInfo.address2}</p>}
              <p className="text-gray-700">{contactInfo.city}, {contactInfo.state} {contactInfo.zipCode}</p>
              <p className="text-gray-700">{contactInfo.country}</p>
            </div>
          </div>
        </div>
      )}

      {renderPreviousAttempts()}

      {deviceImages && deviceImages.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2" />
            Device Images
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {deviceImages.map((url, index) => (
              <div key={index} className="relative">
                <img 
                  src={url} 
                  alt={`Device image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showCompletion && (
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            <h4 className="text-lg font-semibold text-green-800">Assessment Submitted Successfully</h4>
          </div>
          <p className="text-green-700 mb-4">
            Your assessment has been submitted and our team has been notified. 
            You will receive detailed next steps via email within 24 hours.
          </p>
          <p className="text-green-700 text-sm mb-4">
            Case ID: {ticketId || 'Pending'}
          </p>
          <button
            onClick={onReset}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Start New Assessment
          </button>
        </div>
      )}
    </div>
  );
}