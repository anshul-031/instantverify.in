import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/layout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Verification from './pages/Verification';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cancellation from './pages/Cancellation';
import Shipping from './pages/Shipping';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cancellation" element={<Cancellation />} />
                <Route path="/shipping" element={<Shipping />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/verification"
                  element={
                    <ProtectedRoute>
                      <Verification />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;