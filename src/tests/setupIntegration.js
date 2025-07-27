import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock API server for integration tests
const server = setupServer(
  // Mock health check endpoint
  http.get('http://localhost:5001/api/health', () => {
    return HttpResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: 'test'
    });
  }),

  // Mock auth endpoints
  http.post('http://localhost:5001/api/auth/login', async ({ request }) => {
    const body = await request.json();
    if (body.email === 'test@example.com' && body.password === 'password') {
      return HttpResponse.json({
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User'
        }
      });
    }
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  http.post('http://localhost:5001/api/auth/register', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      token: 'mock-jwt-token',
      user: {
        id: 2,
        email: body.email,
        name: body.name
      }
    });
  }),

  // Mock quiz endpoints
  http.get('http://localhost:5001/api/quiz/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      title: 'Test Quiz',
      questions: [
        {
          id: 1,
          question: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correct: 1
        }
      ]
    });
  }),

  http.post('http://localhost:5001/api/quiz/:id/submit', async ({ request, params }) => {
    const body = await request.json();
    return HttpResponse.json({
      score: 85,
      correct: 1,
      total: 1,
      passed: true
    });
  }),

  // Mock analytics endpoints
  http.get('http://localhost:5001/api/analytics/progress', () => {
    return HttpResponse.json({
      totalLessons: 50,
      completedLessons: 25,
      averageScore: 87,
      timeSpent: 1200,
      streakDays: 7
    });
  }),

  // Catch all unhandled requests
  http.all('*', ({ request }) => {
    console.warn(`Unhandled request: ${request.method} ${request.url}`);
    return HttpResponse.json(
      { error: 'Mock API endpoint not found' },
      { status: 404 }
    );
  })
);

// Start server before all tests
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn'
  });
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Clean up after all tests
afterAll(() => {
  server.close();
});

// Global test utilities
global.mockApiResponse = (url, response, options = {}) => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(response, options);
    })
  );
};

global.mockApiError = (url, status = 500, message = 'Internal Server Error') => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json({ error: message }, { status });
    })
  );
};

// Mock localStorage for tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

global.localStorage = localStorageMock;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})); 