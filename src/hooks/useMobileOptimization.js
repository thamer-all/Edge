import { useState, useEffect, useCallback, useRef } from 'react';

export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isLowMemory, setIsLowMemory] = useState(false);
  const [isBatteryLow, setIsBatteryLow] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersReducedData, setPrefersReducedData] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /mobile|android|iphone|ipad|phone/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check connection speed
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const isSlow = connection.effectiveType === 'slow-2g' || 
                    connection.effectiveType === '2g' || 
                    connection.effectiveType === '3g';
      setIsSlowConnection(isSlow);

      const handleConnectionChange = () => {
        const isSlow = connection.effectiveType === 'slow-2g' || 
                      connection.effectiveType === '2g' || 
                      connection.effectiveType === '3g';
        setIsSlowConnection(isSlow);
      };

      connection.addEventListener('change', handleConnectionChange);
      return () => connection.removeEventListener('change', handleConnectionChange);
    }
  }, []);

  // Check memory usage
  useEffect(() => {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = performance.memory;
        const usedMemoryMB = memory.usedJSHeapSize / 1024 / 1024;
        const totalMemoryMB = memory.totalJSHeapSize / 1024 / 1024;
        const memoryUsage = (usedMemoryMB / totalMemoryMB) * 100;
        setIsLowMemory(memoryUsage > 80);
      };

      checkMemory();
      const interval = setInterval(checkMemory, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  // Check battery status
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const checkBattery = () => {
          setIsBatteryLow(battery.level < 0.2 && !battery.charging);
        };

        checkBattery();
        battery.addEventListener('levelchange', checkBattery);
        battery.addEventListener('chargingchange', checkBattery);

        return () => {
          battery.removeEventListener('levelchange', checkBattery);
          battery.removeEventListener('chargingchange', checkBattery);
        };
      });
    }
  }, []);

  // Check user preferences
  useEffect(() => {
    const checkPreferences = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      setPrefersReducedData(window.matchMedia('(prefers-reduced-data: reduce)').matches);
    };

    checkPreferences();
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dataQuery = window.matchMedia('(prefers-reduced-data: reduce)');

    motionQuery.addEventListener('change', checkPreferences);
    dataQuery.addEventListener('change', checkPreferences);

    return () => {
      motionQuery.removeEventListener('change', checkPreferences);
      dataQuery.removeEventListener('change', checkPreferences);
    };
  }, []);

  return {
    isMobile,
    isSlowConnection,
    isLowMemory,
    isBatteryLow,
    prefersReducedMotion,
    prefersReducedData
  };
};

export const useLazyLoading = (items, itemsPerPage = 10) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (visibleItems < items.length && !isLoading) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setVisibleItems(prev => Math.min(prev + itemsPerPage, items.length));
        setIsLoading(false);
      }, 300);
    }
  }, [visibleItems, items.length, isLoading, itemsPerPage]);

  const reset = useCallback(() => {
    setVisibleItems(itemsPerPage);
    setIsLoading(false);
  }, [itemsPerPage]);

  return {
    visibleItems: items.slice(0, visibleItems),
    hasMore: visibleItems < items.length,
    isLoading,
    loadMore,
    reset
  };
};

export const useImageOptimization = (src, options = {}) => {
  const {
    width = 300,
    height = 200,
    quality = 80,
    format = 'webp',
    lazy = true
  } = options;

  const [optimizedSrc, setOptimizedSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!src) return;

    const optimizeImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if WebP is supported
        const supportsWebP = await new Promise(resolve => {
          const webP = new Image();
          webP.onload = webP.onerror = () => resolve(webP.height === 2);
          webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });

        // Create optimized image URL
        let optimizedUrl = src;
        
        // Add size parameters if provided
        if (width && height) {
          optimizedUrl += `?w=${width}&h=${height}`;
        }

        // Add quality parameter
        if (quality) {
          optimizedUrl += `&q=${quality}`;
        }

        // Add format parameter
        if (format && supportsWebP) {
          optimizedUrl += `&f=${format}`;
        }

        setOptimizedSrc(optimizedUrl);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    optimizeImage();
  }, [src, width, height, quality, format]);

  return {
    src: optimizedSrc || src,
    isLoading,
    error
  };
};

export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      observerRef.current = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          setMetrics(prev => ({
            ...prev,
            [entry.name]: entry.value
          }));
        }
      });

      observerRef.current.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }

    // Monitor memory usage
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memory = performance.memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
          memoryUsed: memory.usedJSHeapSize / 1024 / 1024, // MB
          memoryTotal: memory.totalJSHeapSize / 1024 / 1024 // MB
        }));
      }
    }, 1000);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearInterval(memoryInterval);
    };
  }, []);

  return metrics;
};

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useThrottle = (callback, delay = 100) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
}; 