import React, { useEffect } from 'react';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

export function ConfirmationScreen() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Thank You for Choosing WizTech!</h2>
        <p className="text-gray-600 mb-6">
          Your data recovery case has been successfully submitted. You will receive an email shortly with:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Package className="w-8 h-8 text-blue-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Shipping Label</h3>
          <p className="text-sm text-gray-600">Pre-paid shipping label for your device</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Instructions</h3>
          <p className="text-sm text-gray-600">Detailed packing and shipping guidelines</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ArrowRight className="w-8 h-8 text-blue-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2">Next Steps</h3>
          <p className="text-sm text-gray-600">Information about the recovery process</p>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mt-8">
        <h3 className="font-semibold mb-2">What to Expect</h3>
        <p className="text-gray-700">
          Once we receive your device, our engineers will begin the diagnostic process and contact you 
          within 24-48 hours with a detailed assessment and recovery plan.
        </p>
      </div>

      <div className="mt-8 text-gray-600">
        <p>Questions? Contact our support team:</p>
        <p className="font-semibold">support@wiztechrecovery.com</p>
      </div>
    </div>
  );
}