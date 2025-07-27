import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePWA } from '../hooks/usePWA';

const PWAInstallPrompt = () => {
  const { isInstalled, installPWA, hasUpdate, updatePWA } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Check if we should show the install prompt
  useEffect(() => {
    const shouldShowPrompt = () => {
      // Don't show if already installed or dismissed
      if (isInstalled || dismissed) return false;
      
      // Don't show on mobile Safari (handles PWA install differently)
      const isMobileSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isMobileSafari) return false;
      
      // Show after a delay to not be intrusive
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    shouldShowPrompt();
  }, [isInstalled, dismissed]);

  // Handle install
  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installPWA();
      setShowPrompt(false);
    } catch (error) {
      console.error('Install failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  // Handle update
  const handleUpdate = () => {
    updatePWA();
    setShowPrompt(false);
  };

  // Handle dismiss
  const handleDismiss = () => {
    setDismissed(true);
    setShowPrompt(false);
    // Remember dismissal for 7 days
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  // Check if prompt was recently dismissed
  useEffect(() => {
    const dismissedTime = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissedTime) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        setDismissed(true);
      } else {
        localStorage.removeItem('pwa_prompt_dismissed');
      }
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">
                  {hasUpdate ? 'Update Available' : 'Install App'}
                </CardTitle>
                <CardDescription className="text-sm">
                  {hasUpdate 
                    ? 'A new version is available' 
                    : 'Get the full app experience'
                  }
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {hasUpdate ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update to get the latest features and improvements.
              </p>
              <Button 
                onClick={handleUpdate}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Update Now
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile app</span>
                </div>
                <div className="flex items-center space-x-1">
                                  <Monitor className="w-4 h-4" />
                <span>Desktop app</span>
                </div>
              </div>
              
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>Offline access to lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>Push notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>Faster loading</span>
                </div>
              </div>
              
              <Button 
                onClick={handleInstall}
                disabled={isInstalling}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isInstalling ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Installing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Install App
                  </>
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDismiss}
                className="w-full text-gray-500 hover:text-gray-700"
              >
                Maybe later
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt; 