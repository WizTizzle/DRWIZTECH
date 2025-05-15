import React from 'react';

interface ContactInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirm: string;
  referralSource: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onEmailConfirmChange: (value: string) => void;
  onReferralSourceChange: (value: string) => void;
}

export function ContactInfo({
  firstName,
  lastName,
  email,
  emailConfirm,
  referralSource,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onEmailConfirmChange,
  onReferralSourceChange
}: ContactInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium mb-2">Your name:</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              placeholder="First Name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              placeholder="Last Name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Your e-mail address: *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="ex: myname@example.com"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={emailConfirm}
            onChange={(e) => onEmailConfirmChange(e.target.value)}
            placeholder="Confirm Email"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">How did you find WizTech Data Recovery?</label>
        <select
          value={referralSource}
          onChange={(e) => onReferralSourceChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Please Select</option>
          <option value="google">Google Search</option>
          <option value="bing">Bing Search</option>
          <option value="referral">Friend/Family Referral</option>
          <option value="yelp">Yelp</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}