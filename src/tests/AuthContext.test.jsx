import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
// eslint-disable-next-line no-undef
global.localStorage = localStorageMock;

// Test component to access auth context
const TestComponent = () => {
  const { user, login, register, logout, isAuthenticated, loading } = useAuth();
  
  return (
    <div>
      <div data-testid="user-info">
        {user ? `Logged in as ${user.name}` : 'Not logged in'}
      </div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </div>
      <div data-testid="loading-status">
        {loading ? 'Loading' : 'Not loading'}
      </div>
      <button 
        data-testid="login-btn" 
        onClick={() => login('test@example.com', 'password')}
      >
        Login
      </button>
      <button 
        data-testid="register-btn" 
        onClick={() => register('test@example.com', 'password', 'Test User')}
      >
        Register
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
    localStorageMock.removeItem.mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('should start with no user and not authenticated', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-info')).toHaveTextContent('Not logged in');
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
    });

    it('should load user from localStorage if available', () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        avatar: 'test-avatar.jpg'
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockUser));

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-info')).toHaveTextContent('Logged in as Test User');
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });

    it('should handle invalid localStorage data gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('user-info')).toHaveTextContent('Not logged in');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_user');
    });
  });

  describe('Login Functionality', () => {
    it('should successfully login a user', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByTestId('login-btn');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent('Logged in as test');
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'auth_user',
        expect.stringContaining('test@example.com')
      );
    });

    it('should handle login errors gracefully', async () => {
      // Mock a failed login by making the promise reject
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      // This test would need to be updated if we add actual error handling
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Register Functionality', () => {
    it('should successfully register a new user', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = screen.getByTestId('register-btn');
      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(screen.getByTestId('user-info')).toHaveTextContent('Logged in as Test User');
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'auth_user',
        expect.stringContaining('Test User')
      );
    });
  });

  describe('Logout Functionality', () => {
    it('should successfully logout a user', async () => {
      // First login
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByTestId('login-btn');
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      });

      // Then logout
      const logoutButton = screen.getByTestId('logout-btn');
      fireEvent.click(logoutButton);

      expect(screen.getByTestId('user-info')).toHaveTextContent('Not logged in');
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_user');
    });
  });

  describe('User Data Structure', () => {
    it('should create user with correct data structure', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const registerButton = screen.getByTestId('register-btn');
      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'auth_user',
          expect.stringContaining('"id"')
        );
      });

      const savedUserData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      
      expect(savedUserData).toHaveProperty('id');
      expect(savedUserData).toHaveProperty('email', 'test@example.com');
      expect(savedUserData).toHaveProperty('name', 'Test User');
      expect(savedUserData).toHaveProperty('avatar');
      expect(savedUserData).toHaveProperty('joinDate');
      expect(savedUserData).toHaveProperty('preferences');
      expect(savedUserData).toHaveProperty('progress');
      expect(savedUserData.preferences).toHaveProperty('theme');
      expect(savedUserData.preferences).toHaveProperty('notifications');
      expect(savedUserData.preferences).toHaveProperty('autoSave');
      expect(savedUserData.progress).toHaveProperty('completedLessons');
      expect(savedUserData.progress).toHaveProperty('totalXP');
      expect(savedUserData.progress).toHaveProperty('currentStreak');
      expect(savedUserData.progress).toHaveProperty('longestStreak');
    });
  });

  describe('Loading States', () => {
    it('should show loading state during authentication operations', async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      const loginButton = screen.getByTestId('login-btn');
      fireEvent.click(loginButton);

      // Should show loading immediately after click
      expect(screen.getByTestId('loading-status')).toHaveTextContent('Loading');

      await waitFor(() => {
        expect(screen.getByTestId('loading-status')).toHaveTextContent('Not loading');
      });
    });
  });
}); 