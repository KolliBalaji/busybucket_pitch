/**
 * Edge Case E2E Tests.
 *
 * This suite validates the application's durability under extreme/unusual environments:
 * - Slow network conditions (throttling simulation via asset interception delay).
 * - Offline mode execution (mocking window.navigator.onLine and triggering event handlers).
 * - Browser history navigation (navigating to details, modifying state, using back/forward, and ensuring state consistency).
 */

describe('Network & Navigation Edge Cases E2E Tests', () => {
  it('displays a loading indicator during simulated slow network asset retrieval', () => {
    // Intercept main JS chunk with a 2-second latency delay
    cy.intercept('**/main.jsx', (req) => {
      req.on('response', (res) => {
        res.setDelay(2000);
      });
    }).as('slowScript');

    cy.visit('/');

    // Verify loading overlay or loader element is visible during the delay window
    // Note: If the app lacks a loading screen, this test will fail as expected, exposing the bug.
    cy.get('[data-testid="loading-indicator"], .loader, .spinner')
      .should('be.visible');

    // Wait for script to resolve
    cy.wait('@slowScript');
    cy.get('[data-testid="loading-indicator"], .loader, .spinner')
      .should('not.exist');
  });

  it('renders a user-facing offline/error alert when the browser drops offline', () => {
    cy.visit('/');

    // Force network state offline and trigger the window offline event handler
    cy.window().then((win) => {
      Object.defineProperty(win.navigator, 'onLine', {
        configurable: true,
        value: false,
        writable: true
      });
      win.dispatchEvent(new win.Event('offline'));
    });

    // Assert that the user is notified with an offline warning message
    // Note: This test will fail if the app lacks offline recovery UI, exposing the bug.
    cy.contains(/you are offline|check your connection|network error/i)
      .should('be.visible')
      .and('not.contain', 'blank');
  });

  it('restores state and renders valid layouts during browser back/forward navigation', () => {
    cy.visit('/');
    cy.selectCity('Dehradun');
    cy.toggleServiceInWidget('Sofa / Carpet Cleaning');

    // Navigate away to the Refund Policy page
    cy.contains('Refund & Satisfaction Policy').click();
    cy.url().should('include', '/refund-policy');

    // Click back in browser history
    cy.go('back');

    // Assert that we are back on the homepage and the selected state is preserved or valid
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('#booking-card-section select').should('have.value', 'Dehradun');
    cy.get('#booking-card-section').contains('p', '✅ Sofa / Carpet Cleaning').should('be.visible');
  });
});
