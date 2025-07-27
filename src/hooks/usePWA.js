import { useState, useEffect, useCallback } from 'react';

export const usePWA = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if app is installed
  useEffect(() => {
    const checkInstallation = () => {
      // Check if running in standalone mode (installed PWA)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsInstalled(isStandalone);
    };

    checkInstallation();
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkInstallation);

    return () => {
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkInstallation);
    };
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Register service worker
  const registerServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        setIsLoading(true);
        const reg = await navigator.serviceWorker.register('/sw.js');
        setRegistration(reg);

        // Check for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setHasUpdate(true);
            }
          });
        });

        // Handle service worker updates
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          setHasUpdate(false);
          window.location.reload();
        });

        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Service Worker not supported');
      setIsLoading(false);
    }
  }, []);

  // Install PWA
  const installPWA = useCallback(async () => {
    if (!registration) return;

    try {
      await registration.prompt();
      const choiceResult = await registration.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installed successfully');
        setIsInstalled(true);
      }
    } catch (error) {
      console.error('PWA installation failed:', error);
    }
  }, [registration]);

  // Update PWA
  const updatePWA = useCallback(() => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [registration]);

  // Request notification permission
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }, []);

  // Send push notification
  const sendNotification = useCallback((title, options = {}) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      return new Notification(title, {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        ...options
      });
    }
    return null;
  }, []);

  // Get app info
  const getAppInfo = useCallback(() => {
    return {
      name: 'AGI Learning Platform',
      version: '1.0.0',
      isOnline,
      isInstalled,
      hasUpdate,
      isPWA: 'serviceWorker' in navigator,
      isStandalone: window.matchMedia('(display-mode: standalone)').matches
    };
  }, [isOnline, isInstalled, hasUpdate]);

  // Initialize PWA
  useEffect(() => {
    registerServiceWorker();
  }, [registerServiceWorker]);

  return {
    isOnline,
    isInstalled,
    hasUpdate,
    isLoading,
    registration,
    installPWA,
    updatePWA,
    requestNotificationPermission,
    sendNotification,
    getAppInfo,
    registerServiceWorker
  };
}; 