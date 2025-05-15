import React from 'react';

interface FormActionsProps {
  onSave: () => void;
  onReview: () => void;
}

export function FormActions({ onSave, onReview }: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-start space-y-4 sm:space-y-0 sm:space-x-4">
      <button
        type="button"
        onClick={onSave}
        className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors"
      >
        Save / Continue Later
      </button>
      <button
        type="submit"
        onClick={onReview}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Review Answers
      </button>
    </div>
  );
}