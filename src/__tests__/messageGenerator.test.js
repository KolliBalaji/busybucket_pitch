/**
 * Message Generator Unit Test Suite.
 *
 * This suite imports the actual cities and services config from the application
 * and dynamically runs a cross-product test suite over all combinations.
 * It uses Vitest and @testing-library/react to test the BookingContext hooks,
 * ensuring no undefined/null values or broken template literals are produced.
 *
 * NOTE: Uses React.createElement to prevent parser errors in plain .js environments.
 * NOTE: Clears localStorage in a beforeEach block to guarantee test isolation.
 */

import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { BookingProvider, useBooking } from '../context/BookingContext';
import { services, cities } from '../data/servicesData';

describe('WhatsApp Message Generator Configuration Tests', () => {
  // Clear localStorage before each test to guarantee test isolation
  beforeEach(() => {
    localStorage.clear();
  });

  // Verify configuration has entries
  test('Configuration file contains cities and services', () => {
    expect(cities.length).toBeGreaterThan(0);
    expect(services.length).toBeGreaterThan(0);
  });

  // Data-driven tests for every service x city combination
  cities.forEach((city) => {
    services.forEach((service) => {
      test(`Message format for City: "${city.name}" and Service: "${service.name}"`, () => {
        let url = '';
        let messageText = '';

        function TestConsumer() {
          const { setCity, toggleService, getWhatsAppURL, whatsAppMessageText, selectedServices } = useBooking();

          useEffect(() => {
            // Set the city
            setCity(city.name);
            
            // Check if the service is already selected to avoid toggling it off
            if (!selectedServices.includes(service.name)) {
              toggleService(service.name);
            }
          }, []);

          url = getWhatsAppURL();
          messageText = whatsAppMessageText;
          return null;
        }

        render(
          React.createElement(
            BookingProvider,
            null,
            React.createElement(TestConsumer, null)
          )
        );

        // 1. Text checks
        expect(messageText).toBeTruthy();
        expect(messageText).toContain(`City: ${city.name}`);
        expect(messageText).toContain(`✅ ${service.name}`);

        // 2. Prevent template literal leaks / undefined injections
        expect(messageText).not.toContain('undefined');
        expect(messageText).not.toContain('null');
        expect(messageText).not.toContain('[object Object]');

        // 3. Verify URL encoding and shape
        const expectedMsg = `Hello 👋 I want your cleaning services.\n\nCity: ${city.name}\nI'm interested in:\n✅ ${service.name}\n\nPlease share availability & pricing. Thank you!`;
        expect(messageText).toBe(expectedMsg);

        const expectedUrl = `https://wa.me/919615920005?text=${encodeURIComponent(expectedMsg)}`;
        expect(url).toBe(expectedUrl);
      });
    });
  });

  // Test fallback message when no services are selected
  test('Generates correct fallback message when no services are selected', () => {
    let url = '';
    let messageText = '';

    function FallbackConsumer() {
      const { getWhatsAppURL, whatsAppMessageText } = useBooking();
      url = getWhatsAppURL();
      messageText = whatsAppMessageText;
      return null;
    }

    render(
      React.createElement(
        BookingProvider,
        null,
        React.createElement(FallbackConsumer, null)
      )
    );

    const expectedMsg = 'Hello.. I want your cleaning services';
    expect(messageText).toBe(expectedMsg);
    expect(url).toBe(`https://wa.me/919615920005?text=${encodeURIComponent(expectedMsg)}`);
  });
});
