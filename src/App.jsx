import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './frontend/context/AuthContext';
import ProtectedRoute from './frontend/components/ProtectedRoute';

// Layouts
import MainLayout from './frontend/layouts/MainLayout';

// Pages
import Home from './frontend/pages/Home';
import Login from './frontend/pages/Login';
import Register from './frontend/pages/Register';
import Dashboard from './frontend/pages/Dashboard';
// import ExamList from './frontend/pages/ExamList';
// import ExamDetails from './frontend/pages/ExamDetails';
import TakeExam from './frontend/pages/TakeExam';
import Results from './frontend/pages/Results';
// import Certificates from './frontend/pages/Certificates';
// import AdminDashboard from './frontend/pages/admin/AdminDashboard';
import CreateExam from './frontend/pages/admin/CreateExam';
// import ManageUsers from './frontend/pages/admin/ManageUsers';
// import ExaminerDashboard from './frontend/pages/examiner/ExaminerDashboard';
import EvaluateExams from './frontend/pages/examiner/EvaluateExams';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Student Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="exams" element={<ExamList />} />
            <Route path="exams/:examId" element={<ExamDetails />} />
            <Route path="take-exam/:examId" element={<TakeExam />} />
            <Route path="results" element={<Results />} />
            <Route path="certificates" element={<Certificates />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="create-exam" element={<CreateExam />} />
            <Route path="manage-users" element={<ManageUsers />} />
          </Route>

          {/* Examiner Routes */}
          <Route path="/examiner" element={
            <ProtectedRoute requiredRole="examiner">
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ExaminerDashboard />} />
            <Route path="evaluate" element={<EvaluateExams />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;