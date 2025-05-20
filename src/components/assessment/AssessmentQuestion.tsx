import React from 'react';
import type { Question } from '../../types/assessment';

interface AssessmentQuestionProps {
  question: Question;
  selectedValue: string;
  onAnswer: (questionId: string, value: string) => void;
}

export function AssessmentQuestion({ question, selectedValue, onAnswer }: AssessmentQuestionProps) {
  const handleOptionSelect = (value: string) => {
    onAnswer(question.id, value);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-primary-900">
        {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </h3>
      
      {question.help && (
        <p className="text-sm text-gray-600 mb-4">{question.help}</p>
      )}

      <div className="space-y-3 mt-4">
        {question.options ? (
          // Radio options for multiple choice questions
          question.options.map((option) => (
            <label
              key={option.value}
              className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-primary-50 cursor-pointer"
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleOptionSelect(option.value)}
                className="mt-1 h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <div className="flex-grow">
                <span className="text-gray-700">{option.text}</span>
              </div>
            </label>
          ))
        ) : (
          // Text input for free-form questions
          <input
            type="text"
            value={selectedValue}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            placeholder={question.placeholder || "Enter your answer"}
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            required={question.required}
          />
        )}
      </div>
    </div>
  );
}