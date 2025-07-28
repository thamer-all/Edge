import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target,
  Activity,
  Zap,
  Brain,
  Eye,
  Download,
  Filter,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Database,
  Server,
  Wifi,
  HardDrive
} from 'lucide-react';

const AdvancedAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock analytics data
    const mockData = generateMockAnalytics();
    setAnalyticsData(mockData);
    setIsLoading(false);
  };

  const generateMockAnalytics = () => {
    const baseMetrics = {
      userEngagement: {
        totalUsers: 1247,
        activeUsers: 892,
        newUsers: 156,
        returningUsers: 736,
        averageSessionDuration: 24.5,
        bounceRate: 12.3,
        pageViews: 8456,
        uniquePageViews: 6234
      },
      learningMetrics: {
        lessonsCompleted: 3421,
        averageCompletionRate: 78.4,
        averageQuizScore: 84.2,
        totalStudyTime: 15670, // minutes
        conceptsLearned: 892,
        certificationsEarned: 234,
        averageLearningSpeed: 1.2, // concepts per hour
        retentionRate: 76.8
      },
      performanceMetrics: {
        pageLoadTime: 1.2,
        firstContentfulPaint: 0.8,
        largestContentfulPaint: 2.1,
        cumulativeLayoutShift: 0.05,
        timeToInteractive: 1.8,
        serverResponseTime: 180,
        errorRate: 0.3,
        uptime: 99.8
      },
      deviceMetrics: {
        desktop: 62.4,
        mobile: 31.2,
        tablet: 6.4,
        browsers: {
          chrome: 58.2,
          safari: 23.1,
          firefox: 12.8,
          edge: 5.9
        },
        operatingSystems: {
          windows: 45.6,
          macos: 28.9,
          ios: 15.3,
          android: 10.2
        }
      },
      contentMetrics: {
        mostViewedLessons: [
          { name: 'Neural Networks Basics', views: 1234, rating: 4.8 },
          { name: 'Linear Algebra Fundamentals', views: 987, rating: 4.6 },
          { name: 'Python for AI', views: 876, rating: 4.9 },
          { name: 'Deep Learning Introduction', views: 743, rating: 4.7 },
          { name: 'Machine Learning Ethics', views: 652, rating: 4.5 }
        ],
        searchQueries: [
          { query: 'neural networks', count: 456 },
          { query: 'machine learning', count: 387 },
          { query: 'python programming', count: 298 },
          { query: 'data science', count: 234 },
          { query: 'AI ethics', count: 189 }
        ]
      },
      systemHealth: {
        cpuUsage: 45.2,
        memoryUsage: 67.8,
        diskUsage: 34.1,
        networkLatency: 89,
        activeConnections: 1247,
        queueSize: 23,
        cacheHitRate: 94.2,
        databaseConnections: 45
      }
    };

    return baseMetrics;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getHealthStatus = (value, thresholds) => {
    if (value >= thresholds.good) return { status: 'good', color: 'text-green-600' };
    if (value >= thresholds.warning) return { status: 'warning', color: 'text-yellow-600' };
    return { status: 'critical', color: 'text-red-600' };
  };

  const getHealthIcon = (status) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <XCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const exportData = (type) => {
    const dataToExport = {
      timestamp: new Date().toISOString(),
      timeRange,
      data: analyticsData
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${type}-${timeRange}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const memoizedCharts = useMemo(() => {
    if (!analyticsData.userEngagement) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Engagement Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Users</span>
                <span className="font-semibold">{formatNumber(analyticsData.userEngagement.activeUsers)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Session Duration</span>
                <span className="font-semibold">{analyticsData.userEngagement.averageSessionDuration}m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bounce Rate</span>
                <span className="font-semibold">{analyticsData.userEngagement.bounceRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Learning Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <span className="font-semibold">{analyticsData.learningMetrics.averageCompletionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quiz Score</span>
                <span className="font-semibold">{analyticsData.learningMetrics.averageQuizScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Study Time</span>
                <span className="font-semibold">{formatDuration(analyticsData.learningMetrics.totalStudyTime)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Page Load</span>
                <span className="font-semibold">{analyticsData.performanceMetrics.pageLoadTime}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Error Rate</span>
                <span className="font-semibold">{analyticsData.performanceMetrics.errorRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="font-semibold">{analyticsData.performanceMetrics.uptime}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }, [analyticsData]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Advanced Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading analytics data...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Advanced Analytics Dashboard
              <Badge variant="secondary">Real-time</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => exportData('full')}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={loadAnalyticsData}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Analytics Tabs */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {memoizedCharts}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{formatNumber(analyticsData.userEngagement?.totalUsers || 0)}</p>
                    <p className="text-xs text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{formatNumber(analyticsData.learningMetrics?.lessonsCompleted || 0)}</p>
                    <p className="text-xs text-muted-foreground">Lessons Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{analyticsData.performanceMetrics?.pageLoadTime || 0}s</p>
                    <p className="text-xs text-muted-foreground">Avg Load Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{analyticsData.learningMetrics?.retentionRate || 0}%</p>
                    <p className="text-xs text-muted-foreground">Retention Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <span className="font-semibold">{analyticsData.deviceMetrics?.desktop || 0}%</span>
                  </div>
                  <Progress value={analyticsData.deviceMetrics?.desktop || 0} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <span className="font-semibold">{analyticsData.deviceMetrics?.mobile || 0}%</span>
                  </div>
                  <Progress value={analyticsData.deviceMetrics?.mobile || 0} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Tablet</span>
                    </div>
                    <span className="font-semibold">{analyticsData.deviceMetrics?.tablet || 0}%</span>
                  </div>
                  <Progress value={analyticsData.deviceMetrics?.tablet || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* User Behavior */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Behavior</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New vs Returning</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>New Users</span>
                      <span>{analyticsData.userEngagement?.newUsers || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Returning Users</span>
                      <span>{analyticsData.userEngagement?.returningUsers || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Most Viewed Lessons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Most Viewed Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.contentMetrics?.mostViewedLessons?.map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{lesson.name}</p>
                        <p className="text-xs text-muted-foreground">{lesson.views} views • ⭐ {lesson.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search Queries */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Search Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.contentMetrics?.searchQueries?.map((query, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{query.query}</span>
                      <Badge variant="secondary">{query.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Core Web Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Core Web Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">LCP</span>
                    <span className={`font-semibold ${analyticsData.performanceMetrics?.largestContentfulPaint <= 2.5 ? 'text-green-600' : 'text-red-600'}`}>
                      {analyticsData.performanceMetrics?.largestContentfulPaint || 0}s
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">FCP</span>
                    <span className={`font-semibold ${analyticsData.performanceMetrics?.firstContentfulPaint <= 1.8 ? 'text-green-600' : 'text-red-600'}`}>
                      {analyticsData.performanceMetrics?.firstContentfulPaint || 0}s
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CLS</span>
                    <span className={`font-semibold ${analyticsData.performanceMetrics?.cumulativeLayoutShift <= 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                      {analyticsData.performanceMetrics?.cumulativeLayoutShift || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Server Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Server Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="font-semibold">{analyticsData.performanceMetrics?.serverResponseTime || 0}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="font-semibold text-green-600">{analyticsData.performanceMetrics?.uptime || 0}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <span className="font-semibold">{analyticsData.performanceMetrics?.errorRate || 0}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* System Health Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{analyticsData.systemHealth?.cpuUsage || 0}%</span>
                    {getHealthIcon(getHealthStatus(100 - (analyticsData.systemHealth?.cpuUsage || 0), { good: 70, warning: 50 }).status)}
                  </div>
                  <Progress value={analyticsData.systemHealth?.cpuUsage || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{analyticsData.systemHealth?.memoryUsage || 0}%</span>
                    {getHealthIcon(getHealthStatus(100 - (analyticsData.systemHealth?.memoryUsage || 0), { good: 70, warning: 50 }).status)}
                  </div>
                  <Progress value={analyticsData.systemHealth?.memoryUsage || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Disk Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{analyticsData.systemHealth?.diskUsage || 0}%</span>
                    {getHealthIcon(getHealthStatus(100 - (analyticsData.systemHealth?.diskUsage || 0), { good: 80, warning: 60 }).status)}
                  </div>
                  <Progress value={analyticsData.systemHealth?.diskUsage || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{analyticsData.systemHealth?.networkLatency || 0}ms</span>
                    {getHealthIcon(getHealthStatus(200 - (analyticsData.systemHealth?.networkLatency || 0), { good: 150, warning: 100 }).status)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {analyticsData.systemHealth?.activeConnections || 0} active connections
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsDashboard; 