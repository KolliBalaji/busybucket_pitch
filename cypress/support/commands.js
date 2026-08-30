/**
 * Custom Cypress Commands for Busy Bucket Test Suite.
 *
 * NOTE: The current codebase lacks `data-testid` attributes on interactive components.
 * These custom commands define reusable wrapper selectors. Once `data-testid` is added,
 * these selectors should be updated to use:
 * - `data-testid="city-select"`
 * - `data-testid="service-widget-toggle-${serviceName}"`
 * - `data-testid="service-grid-toggle-${serviceName}"`
 */

Cypress.Commands.add('selectCity', (cityName) => {
  cy.log(`Selecting city: ${cityName}`);
  cy.get('#booking-card-section select').select(cityName);
});

Cypress.Commands.add('toggleServiceInWidget', (serviceName) => {
  cy.log(`Toggling service in widget: ${serviceName}`);
  cy.get('#booking-card-section')
    .contains('button', serviceName)
    .click();
});

Cypress.Commands.add('toggleServiceInGrid', (serviceName) => {
  cy.log(`Toggling service in grid: ${serviceName}`);
  cy.get('#services-section')
    .contains('div.group', serviceName)
    .find('button')
    .click();
});
