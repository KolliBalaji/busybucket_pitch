import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ServiceCityPage from "./pages/ServiceCityPage";
import RefundPolicy from "./pages/RefundPolicy";
import BookingCart from "./components/BookingCart";

function App() {
  return (
    <BookingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:service" element={<ServiceCityPage />} />
            <Route path="/services/:service/:city" element={<ServiceCityPage />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="*" element={<Home />} />
          </Routes>
          {/* Persistent Floating Booking cart wrapper */}
          <BookingCart />
        </Layout>
      </Router>
    </BookingProvider>
  );
}

export default App;
