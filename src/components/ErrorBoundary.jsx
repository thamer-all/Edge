import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  AlertTriangle, 
  RefreshCw, 
  Bug, 
  Home, 
  Mail, 
  Copy,
  ExternalLink 
} from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Generate unique error ID
    const eventId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error: error,
      errorInfo: errorInfo,
      eventId: eventId
    });

    // Report error to analytics service
    this.reportError(error, errorInfo, eventId);
  }

  reportError = async (error, errorInfo, eventId) => {
    try {
      // Simulate error reporting to external service
      const errorReport = {
        eventId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        userId: this.props.userId || 'anonymous'
      };

      // In a real app, you would send this to your error tracking service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   body: JSON.stringify(errorReport)
      // });
      
      console.log('Error reported:', errorReport);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleCopyError = () => {
    const errorDetails = `
Error ID: ${this.state.eventId}
Message: ${this.state.error?.message}
Stack: ${this.state.error?.stack}
Component Stack: ${this.state.errorInfo?.componentStack}
Timestamp: ${new Date().toISOString()}
URL: ${window.location.href}
    `.trim();

    navigator.clipboard.writeText(errorDetails).then(() => {
      // You could show a toast notification here
      console.log('Error details copied to clipboard');
    });
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-6 h-6" />
                Something went wrong
                <Badge variant="destructive" className="ml-auto">
                  Error
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Message */}
              <div className="space-y-2">
                <h3 className="font-medium">What happened?</h3>
                <p className="text-sm text-muted-foreground">
                  An unexpected error occurred while rendering this page. 
                  We've automatically reported this issue and our team will investigate.
                </p>
              </div>

              {/* Error ID */}
              <div className="space-y-2">
                <h3 className="font-medium">Error ID</h3>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                    {this.state.eventId}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={this.handleCopyError}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Details
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Include this ID when reporting the issue for faster resolution.
                </p>
              </div>

              {/* Development Error Details */}
              {isDevelopment && this.state.error && (
                <div className="space-y-2">
                  <h3 className="font-medium text-orange-600">Development Details</h3>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                      {this.state.error.message}
                    </p>
                    <details className="text-xs">
                      <summary className="cursor-pointer text-red-600 hover:text-red-800">
                        View Stack Trace
                      </summary>
                      <pre className="mt-2 whitespace-pre-wrap text-red-700 dark:text-red-300">
                        {this.state.error.stack}
                      </pre>
                    </details>
                    {this.state.errorInfo?.componentStack && (
                      <details className="text-xs mt-2">
                        <summary className="cursor-pointer text-red-600 hover:text-red-800">
                          View Component Stack
                        </summary>
                        <pre className="mt-2 whitespace-pre-wrap text-red-700 dark:text-red-300">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={this.handleReload} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={this.handleGoHome} className="flex-1">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Support Information */}
              <div className="border-t pt-4 space-y-3">
                <h3 className="font-medium text-sm">Need Help?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <a
                    href="mailto:support@agi-platform.com"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </a>
                  <a
                    href="/help"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Help Center
                  </a>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Quick Fixes
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Try refreshing the page</li>
                  <li>• Clear your browser cache and cookies</li>
                  <li>• Check your internet connection</li>
                  <li>• Try using a different browser</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component wrapper for functional components
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Hook for manual error reporting
export const useErrorHandler = () => {
  const reportError = (error, context = {}) => {
    console.error('Manual error report:', error, context);
    
    // In a real app, you would report this to your error tracking service
    const errorReport = {
      eventId: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message,
      stack: error.stack,
      context: context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.log('Manual error reported:', errorReport);
  };

  return { reportError };
};

export default ErrorBoundary; 