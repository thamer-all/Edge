import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { I18nProvider } from './contexts/I18nContext';

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary';

// Core Components
import Sidebar from './components/Sidebar';
import PWAInstallPrompt from './components/PWAInstallPrompt';

// Lazy loaded components for better performance
const Dashboard = lazy(() => import('./components/Dashboard'));
const LessonPage = lazy(() => import('./components/LessonPage'));
const CategoryPage = lazy(() => import('./components/CategoryPage'));
const ProgressDashboard = lazy(() => import('./components/ProgressDashboard'));
const AdvancedAnalyticsDashboard = lazy(() => import('./components/AdvancedAnalyticsDashboard'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const HelpPage = lazy(() => import('./components/HelpPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthProvider>
            <GamificationProvider>
              <Router>
                <div className="flex h-screen bg-background">
                  <Sidebar />
                  
                  <main className="flex-1 overflow-auto">
                    <div className="container mx-auto p-4 space-y-6">
                      <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/lesson/:lessonId" element={<LessonPage />} />
                          <Route path="/category/:categoryId" element={<CategoryPage />} />
                          <Route path="/category/:categoryId/:subCategoryId" element={<CategoryPage />} />
                          <Route path="/category/:categoryId/:subCategoryId/:lessonId" element={<LessonPage />} />
                          <Route path="/progress" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/analytics" element={<AdvancedAnalyticsDashboard />} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/help" element={<HelpPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </Suspense>
                    </div>
                  </main>
                </div>
                
                <PWAInstallPrompt />
                <Toaster position="bottom-right" />
              </Router>
            </GamificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

export default App;
