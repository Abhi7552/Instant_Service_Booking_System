// View: Main application component handling routing and layout
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import ChooseVendor from './pages/ChooseVendor';
import BookService from './pages/BookService';
import History from './pages/History';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import VendorDashboard from './pages/vendor/VendorDashboard';

// Wrapper to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register'];
  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/choose-vendor/:serviceId" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ChooseVendor />
            </ProtectedRoute>
          } />

          {/* User Module Routes */}
          <Route path="/book/:serviceId/:vendorId" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <BookService />
            </ProtectedRoute>
          } />
          <Route path="/book/:serviceId" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <BookService />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <History />
            </ProtectedRoute>
          } />

          {/* Vendor Module Routes */}
          <Route path="/vendor" element={
            <ProtectedRoute allowedRoles={['vendor', 'admin']}>
              <VendorDashboard />
            </ProtectedRoute>
          } />

          {/* Admin Module Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
