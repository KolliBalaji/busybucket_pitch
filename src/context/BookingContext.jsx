import React, { createContext, useContext, useState, useEffect } from "react";
import { services, cities } from "../data/servicesData";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState(() => {
    const saved = localStorage.getItem("bb_booking_city");
    return saved || "Mohali";
  });

  const [selectedServices, setSelectedServices] = useState(() => {
    const saved = localStorage.getItem("bb_booking_services");
    return saved ? JSON.parse(saved) : [];
  });

  const [mascotState, setMascotState] = useState("idle");

  // Persist city to localStorage
  useEffect(() => {
    localStorage.setItem("bb_booking_city", selectedCity);
  }, [selectedCity]);

  // Persist services to localStorage
  useEffect(() => {
    localStorage.setItem("bb_booking_services", JSON.stringify(selectedServices));
  }, [selectedServices]);

  const setCity = (city) => {
    setSelectedCity(city);
  };

  const toggleService = (serviceName) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceName)) {
        return prev.filter((s) => s !== serviceName);
      } else {
        return [...prev, serviceName];
      }
    });
  };

  const clearBooking = () => {
    setSelectedServices([]);
    setSelectedCity("Mohali");
  };

  const triggerSuccessAnimation = () => {
    setMascotState("success");
    // Animation resets back to idle internally inside Mascot component
  };

  const setMascotStateExternal = (state) => {
    setMascotState(state);
  };

  // Build the dynamic WhatsApp URL
  const number = "919615920005";
  const getWhatsAppURL = () => {
    const message = selectedServices.length
      ? `Hello 👋 I want your cleaning services.\n\nCity: ${selectedCity}\nI'm interested in:\n${selectedServices.map((s) => `✅ ${s}`).join("\n")}\n\nPlease share availability & pricing. Thank you!`
      : `Hello.. I want your cleaning services`;

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };

  return (
    <BookingContext.Provider
      value={{
        selectedCity,
        selectedServices,
        mascotState,
        setCity,
        toggleService,
        clearBooking,
        triggerSuccessAnimation,
        setMascotState: setMascotStateExternal,
        getWhatsAppURL,
        whatsAppMessageText: selectedServices.length
          ? `Hello 👋 I want your cleaning services.\n\nCity: ${selectedCity}\nI'm interested in:\n${selectedServices.map((s) => `✅ ${s}`).join("\n")}\n\nPlease share availability & pricing. Thank you!`
          : `Hello.. I want your cleaning services`,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
