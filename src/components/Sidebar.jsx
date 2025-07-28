import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Home, BookOpen, Brain, Zap, Code, Settings, User, Search, Menu, X, BarChart3, Clock, LogOut, LogIn, TrendingUp, Info, HelpCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';
import LoginModal from './LoginModal';
import LanguageSelector from './LanguageSelector';
import { useI18n } from '../contexts/I18nContext';
import GlobalSearch from './GlobalSearch';

const Sidebar = ({ onOpenStudyTimer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const [expandedCategories, setExpandedCategories] = useState(['machine-learning']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const { t } = useI18n();

  // Updated categories to match the new roadmap structure
  const categories = [
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      icon: Brain,
      progress: 65,
      roadmap: 'AI Engineer',
      subCategories: [
        { id: 'fundamentals', title: 'Fundamentals', progress: 75 },
        { id: 'machine-learning', title: 'Machine Learning', progress: 70 },
        { id: 'deep-learning', title: 'Deep Learning', progress: 60 },
        { id: 'deployment', title: 'Deployment & MLOps', progress: 55 }
      ]
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      icon: BookOpen,
      progress: 70,
      roadmap: 'Data Analyst',
      subCategories: [
        { id: 'statistics', title: 'Statistics & Probability', progress: 80 },
        { id: 'data-visualization', title: 'Data Visualization', progress: 90 },
        { id: 'sql-databases', title: 'SQL & Databases', progress: 75 },
        { id: 'business-intelligence', title: 'Business Intelligence', progress: 65 }
      ]
    },
    {
      id: 'ai-data-scientist',
      title: 'AI Data Scientist',
      icon: Zap,
      progress: 60,
      roadmap: 'AI Data Scientist',
      subCategories: [
        { id: 'data-science', title: 'Data Science Lifecycle', progress: 70 },
        { id: 'feature-engineering', title: 'Feature Engineering', progress: 65 },
        { id: 'model-deployment', title: 'Model Deployment', progress: 55 },
        { id: 'big-data', title: 'Big Data Tools', progress: 45 }
      ]
    },
    {
      id: 'ai-red-teaming',
      title: 'AI Red Teaming',
      icon: Settings,
      progress: 45,
      roadmap: 'AI Red Teaming',
      subCategories: [
        { id: 'security-fundamentals', title: 'Security Fundamentals', progress: 70 },
        { id: 'adversarial-attacks', title: 'Adversarial Attacks', progress: 60 },
        { id: 'penetration-testing', title: 'Penetration Testing', progress: 45 },
        { id: 'defense-strategies', title: 'Defense Strategies', progress: 35 }
      ]
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      icon: Brain,
      progress: 40,
      roadmap: 'AI Agents',
      subCategories: [
        { id: 'reinforcement-learning', title: 'Reinforcement Learning', progress: 55 },
        { id: 'multi-agent-systems', title: 'Multi-Agent Systems', progress: 35 },
        { id: 'autonomous-agents', title: 'Autonomous Agents', progress: 30 },
        { id: 'agent-frameworks', title: 'Agent Frameworks & Tools', progress: 25 }
      ]
    },
    {
      id: 'ai-red-teaming',
      title: 'AI Red Teaming & Security',
      icon: Settings,
      progress: 35,
      subCategories: [
        { id: 'adversarial-attacks', title: 'Adversarial Attacks & Defense', progress: 45 },
        { id: 'model-security', title: 'AI Model Security Testing', progress: 35 },
        { id: 'data-poisoning', title: 'Data Poisoning & Protection', progress: 30 },
        { id: 'ai-safety-testing', title: 'AI Safety & Robustness Testing', progress: 25 }
      ]
    },
    {
      id: 'mlops-production',
      title: 'MLOps & Production AI',
      icon: Code,
      progress: 55,
      subCategories: [
        { id: 'model-deployment', title: 'Model Deployment Strategies', progress: 65 },
        { id: 'ci-cd-ml', title: 'CI/CD for Machine Learning', progress: 50 },
        { id: 'monitoring-observability', title: 'Model Monitoring & Observability', progress: 45 },
        { id: 'scalable-infrastructure', title: 'Scalable ML Infrastructure', progress: 40 }
      ]
    },
    {
      id: 'cloud-ai-platforms',
      title: 'Cloud AI Platforms',
      icon: Zap,
      progress: 50,
      subCategories: [
        { id: 'aws-ai-services', title: 'AWS AI/ML Services', progress: 60 },
        { id: 'gcp-ai-platform', title: 'Google Cloud AI Platform', progress: 50 },
        { id: 'azure-ml', title: 'Azure Machine Learning', progress: 45 },
        { id: 'edge-ai-deployment', title: 'Edge AI & Mobile Deployment', progress: 35 }
      ]
    },
    {
      id: 'ai-ethics-governance',
      title: 'AI Ethics & Governance',
      icon: User,
      progress: 45,
      subCategories: [
        { id: 'responsible-ai', title: 'Responsible AI Development', progress: 55 },
        { id: 'bias-fairness', title: 'Bias Detection & Mitigation', progress: 50 },
        { id: 'explainable-ai', title: 'Explainable AI (XAI)', progress: 40 },
        { id: 'ai-governance', title: 'AI Governance & Compliance', progress: 35 }
      ]
    },
    {
      id: 'specialized-domains',
      title: 'Specialized AI Domains',
      icon: Settings,
      progress: 30,
      subCategories: [
        { id: 'healthcare-ai', title: 'Healthcare AI Applications', progress: 35 },
        { id: 'finance-ai', title: 'AI in Finance & FinTech', progress: 40 },
        { id: 'autonomous-systems', title: 'Autonomous Vehicles & Robotics', progress: 25 },
        { id: 'scientific-ai', title: 'AI for Scientific Research', progress: 20 }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleNavigation = (categoryId, subCategoryId = null) => {
    const category = categories.find(cat => cat.id === categoryId);
    
    // Handle special navigation pages
    if (categoryId === 'overview') {
      navigate('/dashboard');
    } else if (categoryId === 'progress-dashboard') {
      navigate('/dashboard');
    } else if (categoryId === 'analytics') {
      navigate('/analytics');
    } else if (categoryId === 'about') {
      navigate('/about');
    } else if (categoryId === 'help') {
      navigate('/help');
    } else if (categoryId === 'contact') {
      navigate('/contact');
    } else if (category && category.roadmap) {
      // Navigate to roadmap page
      navigate(`/roadmap/${category.roadmap.toLowerCase().replace(/\s+/g, '-')}`);
    } else if (subCategoryId) {
      navigate(`/category/${categoryId}/${subCategoryId}`);
    } else {
      navigate(`/category/${categoryId}/overview`);
    }
    // Close mobile menu on navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const SidebarContent = () => (
    <>
      {/* Logo and Brand */}
      <div className="p-4 lg:p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-sidebar-foreground">AGI Learning</h1>
          </div>
          {/* Close button for mobile */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 lg:p-4 border-b border-sidebar-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/60" />
          <Input
            placeholder="Search lessons, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowGlobalSearch(true)}
            className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/60 text-sm cursor-pointer"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto sidebar-scroll p-3 lg:p-4">
        <nav className="space-y-1 lg:space-y-2">
          {/* Overview */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base ${
              currentCategory === null || currentCategory === 'overview' ? 'bg-sidebar-accent' : ''
            }`}
            onClick={() => handleNavigation('overview')}
          >
            <Home className="w-4 h-4 mr-2 lg:mr-3" />
            Overview
          </Button>

          {/* Progress Dashboard */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base ${
              currentCategory === 'progress-dashboard' ? 'bg-sidebar-accent' : ''
            }`}
            onClick={() => handleNavigation('progress-dashboard')}
          >
            <BarChart3 className="w-4 h-4 mr-2 lg:mr-3" />
            Progress Dashboard
          </Button>

          {/* Study Timer */}
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base"
            onClick={onOpenStudyTimer}
          >
            <Clock className="w-4 h-4 mr-2 lg:mr-3" />
            Study Timer
          </Button>

          {/* Analytics */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base ${
              location.pathname === '/analytics' ? 'bg-sidebar-accent' : ''
            }`}
            onClick={() => handleNavigation('analytics')}
          >
            <TrendingUp className="w-4 h-4 mr-2 lg:mr-3" />
            Analytics
          </Button>

          {/* Divider */}
          <div className="my-4 border-t border-sidebar-border"></div>

          {/* About */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base ${
              location.pathname === '/about' ? 'bg-sidebar-accent' : ''
            }`}
            onClick={() => handleNavigation('about')}
          >
            <Info className="w-4 h-4 mr-2 lg:mr-3" />
            About
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base ${
              location.pathname === '/help' ? 'bg-sidebar-accent' : ''
            }`}
            onClick={() => handleNavigation('help')}
          >
            <HelpCircle className="w-4 h-4 mr-2 lg:mr-3" />
            Help & Support
          </Button>

          {/* Contact */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base ${
              location.pathname === '/contact' ? 'bg-sidebar-accent' : ''
            }`}
            onClick={() => handleNavigation('contact')}
          >
            <Mail className="w-4 h-4 mr-2 lg:mr-3" />
            Contact Us
          </Button>

          {/* Categories */}
          {categories.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategories.includes(category.id);
            const isActive = currentCategory === category.id;

            return (
              <div key={category.id} className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent text-sm lg:text-base ${
                    isActive ? 'bg-sidebar-accent' : ''
                  }`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2 lg:mr-3" />
                    <span className="font-medium truncate">{category.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  )}
                </Button>

                {/* Progress Bar */}
                <div className="px-5 lg:px-7 pb-2">
                  <div className="flex items-center justify-between text-xs text-sidebar-foreground/70 mb-1">
                    <span>Progress</span>
                    <span>{category.progress}%</span>
                  </div>
                  <Progress value={category.progress} className="h-1" />
                </div>

                {/* Sub-categories */}
                {isExpanded && (
                  <div className="ml-5 lg:ml-7 space-y-1 animate-slide-in-left">
                    {category.subCategories.map((subCategory) => (
                      <Button
                        key={subCategory.id}
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground text-xs lg:text-sm ${
                          currentSubCategory === subCategory.id ? 'bg-sidebar-accent text-sidebar-foreground' : ''
                        }`}
                        onClick={() => handleNavigation(category.id, subCategory.id)}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mr-2 lg:mr-3 flex-shrink-0" />
                        <span className="truncate">{subCategory.title}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-3 lg:p-4 border-t border-sidebar-border">
        {isAuthenticated ? (
          <>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 text-sidebar-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-sidebar-foreground/60">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm mb-2"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent text-sm mb-3"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-sidebar-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground">Guest User</p>
                <p className="text-xs text-sidebar-foreground/60">Sign in to save progress</p>
              </div>
            </div>
            <Button
              variant="default"
              size="sm"
              className="w-full mb-3"
              onClick={() => setShowLoginModal(true)}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </>
        )}
        
        {/* Theme Toggle */}
        <ThemeToggle variant="full" />

        {/* Language Selector */}
        <LanguageSelector size="sm" />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50 bg-background shadow-md"
        onClick={toggleMobileMenu}
      >
        <Menu className="w-4 h-4" />
      </Button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex sidebar-nav w-64 h-screen flex-col border-r border-sidebar-border bg-sidebar">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={toggleMobileMenu}
          />
          {/* Sidebar */}
          <div className="relative w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* Global Search */}
      {showGlobalSearch && (
        <GlobalSearch 
          onNavigate={(path) => {
            navigate(path);
            setShowGlobalSearch(false);
            setSearchQuery('');
          }}
          onClose={() => {
            setShowGlobalSearch(false);
            setSearchQuery('');
          }}
        />
      )}
    </>
  );
};

export default Sidebar;

