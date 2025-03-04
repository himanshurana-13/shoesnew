import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { shuffle } from 'lodash';
import axios from 'axios';

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [exam, setExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
  // Fetch exam data
  useEffect(() => {
    const fetchExam = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll simulate the data
        
        // Simulated data for a mock exam
        const mockExam = {
          id: examId,
          title: 'Web Development Fundamentals',
          description: 'Test your knowledge of web development basics including HTML, CSS, and JavaScript.',
          duration: 30, // in minutes
          totalQuestions: 10,
          passingScore: 70,
          questions: [
            {
              id: 1,
              type: 'multiple-choice',
              text: 'Which HTML tag is used to define an internal style sheet?',
              options: [
                { id: 'a', text: '<script>' },
                { id: 'b', text: '<css>' },
                { id: 'c', text: '<style>' },
                { id: 'd', text: '<link>' }
              ],
              correctAnswer: 'c'
            },
            {
              id: 2,
              type: 'multiple-choice',
              text: 'Which CSS property is used to change the text color of an element?',
              options: [
                { id: 'a', text: 'color' },
                { id: 'b', text: 'text-color' },
                { id: 'c', text: 'font-color' },
                { id: 'd', text: 'background-color' }
              ],
              correctAnswer: 'a'
            },
            {
              id: 3,
              type: 'multiple-choice',
              text: 'What does DOM stand for?',
              options: [
                { id: 'a', text: 'Document Object Model' },
                { id: 'b', text: 'Data Object Model' },
                { id: 'c', text: 'Document Oriented Model' },
                { id: 'd', text: 'Digital Ordinance Model' }
              ],
              correctAnswer: 'a'
            },
            {
              id: 4,
              type: 'multiple-choice',
              text: 'Which JavaScript method is used to access an HTML element by its ID?',
              options: [
                { id: 'a', text: 'getElementById()' },
                { id: 'b', text: 'getElement()' },
                { id: 'c', text: 'querySelector()' },
                { id: 'd', text: 'findElementById()' }
              ],
              correctAnswer: 'a'
            },
            {
              id: 5,
              type: 'multiple-choice',
              text: 'What is the correct way to write a JavaScript array?',
              options: [
                { id: 'a', text: 'var colors = "red", "green", "blue"' },
                { id: 'b', text: 'var colors = (1:"red", 2:"green", 3:"blue")' },
                { id: 'c', text: 'var colors = ["red", "green", "blue"]' },
                { id: 'd', text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")' }
              ],
              correctAnswer: 'c'
            },
            {
              id: 6,
              type: 'true-false',
              text: 'CSS is used to define the structure of a web page.',
              options: [
                { id: 'a', text: 'True' },
                { id: 'b', text: 'False' }
              ],
              correctAnswer: 'b'
            },
            {
              id: 7,
              type: 'multiple-choice',
              text: 'Which of the following is NOT a JavaScript framework or library?',
              options: [
                { id: 'a', text: 'React' },
                { id: 'b', text: 'Angular' },
                { id: 'c', text: 'Django' },
                { id: 'd', text: 'Vue' }
              ],
              correctAnswer: 'c'
            },
            {
              id: 8,
              type: 'multiple-choice',
              text: 'What does API stand for?',
              options: [
                { id: 'a', text: 'Application Programming Interface' },
                { id: 'b', text: 'Application Process Integration' },
                { id: 'c', text: 'Automated Programming Interface' },
                { id: 'd', text: 'Application Protocol Interface' }
              ],
              correctAnswer: 'a'
            },
            {
              id: 9,
              type: 'multiple-choice',
              text: 'Which HTTP method is used to send data to a server to create/update a resource?',
              options: [
                { id: 'a', text: 'GET' },
                { id: 'b', text: 'POST' },
                { id: 'c', text: 'DELETE' },
                { id: 'd', text: 'HEAD' }
              ],
              correctAnswer: 'b'
            },
            {
              id: 10,
              type: 'subjective',
              text: 'Explain the difference between localStorage and sessionStorage in web browsers.',
              maxWords: 100
            }
          ]
        };
        
        // Randomize question order
        const randomizedQuestions = shuffle([...mockExam.questions]);
        
        setExam({
          ...mockExam,
          questions: randomizedQuestions
        });
        
        // Set initial time
        setTimeLeft(mockExam.duration * 60); // convert minutes to seconds
        
      } catch (error) {
        setError('Failed to load exam data. Please try again.');
      }
    };

    fetchExam();
  }, [examId]);

  // Timer countdown
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0 || examSubmitted) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft, examSubmitted]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !examSubmitted) {
      handleSubmitExam();
    }
  }, [timeLeft, examSubmitted]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = async () => {
    if (confirmSubmit) {
      setIsSubmitting(true);
      
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll simulate the submission
        
        // Calculate score for auto-graded questions
        const autoGradedQuestions = exam.questions.filter(q => q.type !== 'subjective');
        let correctAnswers = 0;
        
        autoGradedQuestions.forEach(question => {
          if (answers[question.id] === question.correctAnswer) {
            correctAnswers++;
          }
        });
        
        const autoGradedScore = Math.round((correctAnswers / autoGradedQuestions.length) * 100);
        
        // Simulate API delay
        setTimeout(() => {
          setExamSubmitted(true);
          setIsSubmitting(false);
          
          // Redirect to results page
          navigate(`/dashboard/results?examId=${examId}&score=${autoGradedScore}`);
        }, 2000);
        
      } catch (error) {
        setError('Failed to submit exam. Please try again.');
        setIsSubmitting(false);
        setConfirmSubmit(false);
      }
    } else {
      setConfirmSubmit(true);
    }
  };

  const cancelSubmit = () => {
    setConfirmSubmit(false);
  };

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard/exams')}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Return to Exams
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = Math.round((answeredCount / exam.questions.length) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Exam Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            <span className={`font-mono text-lg ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{answeredCount} of {exam.questions.length} answered</span>
            <span>{progressPercentage}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </h3>
            <span className="text-sm text-gray-500">
              {currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' : 
               currentQuestion.type === 'true-false' ? 'True/False' : 'Subjective'}
            </span>
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">{currentQuestion.text}</h2>
          
          {/* Answer Options */}
          {currentQuestion.type !== 'subjective' ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${option.id}`}
                    name={`question-${currentQuestion.id}`}
                    value={option.id}
                    checked={answers[currentQuestion.id] === option.id}
                    onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor={`option-${option.id}`} className="ml-3 block text-gray-700">
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <textarea
                rows="6"
                placeholder={`Type your answer here (max ${currentQuestion.maxWords} words)...`}
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Word count: {answers[currentQuestion.id] ? answers[currentQuestion.id].split(/\s+/).filter(Boolean).length : 0} / {currentQuestion.maxWords}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <button
          type="button"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            currentQuestionIndex === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous
        </button>
        
        <div className="flex space-x-4">
          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleSubmitExam}
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                confirmSubmit 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : confirmSubmit ? (
                'Confirm Submission'
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-1" />
                  Submit Exam
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          )}
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {confirmSubmit && !isSubmitting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-center text-yellow-500 mb-4">
              <AlertTriangle className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Submit Exam?</h3>
            <p className="text-sm text-gray-500 mb-6 text-center">
              You have answered {answeredCount} out of {exam.questions.length} questions. 
              Once submitted, you cannot return to this exam.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={cancelSubmit}
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeExam;