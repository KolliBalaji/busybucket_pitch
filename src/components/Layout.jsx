import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { Phone, Mail, MapPin, Menu, X, ArrowUpRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LogoEasterEgg from "./LogoEasterEgg";


export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { setMascotState } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auto-scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Track scroll position for header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update meta tags dynamically based on route (SEO Upgrade)
  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    let title = "Busy Bucket Services | India's #No1 Home Cleaning Services Company";
    let desc = "ISO 9001:2015 Certified cleaning services. Professional, background-verified cleaning partners. Pay 100% after satisfaction. Serving Chandigarh, Mohali, Dehradun & Tricity.";

    if (pathParts[0] === "services") {
      const serviceSlug = pathParts[1];
      const citySlug = pathParts[2];
      
      const formatSlug = (slug) => 
        slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

      if (serviceSlug && citySlug) {
        const serviceName = formatSlug(serviceSlug);
        const cityName = formatSlug(citySlug);
        title = `Best ${serviceName} in ${cityName} | Busy Bucket Services`;
        desc = `Looking for professional ${serviceName} in ${cityName}? Get certified, safe cleaning with Busy Bucket. ISO 9001:2015 certified. Pay after job is done. Book now!`;
      } else if (serviceSlug) {
        const serviceName = formatSlug(serviceSlug);
        title = `Professional ${serviceName} Services | Busy Bucket`;
        desc = `Book high-quality, eco-friendly ${serviceName} services with Busy Bucket. ISO certified experts, 100% satisfaction guarantee. Serving Mohali, Chandigarh, Ludhiana & Dehradun.`;
      }
    } else if (pathname === "/refund-policy") {
      title = "Refund & Satisfaction Policy | Busy Bucket Services";
      desc = "Learn about our 100% satisfaction guarantee and refund guidelines. Not happy? We will return and clean again for free.";
    }

    document.title = title;
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;
  }, [pathname]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      {/* Top Notification Bar */}
      <div className="bg-brand-dark text-white py-2 px-4 text-xs font-semibold flex flex-wrap justify-between items-center z-40 border-b border-white/5">
        <div className="flex items-center space-x-4 mx-auto md:mx-0">
          <span className="flex items-center text-brand-mint">
            <span className="w-2 h-2 rounded-full bg-brand-lime mr-1.5 animate-pulse" />
            ISO 9001:2015 Certified
          </span>
          <span className="hidden sm:inline opacity-70">|</span>
          <span className="hidden sm:inline">100% Satisfaction Guarantee — Free Redo</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="tel:+919615920004" className="hover:text-brand-aqua flex items-center transition-colors">
            <Phone className="w-3.5 h-3.5 mr-1" /> +91 96159 20004
          </a>
          <a href="mailto:info@busybucket.in" className="hover:text-brand-aqua flex items-center transition-colors">
            <Mail className="w-3.5 h-3.5 mr-1" /> info@busybucket.in
          </a>
        </div>
      </div>

      {/* Main Glass Header */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled 
            ? "glass shadow-md py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2.5 group"
            onMouseEnter={() => setMascotState("hover")}
          >
            <LogoEasterEgg />
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-aqua text-white flex items-center justify-center font-black text-xl shadow-lg border border-white/20 transform group-hover:rotate-3 group-hover:scale-105 transition-all">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-800 uppercase flex items-center">
                Busy Bucket
              </span>
              <span className="text-[10px] text-brand-teal font-extrabold uppercase tracking-widest -mt-1">
                Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-brand-teal text-sm font-bold tracking-wide transition-colors">
              Home
            </Link>
            <a href="#services-section" className="text-slate-700 hover:text-brand-teal text-sm font-bold tracking-wide transition-colors">
              Services
            </a>
            <a href="#testimonials-section" className="text-slate-700 hover:text-brand-teal text-sm font-bold tracking-wide transition-colors">
              Testimonials
            </a>
            <a href="#cities-section" className="text-slate-700 hover:text-brand-teal text-sm font-bold tracking-wide transition-colors">
              Cities We Serve
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+919615920004"
              className="flex items-center space-x-2 text-slate-700 hover:text-brand-teal font-extrabold text-sm border border-slate-300 hover:border-brand-teal px-4 py-2 rounded-xl transition-all"
            >
              <Phone className="w-4 h-4 text-brand-teal" />
              <span>Call Team</span>
            </a>
            <button 
              onClick={() => {
                const element = document.getElementById("booking-card-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  // Fallback: search page, or open cart
                  const toggleBtn = document.querySelector('[onClick*="setIsOpen"]');
                  if (toggleBtn) toggleBtn.click();
                }
              }}
              className="bg-brand-coral hover:bg-brand-coral/95 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <a 
              href="tel:+919615920004"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-brand-teal"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            <button 
              onClick={toggleMobileMenu} 
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-slate-200 shadow-lg overflow-hidden fixed top-[60px] left-0 right-0 z-30"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-brand-teal/10 font-bold text-slate-700 hover:text-brand-teal text-sm transition-all"
              >
                Home
              </Link>
              <a 
                href="#services-section"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-brand-teal/10 font-bold text-slate-700 hover:text-brand-teal text-sm transition-all"
              >
                Services
              </a>
              <a 
                href="#testimonials-section"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-brand-teal/10 font-bold text-slate-700 hover:text-brand-teal text-sm transition-all"
              >
                Testimonials
              </a>
              <a 
                href="#cities-section"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-brand-teal/10 font-bold text-slate-700 hover:text-brand-teal text-sm transition-all"
              >
                Cities We Serve
              </a>
              
              <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
                <a 
                  href="tel:+919615920004"
                  className="w-full bg-slate-100 text-slate-800 py-3 rounded-xl font-bold text-center flex items-center justify-center space-x-2 border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-brand-teal" />
                  <span>Call +91 96159 20004</span>
                </a>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const element = document.getElementById("booking-card-section");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full bg-brand-coral text-white py-3 rounded-xl font-bold text-center shadow-md hover:shadow-lg transition-all"
                >
                  Book Cleaning
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Site Footer */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-brand-teal text-white flex items-center justify-center font-black text-lg">
                B
              </div>
              <span className="text-lg font-black tracking-wider uppercase">Busy Bucket</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              India's #No1 Home Cleaning Services Company. Founded in 2020. ISO 9001:2015 certified company delivering high-standard sanitization and restoration cleanings.
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.facebook.com/BusyBucketServices" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-brand-teal flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                FB
              </a>
              <a 
                href="https://www.instagram.com/busybucketservices/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-brand-teal flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                IG
              </a>
            </div>
          </div>

          {/* Column 2: Offices / Locations */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-300">Registered Offices</h4>
            <div className="space-y-3.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-aqua flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Mohali Head Office:</strong><br />
                  F-298, 5th Floor, Sector 74, Sahibzada Ajit Singh Nagar (Mohali), Punjab 160074
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-aqua flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Dehradun Office:</strong><br />
                  Ganga Vihar, Lane No 2, Rajeev Nagar, Dehradun, Uttarakhand 248001
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-300">Contact Details</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <a href="tel:+919615920004" className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-aqua" />
                <span>Calls: +91 96159 20004</span>
              </a>
              <a href="https://wa.me/919615920005" className="flex items-center space-x-2 hover:text-white transition-colors">
                <MessageSquare className="w-4 h-4 text-brand-lime" />
                <span>WhatsApp: +91 96159 20005</span>
              </a>
              <a href="mailto:info@busybucket.in" className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-aqua" />
                <span>info@busybucket.in</span>
              </a>
            </div>
          </div>

          {/* Column 4: Quick Links & Cert */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-300">Guaranteed Trust</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors flex items-center">
                  <span>Refund & Satisfaction Policy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-slate-500" />
                </Link>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">Clean Services Grid</a>
              </li>
              <li>
                <a href="#cities-section" className="hover:text-white transition-colors">Tricity & Dehradun Coverage</a>
              </li>
            </ul>
            <div className="pt-3 border-t border-slate-900">
              <span className="inline-block text-[10px] text-brand-lime font-black tracking-widest uppercase border border-brand-lime/25 px-2 py-1 rounded">
                ISO 9001:2015 REGISTERED
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-semibold space-y-4 md:space-y-0">
          <span>
            © 2026 Busy Bucket Services (M/S Busy Bucket Services Private Limited). All rights reserved.
          </span>
          <span className="flex items-center space-x-1">
            <span>Built in 2026 for a premium React experience</span>
          </span>
        </div>
      </footer>

      {/* Bottom-Left Fixed glowing WhatsApp fallback launcher */}
      <a
        href="https://wa.me/919615920005?text=Hi%2C%20I%20want%20to%20book%20a%20cleaning%20service"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-emerald-500 rounded-full shadow-[0_8px_20px_rgba(16,185,129,0.4)] flex items-center justify-center text-white hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
        aria-label="Direct WhatsApp Booking"
        onMouseEnter={() => setMascotState("hover")}
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 group-hover:hidden" />
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.811 1.452 5.43.003 9.85-4.417 9.853-9.852.002-2.633-1.02-5.107-2.88-6.97C16.564 1.92 14.093.899 11.46.899c-5.43.001-9.852 4.42-9.855 9.855-.001 1.768.479 3.492 1.39 5.031l-.988 3.606 3.693-.97c1.52.827 3.2 1.261 4.937 1.263zm10.21-6.993c-.272-.136-1.61-.795-1.86-.886-.25-.09-.432-.136-.613.136-.182.273-.705.886-.863 1.068-.159.182-.318.205-.59.069-.272-.136-1.15-.424-2.19-1.353-.809-.722-1.355-1.614-1.514-1.886-.159-.273-.017-.42.119-.556.122-.122.272-.318.408-.477.136-.159.182-.272.272-.454.09-.181.045-.34-.023-.477-.068-.136-.613-1.477-.84-2.022-.22-.533-.443-.46-.613-.468-.159-.008-.34-.01-.522-.01s-.477.068-.727.34c-.25.272-.954.931-.954 2.271 0 1.34.977 2.635 1.113 2.817.136.182 1.92 2.931 4.65 4.113.65.28 1.157.447 1.554.573.653.208 1.248.179 1.718.109.523-.078 1.61-.659 1.838-1.295.227-.636.227-1.181.159-1.295-.069-.113-.25-.182-.523-.318z" />
        </svg>
      </a>
    </div>
  );
}
