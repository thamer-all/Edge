import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  Zap, 
  Activity, 
  HardDrive, 
  Wifi, 
  Eye, 
  Timer,
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3,
  Minimize2
} from 'lucide-react';

const PerformanceMonitor = ({ minimized = false, onToggleMinimize }) => {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    memoryUsage: null,
    connectionType: null,
    renderTime: null
  });
  
  const [isVisible, setIsVisible] = useState(true);
  const observerRef = useRef(null);
  const renderStartTime = useRef(performance.now());

  useEffect(() => {
    // Initialize performance monitoring
    initializePerformanceObserver();
    measureMemoryUsage();
    detectConnectionType();
    
    // Set up periodic monitoring
    const interval = setInterval(() => {
      measureMemoryUsage();
      measureRenderTime();
    }, 2000);

    return () => {
      clearInterval(interval);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const initializePerformanceObserver = () => {
    if ('PerformanceObserver' in window) {
      // Observe Core Web Vitals
      try {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry) => {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        observerRef.current = { fcpObserver, lcpObserver, clsObserver, fidObserver };
      } catch (error) {
        console.warn('Performance Observer not fully supported:', error);
      }
    }

    // Time to First Byte
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const nav = navigationEntries[0];
      setMetrics(prev => ({ ...prev, ttfb: nav.responseStart - nav.requestStart }));
    }
  };

  const measureMemoryUsage = () => {
    if ('memory' in performance) {
      const memory = performance.memory;
      const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      setMetrics(prev => ({ 
        ...prev, 
        memoryUsage: {
          used: memory.usedJSHeapSize,
          total: memory.jsHeapSizeLimit,
          percent: usagePercent
        }
      }));
    }
  };

  const detectConnectionType = () => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      setMetrics(prev => ({ 
        ...prev, 
        connectionType: {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        }
      }));
    }
  };

  const measureRenderTime = () => {
    const currentTime = performance.now();
    const renderTime = currentTime - renderStartTime.current;
    setMetrics(prev => ({ ...prev, renderTime }));
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getMetricStatus = (value, thresholds) => {
    if (value <= thresholds.good) return { status: 'good', color: 'text-green-600', icon: CheckCircle };
    if (value <= thresholds.needs_improvement) return { status: 'warning', color: 'text-yellow-600', icon: AlertTriangle };
    return { status: 'poor', color: 'text-red-600', icon: AlertTriangle };
  };

  const getCoreWebVitalsStatus = () => {
    const vitals = [
      { name: 'FCP', value: metrics.fcp, thresholds: { good: 1800, needs_improvement: 3000 } },
      { name: 'LCP', value: metrics.lcp, thresholds: { good: 2500, needs_improvement: 4000 } },
      { name: 'CLS', value: metrics.cls, thresholds: { good: 0.1, needs_improvement: 0.25 } },
      { name: 'FID', value: metrics.fid, thresholds: { good: 100, needs_improvement: 300 } }
    ];

    return vitals.map(vital => ({
      ...vital,
      status: vital.value ? getMetricStatus(vital.value, vital.thresholds) : null
    }));
  };

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleMinimize}
          className="bg-background border shadow-lg"
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          Performance
          {metrics.memoryUsage && (
            <Badge variant="secondary" className="ml-2">
              {Math.round(metrics.memoryUsage.percent)}%
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  const vitalsStatus = getCoreWebVitalsStatus();

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Performance Monitor
          </CardTitle>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleMinimize}
              className="h-6 w-6 p-0"
            >
              <Minimize2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Core Web Vitals */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Core Web Vitals</h4>
          <div className="grid grid-cols-2 gap-2">
            {vitalsStatus.map((vital) => (
              <div key={vital.name} className="flex items-center justify-between text-xs">
                <span>{vital.name}</span>
                <div className="flex items-center gap-1">
                  {vital.value && (
                    <>
                      <span className={vital.status.color}>
                        {vital.name === 'CLS' ? vital.value.toFixed(3) : formatTime(vital.value)}
                      </span>
                      <vital.status.icon className={`w-3 h-3 ${vital.status.color}`} />
                    </>
                  )}
                  {!vital.value && <span className="text-muted-foreground">-</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Memory Usage */}
        {metrics.memoryUsage && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Memory Usage</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Used</span>
                <span>{formatBytes(metrics.memoryUsage.used)}</span>
              </div>
              <Progress value={metrics.memoryUsage.percent} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{Math.round(metrics.memoryUsage.percent)}%</span>
                <span>{formatBytes(metrics.memoryUsage.total)} total</span>
              </div>
            </div>
          </div>
        )}

        {/* Connection Info */}
        {metrics.connectionType && (
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Connection</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span>Type</span>
                <Badge variant="secondary" className="text-xs">
                  {metrics.connectionType.effectiveType}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Downlink</span>
                <span>{metrics.connectionType.downlink} Mbps</span>
              </div>
              <div className="flex items-center justify-between">
                <span>RTT</span>
                <span>{metrics.connectionType.rtt}ms</span>
              </div>
            </div>
          </div>
        )}

        {/* Additional Metrics */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Other Metrics</h4>
          <div className="space-y-1 text-xs">
            {metrics.ttfb && (
              <div className="flex items-center justify-between">
                <span>TTFB</span>
                <span>{formatTime(metrics.ttfb)}</span>
              </div>
            )}
            {metrics.renderTime && (
              <div className="flex items-center justify-between">
                <span>Render Time</span>
                <span>{formatTime(metrics.renderTime)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
          <h5 className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
            Performance Tips
          </h5>
          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-0.5">
            <li>• Close unused tabs</li>
            <li>• Clear browser cache</li>
            <li>• Use faster internet connection</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMonitor; 