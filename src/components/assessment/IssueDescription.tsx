import React from 'react';

interface IssueDescriptionProps {
  primaryIssue: string;
  recoveryAttempts: string;
  additionalComments: string;
  onPrimaryIssueChange: (value: string) => void;
  onRecoveryAttemptsChange: (value: string) => void;
  onAdditionalCommentsChange: (value: string) => void;
}

export function IssueDescription({
  primaryIssue,
  recoveryAttempts,
  additionalComments,
  onPrimaryIssueChange,
  onRecoveryAttemptsChange,
  onAdditionalCommentsChange
}: IssueDescriptionProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium mb-2">
          Please describe the primary issue/problem
        </label>
        <textarea
          value={primaryIssue}
          onChange={(e) => onPrimaryIssueChange(e.target.value)}
          placeholder="ex. I can see files but not copy, drive completely dead, my dog ate it"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          What (if anything) has been attempted to recover the data?
        </label>
        <textarea
          value={recoveryAttempts}
          onChange={(e) => onRecoveryAttemptsChange(e.target.value)}
          placeholder="ex. local repair shop couldn't recover, ran data recovery software, prayer"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          Any other comments that may help us determine your chances?
        </label>
        <textarea
          value={additionalComments}
          onChange={(e) => onAdditionalCommentsChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
        />
      </div>
    </div>
  );
}