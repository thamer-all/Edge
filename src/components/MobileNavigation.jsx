import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Search, 
  User, 
  Menu, 
  Plus,
  Settings,
  Bell,
  Bookmark,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGamification } from '../contexts/GamificationContext';

const MobileNavigation = ({ onMenuClick, onSearchClick, onProfileClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { xp, level } = useGamification();
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      badge: null
    },
    {
      icon: BookOpen,
      label: 'Learn',
      path: '/roadmap/ai-engineer',
      badge: null
    },
    {
      icon: Search,
      label: 'Search',
      path: '/search',
      badge: null
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
      badge: null
    }
  ];

  const floatingActions = [
    {
      icon: Settings,
      label: 'Settings',
      action: () => navigate('/settings')
    },
    {
      icon: Bell,
      label: 'Notifications',
      action: () => navigate('/notifications')
    },
    {
      icon: Bookmark,
      label: 'Bookmarks',
      action: () => navigate('/bookmarks')
    },
    {
      icon: Clock,
      label: 'Study Timer',
      action: () => navigate('/timer')
    }
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-50 md:hidden">
        <Button
          onClick={() => setShowFloatingMenu(!showFloatingMenu)}
          className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <Plus className={`w-6 h-6 transition-transform ${showFloatingMenu ? 'rotate-45' : ''}`} />
        </Button>
      </div>

      {/* Floating Menu */}
      {showFloatingMenu && (
        <div className="fixed bottom-32 right-4 z-40 md:hidden">
          <div className="flex flex-col gap-2">
            {floatingActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  onClick={() => {
                    action.action();
                    setShowFloatingMenu(false);
                  }}
                  className="w-12 h-12 rounded-full shadow-lg bg-background border border-border hover:bg-muted"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInUp 0.3s ease-out forwards'
                  }}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* XP Progress Indicator */}
      <div className="fixed top-4 right-4 z-40 md:hidden">
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-1 flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-medium">Lv.{level}</span>
          <span className="text-xs text-muted-foreground">{xp} XP</span>
        </div>
      </div>

      {/* Backdrop for floating menu */}
      {showFloatingMenu && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setShowFloatingMenu(false)}
        />
      )}

      {/* Bottom padding for content */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default MobileNavigation; 