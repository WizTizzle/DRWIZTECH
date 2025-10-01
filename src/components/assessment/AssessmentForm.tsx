import React, { useState, useMemo, useEffect } from 'react';
import { AssessmentQuestion } from './AssessmentQuestion';
import { AssessmentResult } from './AssessmentResult';
import { ContactInfoForm } from './ContactInfoForm';
import { useAssessment } from '../../contexts/AssessmentContext';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { assessmentQuestions } from '../../data/assessmentData';
import { filterQuestionsByDependency, assessRecoveryComplexity } from '../../utils/assessmentHelpers';
import { DeviceImageUpload } from './DeviceImageUpload';
import { AssessmentProgress } from './AssessmentProgress';
import { createRepairDeskTicket } from '../../lib/repairdesk/api';

export function AssessmentForm() {
  const [currentStage, setCurrentStage] = useState<'contact' | 'assessment'>('contact');
  const [contactFormData, setContactFormData] = useState<MailInFormData | null>(null);
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

  const submitAssessmentToBackend = async (assessmentData: any) => {
    console.log('Submitting assessment to backend:', assessmentData);

    try {
      const response = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assessmentData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Assessment submitted successfully:', responseData);
      return { success: true, data: responseData };
    } catch (error) {
      console.error('Assessment submission failed:', error);
      return { success: false, reason: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const handleContactFormSuccess = (formData: MailInFormData) => {
    console.log('Contact form completed:', formData);
    setContactFormData(formData);
    setCurrentStage('assessment');
  };

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

        // Combine contact form data with assessment answers
        const combinedData = {
          ...newAnswers,
          ...contactFormData,
          deviceImages
        };

        console.log('Creating RepairDesk ticket');
        const repairDeskTicket = await createRepairDeskTicket({
          answers: combinedData,
          assessment
        });
        console.log('RepairDesk ticket created:', repairDeskTicket);

        // Store assessment data locally as backup first
        const assessmentRecord = {
          id: repairDeskTicket.id,
          timestamp: new Date().toISOString(),
          answers: combinedData,
          assessment,
          deviceImages,
          contactInfo: contactFormData,
          status: 'completed'
        };

        // Save to localStorage as backup
        const existingAssessments = JSON.parse(localStorage.getItem('wiztech_assessments') || '[]');
        existingAssessments.push(assessmentRecord);
        localStorage.setItem('wiztech_assessments', JSON.stringify(existingAssessments));

        // Try to send email notification
        console.log('Submitting assessment to backend...');
        const backendResult = await submitAssessmentToBackend({
          answers: combinedData,
          assessment,
          deviceImages,
          ticketId: repairDeskTicket.id,
          customerInfo: contactFormData ? {
            firstName: contactFormData.firstName,
            lastName: contactFormData.lastName,
            email: contactFormData.email,
            phone: contactFormData.phone
          } : undefined
        });

        if (!backendResult.success) {
          console.warn(`Backend submission failed: ${backendResult.reason}`);
          // Don't fail the entire process, just log the issue
        }

        console.log('Assessment completed successfully');
        
        // Update assessment data with results
        setAssessmentData({
          ...assessmentData,
          answers: combinedData,
          deviceImages,
          assessment,
          ticketId: repairDeskTicket.id,
          contactInfo: contactFormData,
          emailSent: backendResult.success
        });

      } catch (err) {
        console.error('Error in final submission:', err);
        let errorMessage = 'An unexpected error occurred while processing your assessment.';
        
        if (err instanceof Error) {
          if (err.message.includes('RepairDesk')) {
            errorMessage = 'Unable to create support ticket. Please try again or contact us directly.';
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
    setCurrentStage('contact');
    setContactFormData(null);
    setCurrentStep(0);
    setDeviceImages([]);
    setAssessmentData({ answers: {} });
    setError(null);
    setIsSubmitting(false);
  };

  const handleImageUploaded = (url: string) => {
    setDeviceImages(prev => [...prev, url]);
  };

  // Show contact form first
  if (currentStage === 'contact') {
    return <ContactInfoForm onSubmissionSuccess={handleContactFormSuccess} />;
  }

  if (assessmentData.assessment) {
    return (
      <AssessmentResult 
        assessment={assessmentData.assessment}
        answers={assessmentData.answers}
        deviceImages={deviceImages}
        onReset={handleReset}
        ticketId={assessmentData.ticketId}
        contactInfo={contactFormData}
      />
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-green-800 font-medium">Contact Information Complete</span>
        </div>
        <p className="text-green-700 text-sm mt-1">
          {contactFormData?.firstName} {contactFormData?.lastName} - {contactFormData?.email}
        </p>
      </div>

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