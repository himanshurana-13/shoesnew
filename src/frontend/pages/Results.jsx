import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Download, Award, BarChart2 } from 'lucide-react';
import axios from 'axios';

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get('examId');
  const score = queryParams.get('score');
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll simulate the data
        
        if (examId && score) {
          // If we have examId and score from query params, it means we just finished an exam
          const mockResult = {
            id: '1',
            examId: examId,
            examTitle: 'Web Development Fundamentals',
            date: new Date().toISOString(),
            score: parseInt(score),
            passingScore: 70,
            timeSpent: '25:30',
            correctAnswers: 7,
            totalQuestions: 10,
            status: parseInt(score) >= 70 ? 'passed' : 'failed',
            certificateAvailable: parseInt(score) >= 70,
            feedback: 'Good job on HTML and CSS questions. Consider reviewing JavaScript concepts.',
            questionBreakdown: [
              { category: 'HTML', correct: 3, total: 3 },
              { category: 'CSS', correct: 2, total: 3 },
              { category: 'JavaScript', correct: 2, total: 4 }
            ]
          };
          
          setResult(mockResult);
        } else {
          // Otherwise, fetch the most recent result
          const mockResult = {
            id: '1',
            examId: '1',
            examTitle: 'Web Development Fundamentals',
            date: '2025-06-01T14:30:00',
            score: 85,
            passingScore: 70,
            timeSpent: '25:30',
            correctAnswers: 17,
            totalQuestions: 20,
            status: 'passed',
            certificateAvailable: true,
            feedback: 'Excellent work! You demonstrated strong knowledge across all areas.',
            questionBreakdown: [
              { category: 'HTML', correct: 6, total: 6 },
              { category: 'CSS', correct: 5, total: 6 },
              { category: 'JavaScript', correct: 6, total: 8 }
            ]
          };
          
          setResult(mockResult);
        }
        
        // Simulate API delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        setError('Failed to load result data');
        setLoading(false);
      }
    };

    fetchResult();
  }, [examId, score]);

  const downloadCertificate = () => {
    // In a real app, this would trigger a certificate download
    alert('Certificate download would start here');
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
        <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
        <p className="text-gray-600">
          {result.examTitle} - {new Date(result.date).toLocaleDateString()}
        </p>
      </div>

      {/* Result Summary Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className={`px-6 py-4 ${result.status === 'passed' ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center">
            {result.status === 'passed' ? (
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500 mr-3" />
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {result.status === 'passed' ? 'Congratulations! You Passed' : 'Exam Not Passed'}
              </h2>
              <p className="text-sm text-gray-600">
                You scored {result.score}% (Passing score: {result.passingScore}%)
              </p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-r border-gray-200 pr-4">
              <p className="text-sm text-gray-500">Score</p>
              <p className="text-2xl font-bold text-gray-900">{result.score}%</p>
            </div>
            <div className="border-r border-gray-200 px-4">
              <p className="text-sm text-gray-500">Correct Answers</p>
              <p className="text-2xl font-bold text-gray-900">{result.correctAnswers}/{result.totalQuestions}</p>
            </div>
            <div className="pl-4">
              <p className="text-sm text-gray-500">Time Spent</p>
              <p className="text-2xl font-bold text-gray-900">{result.timeSpent}</p>
            </div>
          </div>
        </div>
        
        {result.certificateAvailable && (
          <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-indigo-500 mr-2" />
                <p className="text-indigo-700 font-medium">Certificate Available</p>
              </div>
              <button
                onClick={downloadCertificate}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Download className="h-4 w-4 mr-1" />
                Download Certificate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Performance Breakdown */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <BarChart2 className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Performance Breakdown</h3>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="space-y-4">
            {result.questionBreakdown.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-700">{category.category}</p>
                  <p className="text-sm text-gray-500">
                    {category.correct}/{category.total} ({Math.round((category.correct / category.total) * 100)}%)
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      (category.correct / category.total) >= 0.7 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(category.correct / category.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Feedback</h3>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-gray-700">{result.feedback}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/dashboard/exams"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Browse More Exams
        </Link>
        
        {result.status !== 'passed' && (
          <Link
            to={`/dashboard/exams/${result.examId}`}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Retake Exam
          </Link>
        )}
      </div>
    </div>
  );
};

export default Results;