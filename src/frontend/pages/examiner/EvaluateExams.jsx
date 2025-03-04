import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, User, FileText } from 'lucide-react';
import axios from 'axios';

const EvaluateExams = () => {
  const [pendingEvaluations, setPendingEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPendingEvaluations = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll simulate the data
        
        // Simulated data
        const mockEvaluations = [
          {
            id: '1',
            studentName: 'John Doe',
            examTitle: 'Web Development Fundamentals',
            submittedAt: '2025-06-05T14:30:00',
            subjectiveQuestions: [
              {
                id: '1',
                questionText: 'Explain the difference between localStorage and sessionStorage in web browsers.',
                studentAnswer: 'Both localStorage and sessionStorage are web storage APIs that allow storing key-value pairs in a web browser. The main difference is persistence: localStorage data has no expiration time and remains until explicitly deleted, while sessionStorage data is cleared when the page session ends (when the browser tab is closed). localStorage is also shared across all tabs/windows with the same origin, while sessionStorage is limited to the tab where it was created.',
                maxScore: 10
              },
              {
                id: '2',
                questionText: 'Describe the concept of responsive web design and why it is important.',
                studentAnswer: 'Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It uses techniques like fluid grids, flexible images, and CSS media queries to adapt the layout to the viewing environment. It\'s important because it ensures a good user experience across different devices (desktops, tablets, mobile phones), reduces the need for separate mobile sites, and improves SEO as Google favors mobile-friendly websites.',
                maxScore: 10
              }
            ]
          },
          {
            id: '2',
            studentName: 'Jane Smith',
            examTitle: 'Advanced JavaScript Concepts',
            submittedAt: '2025-06-04T10:15:00',
            subjectiveQuestions: [
              {
                id: '3',
                questionText: 'Explain the concept of closures in JavaScript with an example.',
                studentAnswer: 'A closure in JavaScript is a function that has access to its own scope, the outer function\'s variables, and global variables, even after the outer function has finished executing. Example: function createCounter() { let count = 0; return function() { return ++count; }; } const counter = createCounter(); console.log(counter()); // 1 console.log(counter()); // 2. Here, the inner function maintains access to the count variable even after createCounter has finished execution.',
                maxScore: 15
              }
            ]
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setPendingEvaluations(mockEvaluations);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        setError('Failed to load pending evaluations');
        setLoading(false);
      }
    };

    fetchPendingEvaluations();
  }, []);

  const startEvaluation = (evaluation) => {
    setCurrentEvaluation(evaluation);
    setFeedback('');
    setScore(0);
    setSuccessMessage('');
  };

  const handleSubmitEvaluation = async () => {
    if (!feedback.trim()) {
      alert('Please provide feedback for the student');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate the submission
      
      // Simulate API delay
      setTimeout(() => {
        // Remove the evaluated submission from pending list
        setPendingEvaluations(pendingEvaluations.filter(
          evaluation => evaluation.id !== currentEvaluation.id
        ));
        
        
        setSuccessMessage('Evaluation submitted successfully!');
        setIsSubmitting(false);
        
        // Clear current evaluation after a delay
        setTimeout(() => {
          setCurrentEvaluation(null);
          setSuccessMessage('');
        }, 3000);
      }, 1500);
      
    } catch (error) {
      setError('Failed to submit evaluation');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Evaluate Subjective Answers</h1>
        <p className="text-gray-600">Review and grade student responses</p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {currentEvaluation ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">{currentEvaluation.examTitle}</h2>
              <button
                onClick={() => setCurrentEvaluation(null)}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Back to List
              </button>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-4">{currentEvaluation.studentName}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>Submitted: {new Date(currentEvaluation.submittedAt).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="px-6 py-4">
            {currentEvaluation.subjectiveQuestions.map((question, index) => (
              <div key={question.id} className="mb-8 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                <h3 className="text-md font-medium text-gray-900 mb-2">
                  Question {index + 1}: {question.questionText}
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Student's Answer:</h4>
                  <p className="text-gray-800 whitespace-pre-line">{question.studentAnswer}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`score-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Score (out of {question.maxScore})
                    </label>
                    <input
                      type="number"
                      id={`score-${question.id}`}
                      min="0"
                      max={question.maxScore}
                      value={score}
                      onChange={(e) => setScore(Math.min(question.maxScore, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`feedback-${question.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback
                    </label>
                    <textarea
                      id={`feedback-${question.id}`}
                      rows="4"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide constructive feedback for the student..."
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button
              onClick={handleSubmitEvaluation}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Evaluation'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Pending Evaluations</h2>
          </div>
          
          {pendingEvaluations.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {pendingEvaluations.map(evaluation => (
                <div key={evaluation.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-md font-medium text-gray-900">{evaluation.examTitle}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-3">{evaluation.studentName}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{new Date(evaluation.submittedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => startEvaluation(evaluation)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Evaluate
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {evaluation.subjectiveQuestions.length} question{evaluation.subjectiveQuestions.length !== 1 ? 's' : ''} to evaluate
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No pending evaluations at this time.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluateExams;