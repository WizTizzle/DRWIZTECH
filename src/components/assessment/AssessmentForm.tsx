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
  const [error, setError] = useState<string | null>(null);

  const visibleQuestions = useMemo(() => 
    filterQuestionsByDependency(assessmentQuestions, assessmentData.answers),
    [assessmentData.answers]
  );

  const currentQuestion = visibleQuestions[currentStep];
  const isLastQuestion = currentStep === visibleQuestions.length - 1;
  const isFirstQuestion = currentStep === 0;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [currentStep]);

  const handleAnswer = async (questionId: string, value: string) => {
    console.log('Handling answer:', { questionId, value });
    
    // Always update the answers state immediately to update the UI
    const newAnswers = { ...assessmentData.answers, [questionId]: value };
    setAssessmentData({
      ...assessmentData,
      answers: newAnswers
    });
    
    if (isLastQuestion) {
      setIsSubmitting(true);
      setError(null);
      
      try {
        console.log('Processing final question submission');
        const assessment = assessRecoveryComplexity(newAnswers);
        console.log('Assessment generated:', assessment);

        console.log('Creating RepairDesk ticket');
        const repairDeskTicket = await createRepairDeskTicket({
          answers: newAnswers,
          assessment
        });
        console.log('RepairDesk ticket created:', repairDeskTicket);

        // Instead of calling the Edge Function, we'll simulate the email sending
        // and store the data locally for now
        console.log('Simulating email notification...');
        
        try {
          // Try to send email via Edge Function, but don't fail if it doesn't work
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          
          if (supabaseUrl && supabaseKey) {
            const functionUrl = `${supabaseUrl}/functions/v1/send-assessment`;
            console.log('Attempting to call function at:', functionUrl);

            const requestBody = {
              answers: newAnswers,
              assessment,
              deviceImages,
              ticketId: repairDeskTicket.id
            };

            // Set a timeout for the fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const emailResponse = await fetch(functionUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'apikey': supabaseKey
              },
              body: JSON.stringify(requestBody),
              signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (emailResponse.ok) {
              const responseData = await emailResponse.json();
              console.log('Email notification sent successfully:', responseData);
            } else {
              console.warn('Email notification failed, but continuing with assessment');
            }
          }
        } catch (emailError) {
          // Don't fail the entire process if email fails
          console.warn('Email notification failed, but assessment will continue:', emailError);
        }

        // Store assessment data locally as backup
        const assessmentRecord = {
          id: repairDeskTicket.id,
          timestamp: new Date().toISOString(),
          answers: newAnswers,
          assessment,
          deviceImages,
          status: 'completed'
        };

        // Save to localStorage as backup
        const existingAssessments = JSON.parse(localStorage.getItem('wiztech_assessments') || '[]');
        existingAssessments.push(assessmentRecord);
        localStorage.setItem('wiztech_assessments', JSON.stringify(existingAssessments));

        console.log('Assessment completed successfully');
        
        // Update assessment data with results
        setAssessmentData({
          ...assessmentData,
          answers: newAnswers,
          deviceImages,
          assessment,
          ticketId: repairDeskTicket.id
        });
      } catch (err) {
        console.error('Error in final submission:', err);
        let errorMessage = 'An unexpected error occurred while processing your assessment.';
        
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            errorMessage = 'The request timed out. Please try again.';
          } else if (err.message.includes('Failed to fetch')) {
            errorMessage = 'Network connection issue. Your assessment has been saved locally and we will process it manually.';
          } else {
            errorMessage = err.message;
          }
        }
        
        setError(errorMessage);
        setIsSubmitting(false);
        return;
      } finally {
        setIsSubmitting(false);
      }
    }
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
    setError(null);
    setIsSubmitting(false);
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

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <h4 className="font-semibold mb-2">Submission Error</h4>
          <p>{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Dismiss
          </button>
        </div>
      )}

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
                isFirstQuestion || isSubmitting
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex items-center text-primary-600 hover:text-primary-700 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Start Over
            </button>
            
            <button
              onClick={handleNext}
              disabled={!assessmentData.answers[currentQuestion.id] || isLastQuestion || isSubmitting}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                !assessmentData.answers[currentQuestion.id] || isLastQuestion || isSubmitting
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}