/**
 * Routing E2E Tests.
 *
 * This suite validates the application's page routing:
 * - Direct page loads for deep-linked services and cities (e.g. /services/deep-home-cleaning/mohali).
 * - Fallbacks and page redirects when invalid service params are supplied.
 * - Nonexistent catch-all routes mapping gracefully back to the Home page instead of a blank screen.
 */

describe('Routing and Deep-linking E2E Tests', () => {
  it('direct navigation to a valid deep-link route loads the page correctly', () => {
    // Navigate straight to deep-link
    cy.visit('/services/deep-home-cleaning/mohali');

    // Assert that the page details reflect Deep Home Cleaning and Mohali
    cy.url().should('include', '/services/deep-home-cleaning/mohali');
    cy.get('h1').should('contain', 'Best Deep Home Cleaning in Mohali');
    cy.contains('Base Fee:').should('be.visible');
  });

  it('redirects to fallback (Home) if an invalid service is passed via URL parameters', () => {
    // Navigate to an invalid service URL
    cy.visit('/services/fake-cleaning-service-name');

    // The app should redirect to homepage /
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('h1').should('contain', 'Sparkling Clean');
  });

  it('renders standard fallback homepage (no blank page) on nonexistent paths', () => {
    // Navigate to a completely invalid route
    cy.visit('/some/random/nonexistent/path');

    // The app routes path="*" to Home
    cy.url().should('include', '/some/random/nonexistent/path');
    cy.get('h1').should('contain', 'Sparkling Clean');
  });
});
