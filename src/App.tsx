import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
// WhyChooseUs removed per design request
import RentalOptions from './components/RentalOptions';
import SaleOptions from './components/SaleOptions';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Auth components
const Login = React.lazy(() => import('./components/auth/Login'));
const Signup = React.lazy(() => import('./components/auth/Signup'));

// Shopping components
const Cart = React.lazy(() => import('./components/Cart'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const OrderConfirmation = React.lazy(() => import('./components/OrderConfirmation'));
const UserOrders = React.lazy(() => import('./components/UserOrders'));

// Admin components
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard'));
const CreateBlog = React.lazy(() => import('./components/admin/CreateBlog'));

// Shop and Rent pages
const ShopPage = React.lazy(() => import('./components/ShopPage'));
const RentPage = React.lazy(() => import('./components/RentPage'));

// Blog components
const BlogPage = React.lazy(() => import('./components/BlogPage'));
const BlogDetail = React.lazy(() => import('./components/BlogDetail'));

// 404 component
const NotFound = React.lazy(() => import('./components/NotFound'));

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

// Admin Route Component
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  // For now, allow any authenticated user to access admin
  // In production, you'd check for admin role
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <React.Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        }>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <Gallery />
                <RentalOptions />
                <SaleOptions />
                {/* WhyChooseUs removed per design request */}
                <Testimonials />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            
            {/* Protected Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <UserOrders />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation/:orderId" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/blogs" element={
              <AdminRoute>
                <CreateBlog />
              </AdminRoute>
            } />
            
            {/* Catch-all route for 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;