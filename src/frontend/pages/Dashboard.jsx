import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FileText, Award, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    upcomingExams: [],
    recentResults: [],
    totalExamsTaken: 0,
    totalCertificates: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll simulate the data
        
        // Simulated data
        const mockData = {
          upcomingExams: [
            { id: 1, title: 'Web Development Fundamentals', date: '2025-06-15T10:00:00', duration: 60 },
            { id: 2, title: 'JavaScript Advanced Concepts', date: '2025-06-20T14:00:00', duration: 90 }
          ],
          recentResults: [
            { id: 1, examTitle: 'Introduction to React', date: '2025-06-01', score: 85, passed: true },
            { id: 2, examTitle: 'CSS Mastery', date: '2025-05-25', score: 72, passed: true },
            { id: 3, examTitle: 'Database Design', date: '2025-05-15', score: 65, passed: false }
          ],
          totalExamsTaken: 5,
          totalCertificates: 2
        };
        
        // Simulate API delay
        setTimeout(() => {
          setStats({
            ...mockData,
            loading: false,
            error: null
          });
        }, 1000);
        
      } catch (error) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load dashboard data'
        }));
      }
    };

    fetchDashboardData();
  }, []);

  if (stats.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              {stats.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {currentUser.name || 'Student'}</h1>
        <p className="text-gray-600">Here's an overview of your exam activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <FileText className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Exams Taken</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalExamsTaken}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Award className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Certificates Earned</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCertificates}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Exams</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.upcomingExams.length > 0 ? (
            stats.upcomingExams.map(exam => (
              <div key={exam.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium text-gray-900">{exam.title}</h4>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">
                        {new Date(exam.date).toLocaleString()} ({exam.duration} minutes)
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/dashboard/exams/${exam.id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No upcoming exams scheduled.
            </div>
          )}
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <Link
            to="/dashboard/exams"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all available exams
          </Link>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Results</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.recentResults.length > 0 ? (
            stats.recentResults.map(result => (
              <div key={result.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium text-gray-900">{result.examTitle}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(result.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.passed ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      )}
                      {result.passed ? 'Passed' : 'Failed'}
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">
                      Score: {result.score}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No exam results yet.
            </div>
          )}
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <Link
            to="/dashboard/results"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;