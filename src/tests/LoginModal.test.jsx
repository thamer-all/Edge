import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import LoginModal from '../components/LoginModal';
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

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('LoginModal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} isOpen={false} />
        </TestWrapper>
      );

      expect(screen.queryByText('Welcome to AGI Learning')).not.toBeInTheDocument();
    });

    it('should render login form by default', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Welcome to AGI Learning')).toBeInTheDocument();
      expect(screen.getByText('Sign in to continue your learning journey')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Register')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });

    it('should render close button', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const closeButton = screen.getByRole('button', { name: '' });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('should switch to register tab when clicked', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const registerTab = screen.getByRole('tab', { name: 'Register' });
      fireEvent.click(registerTab);

      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    });

    it('should switch back to login tab when clicked', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      // Switch to register tab
      const registerTab = screen.getByRole('tab', { name: 'Register' });
      fireEvent.click(registerTab);

      // Switch back to login tab
      const loginTab = screen.getByRole('tab', { name: 'Login' });
      fireEvent.click(loginTab);

      expect(screen.queryByLabelText('Full Name')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Confirm Password')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show error for empty email field', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
      });
    });

    it('should show error for empty password field', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    it('should show error for short password', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });

      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
      });
    });

    it('should show error for missing name in register form', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      // Switch to register tab
      const registerTab = screen.getByRole('tab', { name: 'Register' });
      fireEvent.click(registerTab);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: 'Create Account' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('should show error for mismatched passwords in register form', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      // Switch to register tab
      const registerTab = screen.getByRole('tab', { name: 'Register' });
      fireEvent.click(registerTab);

      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });

      const submitButton = screen.getByRole('button', { name: 'Create Account' });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      });
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility in login form', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const passwordInput = screen.getByLabelText('Password');
      const toggleButton = passwordInput.parentElement.querySelector('button');

      // Password should be hidden by default
      expect(passwordInput).toHaveAttribute('type', 'password');

      // Click toggle button
      fireEvent.click(toggleButton);

      // Password should be visible
      expect(passwordInput).toHaveAttribute('type', 'text');

      // Click toggle button again
      fireEvent.click(toggleButton);

      // Password should be hidden again
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('should toggle confirm password visibility in register form', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      // Switch to register tab
      const registerTab = screen.getByRole('tab', { name: 'Register' });
      fireEvent.click(registerTab);

      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      const toggleButton = confirmPasswordInput.parentElement.querySelector('button');

      // Password should be hidden by default
      expect(confirmPasswordInput).toHaveAttribute('type', 'password');

      // Click toggle button
      fireEvent.click(toggleButton);

      // Password should be visible
      expect(confirmPasswordInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Form Submission', () => {
    it('should successfully submit login form with valid data', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: 'Sign In' });
      fireEvent.click(submitButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText('Signing in...')).toBeInTheDocument();
      });

      // Should close modal after successful login
      await waitFor(() => {
        expect(defaultProps.onClose).toHaveBeenCalled();
      });
    });

    it('should successfully submit register form with valid data', async () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      // Switch to register tab
      const registerTab = screen.getByRole('tab', { name: 'Register' });
      fireEvent.click(registerTab);

      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const confirmPasswordInput = screen.getByLabelText('Confirm Password');
      
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

      const submitButton = screen.getByRole('button', { name: 'Create Account' });
      fireEvent.click(submitButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText('Creating account...')).toBeInTheDocument();
      });

      // Should close modal after successful registration
      await waitFor(() => {
        expect(defaultProps.onClose).toHaveBeenCalled();
      });
    });
  });

  describe('Close Functionality', () => {
    it('should call onClose when close button is clicked', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      const closeButton = screen.getByRole('button', { name: '' });
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form inputs', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('should have proper labels in register form', () => {
      render(
        <TestWrapper>
          <LoginModal {...defaultProps} />
        </TestWrapper>
      );

      // Switch to register tab
      const registerTab = screen.getByRole('tab', { name: 'Register' });
      fireEvent.click(registerTab);

      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    });
  });
}); 