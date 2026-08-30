/**
 * E2E Booking Flow Tests.
 *
 * This suite validates the main booking customizer flow:
 * - City selection state changes.
 * - Service selection checkbox visual toggles.
 * - Dynamic generation of WhatsApp messages in the visual preview container.
 * - URL and text content validation via window.open stubbing.
 * - Multi-select resets and state cleanups.
 * - Validation states on incomplete selections.
 * - Double-click prevention on CTA submission.
 */

describe('Booking Flow E2E Tests', () => {
  beforeEach(() => {
    // Start at homepage
    cy.visit('/');
    // Set up window.open spy/stub before tests
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
  });

  it('updates city selection and visual UI state', () => {
    // Verify default city is Mohali
    cy.get('#booking-card-section select').should('have.value', 'Mohali');

    // Change city to Dehradun
    cy.selectCity('Dehradun');
    cy.get('#booking-card-section select').should('have.value', 'Dehradun');
  });

  it('toggles service selections and updates visual active class state', () => {
    const serviceName = 'Deep Home Cleaning';

    // Toggle service on
    cy.toggleServiceInWidget(serviceName);

    // Verify it is visually marked selected (check for active state design styles or SVG checkbox)
    cy.get('#booking-card-section')
      .contains('button', serviceName)
      .should('have.class', 'bg-brand-teal/10'); // Based on Home.jsx class for selected state

    // Toggle service off
    cy.toggleServiceInWidget(serviceName);

    // Verify it is deselected
    cy.get('#booking-card-section')
      .contains('button', serviceName)
      .should('not.have.class', 'bg-brand-teal/10');
  });

  it('generates a WhatsApp link/message matching exactly the selected service and city', () => {
    cy.selectCity('Chandigarh');
    cy.toggleServiceInWidget('AC Servicing');

    // Verify preview text in WhatsApp bubble contains details
    cy.get('#booking-card-section')
      .contains('p', 'City: Chandigarh')
      .should('be.visible');
    cy.get('#booking-card-section')
      .contains('p', '✅ AC Servicing')
      .should('be.visible');

    // Click submit/booking CTA
    cy.get('#booking-card-section')
      .contains('button', 'Start Your Booking Now')
      .click();

    // Verify window.open was called with the exact formatted URL
    cy.get('@windowOpen').should('have.been.calledOnce');
    cy.get('@windowOpen').should((stub) => {
      const call = stub.getCall(0);
      const url = call.args[0];
      const target = call.args[1];

      expect(target).to.equal('_blank');
      expect(url).to.include('wa.me/919615920005');
      expect(url).to.include(encodeURIComponent('City: Chandigarh'));
      expect(url).to.include(encodeURIComponent('✅ AC Servicing'));
    });
  });

  it('preserves clean state and prevents leaks when switching selections (A+B -> C+D)', () => {
    // Select first pair
    cy.selectCity('Mohali');
    cy.toggleServiceInWidget('Water Tank Cleaning');
    cy.toggleServiceInWidget('AC Servicing');

    // Verify both are listed
    cy.get('#booking-card-section').contains('p', '✅ Water Tank Cleaning').should('be.visible');
    cy.get('#booking-card-section').contains('p', '✅ AC Servicing').should('be.visible');

    // Deselect them
    cy.toggleServiceInWidget('Water Tank Cleaning');
    cy.toggleServiceInWidget('AC Servicing');

    // Select second pair
    cy.selectCity('Dehradun');
    cy.toggleServiceInWidget('Pest Control');

    // Assert final message reflects only the new state and has no leftover content from previous selection
    cy.get('#booking-card-section').contains('p', 'City: Dehradun').should('be.visible');
    cy.get('#booking-card-section').contains('p', '✅ Pest Control').should('be.visible');
    cy.get('#booking-card-section').contains('p', '✅ Water Tank Cleaning').should('not.exist');
    cy.get('#booking-card-section').contains('p', '✅ AC Servicing').should('not.exist');
  });

  it('validates or disables booking CTA when selection is incomplete', () => {
    // Reload page to start with zero services selected
    cy.visit('/');

    // NOTE: This test will fail if the CTA is not disabled when there is no selection.
    // This highlights the design requirement discrepancy as-is.
    cy.get('#booking-card-section')
      .contains('button', 'Start Your Booking Now')
      .should('have.attr', 'disabled'); // Or expect some validation error text to be visible
  });

  it('throttles rapid repeated clicks on the CTA to trigger only a single navigation', () => {
    cy.selectCity('Ludhiana');
    cy.toggleServiceInWidget('Pest Control');

    // Rapid double-click the CTA
    cy.get('#booking-card-section')
      .contains('button', 'Start Your Booking Now')
      .dblclick();

    // Verify window.open was only called once
    cy.get('@windowOpen').should('have.been.calledOnce');
  });
});
