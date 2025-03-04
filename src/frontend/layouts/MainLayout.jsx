import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, LogOut, User, Home, Award, FileText, BarChart2, Users, Settings } from 'lucide-react';

const MainLayout = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">ExamCert</span>
                </Link>
              </div>
              
              <nav className="ml-6 flex space-x-8">
                <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Home
                </Link>
                {currentUser && (
                  <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Dashboard
                  </Link>
                )}
              </nav>
            </div>
            
            <div className="flex items-center">
              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    {currentUser.name || currentUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar for authenticated users */}
          {currentUser && (
            <aside className="w-64 bg-white shadow-sm p-4 mt-6 rounded-lg h-[calc(100vh-6rem)]">
              <nav className="space-y-1">
                {/* Student Links */}
                {currentUser.role === 'student' && (
                  <>
                    <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <Home className="mr-3 h-5 w-5 text-gray-500" />
                      Dashboard
                    </Link>
                    <Link to="/dashboard/exams" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <FileText className="mr-3 h-5 w-5 text-gray-500" />
                      Available Exams
                    </Link>
                    <Link to="/dashboard/results" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <BarChart2 className="mr-3 h-5 w-5 text-gray-500" />
                      Results
                    </Link>
                    <Link to="/dashboard/certificates" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <Award className="mr-3 h-5 w-5 text-gray-500" />
                      Certificates
                    </Link>
                  </>
                )}

                {/* Admin Links */}
                {currentUser.role === 'admin' && (
                  <>
                    <Link to="/admin" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <Home className="mr-3 h-5 w-5 text-gray-500" />
                      Admin Dashboard
                    </Link>
                    <Link to="/admin/create-exam" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <FileText className="mr-3 h-5 w-5 text-gray-500" />
                      Create Exam
                    </Link>
                    <Link to="/admin/manage-users" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <Users className="mr-3 h-5 w-5 text-gray-500" />
                      Manage Users
                    </Link>
                  </>
                )}

                {/* Examiner Links */}
                {currentUser.role === 'examiner' && (
                  <>
                    <Link to="/examiner" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <Home className="mr-3 h-5 w-5 text-gray-500" />
                      Examiner Dashboard
                    </Link>
                    <Link to="/examiner/evaluate" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                      <FileText className="mr-3 h-5 w-5 text-gray-500" />
                      Evaluate Exams
                    </Link>
                  </>
                )}

                {/* Common Links */}
                <Link to="/profile" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                  <User className="mr-3 h-5 w-5 text-gray-500" />
                  Profile
                </Link>
                <Link to="/settings" className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
                  <Settings className="mr-3 h-5 w-5 text-gray-500" />
                  Settings
                </Link>
              </nav>
            </aside>
          )}

          {/* Main Content */}
          <main className={`flex-1 py-6 ${currentUser ? 'pl-6' : ''}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;