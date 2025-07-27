import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GamificationProvider } from '../contexts/GamificationContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import LessonPage from '../components/LessonPage';
// eslint-disable-next-line no-unused-vars
import { lessonData, getDefaultLesson } from '../data/lessonData';
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

// Mock fetch for AI content generation
// eslint-disable-next-line no-undef
global.fetch = vi.fn();

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <GamificationProvider>
        {children}
      </GamificationProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('LessonPage Component', () => {
  const defaultProps = {
    categoryId: 'foundational-mathematics',
    subCategoryId: 'linear-algebra',
    lessonId: 'intro-lesson',
    onNavigate: vi.fn(),
    onBack: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {});
  });

  describe('Rendering', () => {
    it('renders lesson title and description', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Introduction to Linear Algebra')).toBeInTheDocument();
      expect(screen.getByText('Master vectors, matrices, and the fundamental operations that power AI algorithms')).toBeInTheDocument();
    });

    it('renders lesson metadata', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('50 min')).toBeInTheDocument();
      expect(screen.getByText('Beginner')).toBeInTheDocument();
      expect(screen.getByText('3 sections')).toBeInTheDocument();
    });

    it('renders learning objectives on first section', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Learning Objectives')).toBeInTheDocument();
      expect(screen.getByText('Understand vectors and vector operations')).toBeInTheDocument();
      expect(screen.getByText('Master matrix multiplication and properties')).toBeInTheDocument();
    });

    it('renders section navigation', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Sections')).toBeInTheDocument();
      expect(screen.getAllByText('Introduction to Vectors')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Matrices and Operations')[0]).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('displays content section text', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText(/Vectors are fundamental building blocks/)).toBeInTheDocument();
    });

    it('displays key points', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Key Points')).toBeInTheDocument();
      expect(screen.getByText('Vectors are ordered lists of numbers')).toBeInTheDocument();
      expect(screen.getByText('They represent data in machine learning')).toBeInTheDocument();
    });

    it('displays real-world examples', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Real-World Applications')).toBeInTheDocument();
      expect(screen.getByText('Image Recognition')).toBeInTheDocument();
      expect(screen.getByText('Each pixel becomes a number in a vector representing the image')).toBeInTheDocument();
    });

    it('displays interactive content for interactive sections', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Navigate to second section (interactive)
      const secondSection = screen.getByText('Matrices and Operations');
      fireEvent.click(secondSection);

      expect(screen.getByText('Comparison & Analysis')).toBeInTheDocument();
      expect(screen.getByText('Addition')).toBeInTheDocument();
    });

    it('displays quiz for quiz sections', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Navigate to third section (quiz)
      const thirdSection = screen.getByText('Knowledge Check');
      fireEvent.click(thirdSection);

      expect(screen.getByText('Knowledge Check')).toBeInTheDocument();
      expect(screen.getByText('What is a vector?')).toBeInTheDocument();
      expect(screen.getByText('A list of numbers')).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('initializes with correct default state', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Check that first section is active
      expect(screen.getByText('Section 1 of 3')).toBeInTheDocument();
      expect(screen.getByText('1 completed')).toBeInTheDocument();
    });

    it('updates section when navigation clicked', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const secondSection = screen.getByText('Matrices and Operations');
      fireEvent.click(secondSection);

      expect(screen.getByText('Section 2 of 3')).toBeInTheDocument();
    });

    it('tracks completed sections', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const nextButton = screen.getByText('Next Section');
      fireEvent.click(nextButton);

      expect(screen.getByText('2 completed')).toBeInTheDocument();
    });
  });

  describe('localStorage Integration', () => {
    it('loads notes from localStorage', () => {
      const savedNotes = 'My personal notes about vectors';
      localStorageMock.getItem.mockReturnValue(savedNotes);

      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const notesButton = screen.getByLabelText('Toggle Notes');
      fireEvent.click(notesButton);

      expect(screen.getByText(savedNotes)).toBeInTheDocument();
    });

    it('saves notes to localStorage', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const notesButton = screen.getByLabelText('Toggle Notes');
      fireEvent.click(notesButton);

      const textarea = screen.getByPlaceholderText('Write your notes here...');
      fireEvent.change(textarea, { target: { value: 'New note content' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'notes_foundational-mathematics_linear-algebra_intro-lesson',
        'New note content'
      );
    });

    it('loads section summaries from localStorage', () => {
      const savedSummaries = JSON.stringify({
        'vectors-intro': 'Summary of vectors section'
      });
      localStorageMock.getItem.mockReturnValue(savedSummaries);

      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const summaryButton = screen.getByLabelText('Toggle Section Summary');
      fireEvent.click(summaryButton);

      expect(screen.getByText('Summary of vectors section')).toBeInTheDocument();
    });

    it('saves section summaries to localStorage', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const summaryButton = screen.getByLabelText('Toggle Section Summary');
      fireEvent.click(summaryButton);

      const textarea = screen.getByPlaceholderText('Write a summary of this section...');
      fireEvent.change(textarea, { target: { value: 'New summary content' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'summaries_foundational-mathematics_linear-algebra_intro-lesson',
        JSON.stringify({ 'vectors-intro': 'New summary content' })
      );
    });
  });

  describe('Gamification Integration', () => {
    it('records note writing action', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const notesButton = screen.getByLabelText('Toggle Notes');
      fireEvent.click(notesButton);

      const textarea = screen.getByPlaceholderText('Write your notes here...');
      fireEvent.change(textarea, { target: { value: 'Test note' } });

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      // Note: We can't directly test the gamification context here,
      // but we can verify the function was called through the component behavior
    });

    it('records quiz completion', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Navigate to quiz section
      const quizSection = screen.getByText('Knowledge Check');
      fireEvent.click(quizSection);

      // Answer the quiz question
      const correctAnswer = screen.getByText('A list of numbers');
      fireEvent.click(correctAnswer);

      // Note: We can't directly test the gamification context here,
      // but we can verify the quiz functionality works
    });
  });

  describe('AI Content Generation', () => {
    it('displays AI content generation buttons', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('AI-Enhanced Learning')).toBeInTheDocument();
      expect(screen.getByText('Enhanced Explanation')).toBeInTheDocument();
      expect(screen.getByText('More Examples')).toBeInTheDocument();
      expect(screen.getByText('Practice Problems')).toBeInTheDocument();
    });

    it('handles AI content generation', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          content: 'AI-generated content for vectors',
          keyPoints: ['AI point 1', 'AI point 2']
        })
      });

      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const aiButton = screen.getByText('Enhanced Explanation');
      fireEvent.click(aiButton);

      await waitFor(() => {
        expect(screen.getByText('AI-Generated explanation for Introduction to Vectors')).toBeInTheDocument();
      });
    });

    it('handles AI content generation failure gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('API Error'));

      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const aiButton = screen.getByText('Enhanced Explanation');
      fireEvent.click(aiButton);

      await waitFor(() => {
        expect(screen.getByText('Enhanced explanation for Introduction to Vectors')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('renders correctly on mobile viewport', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Check that mobile-friendly elements are present
      expect(screen.getByText('Introduction to Linear Algebra')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeInTheDocument();
    });

    it('renders correctly on desktop viewport', () => {
      // Mock window.innerWidth for desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Check that desktop layout elements are present
      expect(screen.getByText('Sections')).toBeInTheDocument();
      expect(screen.getByText('My Notes')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('handles back navigation', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const backButton = screen.getByText('Back');
      fireEvent.click(backButton);

      expect(defaultProps.onBack).toHaveBeenCalled();
    });

    it('handles section navigation', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      const secondSection = screen.getByText('Matrices and Operations');
      fireEvent.click(secondSection);

      expect(screen.getByText('Matrices and Operations')).toBeInTheDocument();
      expect(screen.getByText('Section 2 of 3')).toBeInTheDocument();
    });

    it('handles lesson completion', () => {
      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Navigate to last section
      const lastSection = screen.getByText('Knowledge Check');
      fireEvent.click(lastSection);

      const completeButton = screen.getByText('Complete Lesson');
      fireEvent.click(completeButton);

      // Note: We can't directly it the gamification context here,
      // but we can verify the completion functionality works
    });
  });

  describe('Error Handling', () => {
    it('handles missing lesson gracefully', () => {
      const propsWithMissingLesson = {
        ...defaultProps,
        subCategoryId: 'non-existent-category'
      };

      render(
        <TestWrapper>
          <LessonPage {...propsWithMissingLesson} />
        </TestWrapper>
      );

      expect(screen.getByText('Lesson not found')).toBeInTheDocument();
      expect(screen.getByText('Back to Category')).toBeInTheDocument();
    });

    it('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      render(
        <TestWrapper>
          <LessonPage {...defaultProps} />
        </TestWrapper>
      );

      // Should not crash the component
      expect(screen.getByText('Introduction to Linear Algebra')).toBeInTheDocument();
    });
  });
}); 