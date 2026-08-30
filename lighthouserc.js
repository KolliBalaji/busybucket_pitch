export default {
  ci: {
    collect: {
      // Runs Lighthouse audits against the local development server URL
      url: ['http://localhost:5173/'],
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'ready in',
      startServerTimeout: 10000,
    },
    assert: {
      assertions: {
        // Assert minimum thresholds requested in the QA brief
        'categories:performance': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // LCP <= 2.5 seconds
        'interactive': ['error', { maxNumericValue: 3800 }],             // TTI in Lighthouse "good" range (<3.8s)
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
