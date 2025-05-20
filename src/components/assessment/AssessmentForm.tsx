import React, { useState, useMemo, useEffect } from 'react';
import { AssessmentQuestion } from './AssessmentQuestion';
import { AssessmentResult } from './AssessmentResult';
import { useAssessment } from '../../contexts/AssessmentContext';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { assessmentQuestions } from '../../data/assessmentData';
import { filterQuestionsByDependency, assessRecoveryComplexity } from '../../utils/assessmentHelpers';
import { DeviceImageUpload } from './DeviceImageUpload';
import { AssessmentProgress } from './AssessmentProgress';
import { createRepairDeskTicket } from '../../lib/repairdesk/api';

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { assessmentData, setAssessmentData } = useAssessment();
  const [deviceImages, setDeviceImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleQuestions = useMemo(() => 
    filterQuestionsByDependency(assessmentQuestions, assessmentData.answers),
    [assessmentData.answers]
  );

  const currentQuestion = visibleQuestions[currentStep];
  const isLastQuestion = currentStep === visibleQuestions.length - 1;
  const isFirstQuestion = currentStep === 0;

  // Auto-scroll effect when step changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentStep]);

  const handleAnswer = async (questionId: string, value: string) => {
    const newAnswers = { ...assessmentData.answers, [questionId]: value };
    
    if (isLastQuestion) {
      setIsSubmitting(true);
      try {
        const assessment = assessRecoveryComplexity(newAnswers);
        const repairDeskTicket = await createRepairDeskTicket({
          answers: newAnswers,
          assessment
        });
        
        // Send assessment notification email
        const emailResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-assessment`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: newAnswers,
              assessment,
              deviceImages,
              customerInfo: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
              },
              ticketId: repairDeskTicket.id
            }),
          }
        );

        if (!emailResponse.ok) {
          console.error('Failed to send assessment notification');
        }
        
        setAssessmentData({
          answers: newAnswers,
          deviceImages,
          assessment,
          ticketId: repairDeskTicket.id
        });
      } catch (error) {
        console.error('Error creating ticket:', error);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    
    setAssessmentData({
      ...assessmentData,
      answers: newAnswers
    });
  };

  const handleNext = () => {
    if (currentStep < visibleQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setDeviceImages([]);
    setAssessmentData({ answers: {} });
  };

  const handleImageUploaded = (url: string) => {
    setDeviceImages(prev => [...prev, url]);
  };

  if (assessmentData.assessment) {
    return (
      <AssessmentResult 
        assessment={assessmentData.assessment}
        answers={assessmentData.answers}
        deviceImages={deviceImages}
        onReset={handleReset}
        ticketId={assessmentData.ticketId}
      />
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <AssessmentProgress 
        currentStep={currentStep}
        totalSteps={visibleQuestions.length}
      />

      {currentQuestion && (
        <>
          <AssessmentQuestion
            question={currentQuestion}
            selectedValue={assessmentData.answers[currentQuestion.id] || ''}
            onAnswer={handleAnswer}
          />

          {currentQuestion.id === 'storage_type' && assessmentData.answers[currentQuestion.id] && (
            <div className="mt-6">
              <DeviceImageUpload 
                deviceType={assessmentData.answers[currentQuestion.id]}
                onImageUploaded={handleImageUploaded}
              />
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={isFirstQuestion || isSubmitting}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isFirstQuestion 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center text-primary-600 hover:text-primary-700"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Start Over
            </button>
            
            <button
              onClick={handleNext}
              disabled={!assessmentData.answers[currentQuestion.id] || isLastQuestion || isSubmitting}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                !assessmentData.answers[currentQuestion.id] || isLastQuestion
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              {isSubmitting ? 'Creating Ticket...' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}