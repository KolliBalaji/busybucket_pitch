import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { services, cities } from "../data/servicesData";
import { reviews } from "../data/testimonials";
import Mascot from "../components/Mascot";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import LogoMarquee from "../components/LogoMarquee";
import {
  Home as HomeIcon,
  Bath,
  Armchair,
  Droplets,
  Building2,
  Bug,
  Wind,
  ShieldCheck,
  Grid,
  Sparkles,
  Briefcase,
  Star,
  Clock,
  CheckCircle2,
  Phone,
  Send,
  ArrowRight,
  Check,
  CheckSquare,
  Square,
  MapPin,
  MessageSquare,
  Award,
  ThumbsUp,
  HeartHandshake
} from "lucide-react";
import { motion } from "framer-motion";

// Helper to map icon name to Lucide Icon component
const iconMap = {
  Home: HomeIcon,
  ShowerHead: Bath,
  Armchair: Armchair,
  Droplets: Droplets,
  Building2: Building2,
  Bug: Bug,
  Wind: Wind,
  ShieldAlert: ShieldCheck,
  Grid: Grid,
  Sparkles: Sparkles,
  Briefcase: Briefcase
};

export default function Home() {
  const {
    selectedCity,
    selectedServices,
    setCity,
    toggleService,
    getWhatsAppURL,
    whatsAppMessageText,
    triggerSuccessAnimation,
    mascotState,
    setMascotState
  } = useBooking();

  const [activeReviewSource, setActiveReviewSource] = useState("All");

  const filteredReviews = reviews.filter((r) => {
    if (activeReviewSource === "All") return true;
    return r.source === activeReviewSource;
  });

  const handleBookNow = () => {
    triggerSuccessAnimation();
    setTimeout(() => {
      window.open(getWhatsAppURL(), "_blank");
    }, 600);
  };

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-teal/10 text-brand-teal px-4 py-1.5 rounded-full border border-brand-teal/15">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-lime animate-pulse" />
              <span className="text-xs font-black tracking-wider uppercase">India's #No1 Home Cleaning Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Sparkling Clean <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-aqua">
                Homes, Guaranteed.
              </span>
            </h1>

            <p className="text-base text-slate-600 max-w-xl font-medium leading-relaxed">
              ISO 9001:2015 Certified, professional cleaners at your doorstep. We service Mohali, Dehradun, Chandigarh Tricity & more. Pay 100% after job completion. Not happy? We re-clean for free.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleBookNow}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-emerald-600/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center space-x-2 cursor-pointer"
                onMouseEnter={() => setMascotState("hover")}
                onMouseLeave={() => setMascotState("idle")}
              >
                <Send className="w-5 h-5 fill-white" />
                <span>Book on WhatsApp</span>
              </button>
              <a
                href="tel:+919615920004"
                className="bg-white hover:bg-emerald-500 text-slate-800 font-bold px-8 py-4 rounded-2xl border border-slate-300 flex items-center space-x-2 shadow-sm transition-all"
              >
                <Phone className="w-5 h-5 text-brand-teal" />
                <span>Call +91 96159 20004</span>
              </a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-800">15k+</p>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Happy Homes</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-800">6+ Yrs</p>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Since 2020</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-800">4.9★</p>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Google Average</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black text-slate-800">9 Cities</p>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Active Markets</p>
              </div>
            </div>
          </div>

          {/* Right Mascot Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-mint/20 to-brand-coral/10 blur-3xl rounded-full scale-75 -z-10" />
            <Mascot state={mascotState} />
            <div className="text-center mt-2 text-xs font-semibold text-slate-400 italic">
              Hover over Sunny or Bina to say hello! 👋
            </div>
          </div>

        </div>
      </section>

      {/* 2. BOOKING WIDGET SECTION */}
      <section id="booking-card-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-8 rounded-[40px] border border-white/60 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 rounded-full bg-brand-aqua/10 blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] text-brand-teal font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3.5 py-1.5 rounded-full border border-brand-teal/15">
              10-Minute Response
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Customize Your Clean
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Pick your location, check the cleanings you need, and see the exact message formatted for WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Widget Selection Form */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              
              {/* City Pick */}
              <div className="space-y-2">
                <label className="text-xs text-slate-700 font-extrabold uppercase tracking-wider flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-brand-teal" /> 1. Where do you need service?
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white text-slate-800 text-sm px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal shadow-inner font-bold"
                >
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name} {city.isPrimary ? "(Primary Hub)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Checklist Multi-Select */}
              <div className="space-y-2 flex-grow">
                <label className="text-xs text-slate-700 font-extrabold uppercase tracking-wider flex items-center justify-between">
                  <span>2. Select Cleanings Needed</span>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                    {selectedServices.length} Selected
                  </span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-2 p-1 border border-slate-100 rounded-2xl bg-white shadow-inner">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service.name);
                    return (
                      <button
                        key={service.id}
                        onClick={() => toggleService(service.name)}
                        className={`flex items-center space-x-3 p-3 rounded-xl text-left text-xs font-bold transition-all border ${
                          isSelected
                            ? "bg-brand-teal/10 text-brand-teal border-brand-teal/20"
                            : "hover:bg-slate-50 text-slate-600 border-transparent"
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-brand-teal flex-shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-300 flex-shrink-0" />
                        )}
                        <span className="flex items-center">
                          <span className="mr-2 text-sm">{service.emoji}</span>
                          {service.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Single Booking Button */}
              <button
                onClick={handleBookNow}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-99 cursor-pointer mt-4"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Start Your Booking Now</span>
              </button>

            </div>

            {/* Widget WhatsApp Preview Bubble */}
            <div className="lg:col-span-5 flex flex-col">
              <label className="text-xs text-slate-700 font-extrabold uppercase tracking-wider mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-1 text-emerald-600" /> WhatsApp Message Bubble
              </label>

              {/* Chat Container */}
              <div 
                className="flex-1 min-h-[250px] p-6 rounded-3xl shadow-inner relative overflow-hidden flex flex-col justify-end border border-slate-200"
                style={{ 
                  backgroundColor: "#efeae2",
                  backgroundImage: "radial-gradient(#dfdcd6 1px, transparent 1px)",
                  backgroundSize: "16px 16px" 
                }}
              >
                {/* Speech Bubble */}
                <div className="bg-[#d9fdd3] text-[#111b21] p-4 rounded-2xl rounded-tr-none text-xs relative max-w-[90%] ml-auto shadow-[0_1px_0.5px_rgba(0,0,0,0.15)] border border-[#c4ebc0]">
                  {/* Tail */}
                  <div className="absolute top-0 -right-2 w-3 h-3 bg-[#d9fdd3] clip-whatsapp-tail" />
                  
                  <p className="whitespace-pre-wrap leading-relaxed font-sans select-text">
                    {whatsAppMessageText}
                  </p>
                  
                  <div className="text-[10px] text-[#667781] text-right mt-2 font-semibold flex items-center justify-end space-x-0.5">
                    <span>Just now</span>
                    <svg className="w-4 h-4 text-[#53bdeb]" viewBox="0 0 16 15" fill="none">
                      <path d="M15 3L8.5 9.5L5.5 6.5M11.5 3L8.5 6M4 9.5L1 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TRUST STRIP & CLIENTS MARQUEE */}
      <section className="space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Trust 1 */}
            <div className="bg-white/70 backdrop-blur border border-slate-100 p-6 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-brand-teal/10 text-brand-teal rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Pay After Job Done</h3>
                <p className="text-xs text-slate-500 mt-0.5">Zero advance required. Pay only when fully satisfied.</p>
              </div>
            </div>

            {/* Trust 2 */}
            <div className="bg-white/70 backdrop-blur border border-slate-100 p-6 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-brand-coral/10 text-brand-coral rounded-xl">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Free Redo Guarantee</h3>
                <p className="text-xs text-slate-500 mt-0.5">Not happy? We return and clean for free — no arguments.</p>
              </div>
            </div>

            {/* Trust 3 */}
            <div className="bg-white/70 backdrop-blur border border-slate-100 p-6 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-brand-lime/10 text-brand-lime rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">ISO 9001:2015 Certified</h3>
                <p className="text-xs text-slate-500 mt-0.5">Industry-grade certified sanitization standards since 2020.</p>
              </div>
            </div>

          </div>
        </div>

        {/* 4. CLIENT LOGO MARQUEE */}
        <LogoMarquee />
      </section>

      {/* 5. SERVICES BENTO GRID */}
      <section id="services-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] text-brand-coral font-extrabold uppercase tracking-widest bg-brand-coral/10 px-3.5 py-1.5 rounded-full border border-brand-coral/15">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            High-Performance Cleaning Solutions
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto font-semibold">
            Choose from our specialized checklist. Direct-book on WhatsApp or explore detailed plans.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {services.map((service, index) => {
            const ServiceIcon = iconMap[service.icon] || HomeIcon;
            const isSelected = selectedServices.includes(service.name);
            
            return (
              <div
                key={service.id}
                className="group glass rounded-3xl border border-white/60 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden"
              >
                {/* Floating graphic background */}
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-24 h-24 rounded-full bg-brand-teal/5 group-hover:bg-brand-teal/10 transition-colors pointer-events-none" />

                <div className="space-y-4 relative">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-brand-teal/10 rounded-2xl text-brand-teal group-hover:scale-110 transition-transform duration-300">
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    {/* Add to Cart Checkbox */}
                    <button
                      onClick={() => toggleService(service.name)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide border transition-all ${
                        isSelected
                          ? "bg-brand-teal text-white border-brand-teal"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <span>+ Add to Book</span>
                      )}
                    </button>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-black text-slate-800 flex items-center">
                      <span className="mr-2 text-base">{service.emoji}</span>
                      {service.name}
                    </h3>
                    <p className="text-[10px] text-brand-teal font-extrabold uppercase tracking-wide">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">Starting At</span>
                    <span className="text-sm font-black text-slate-800">{service.startingPrice}</span>
                  </div>
                  <Link
                    to={`/services/${service.id}`}
                    className="flex items-center text-xs font-black text-brand-teal group-hover:text-brand-coral transition-colors"
                  >
                    <span>Explore Route</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="bg-slate-900 text-white py-20 rounded-[40px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] text-brand-mint font-extrabold uppercase tracking-widest border border-brand-mint/30 px-3.5 py-1.5 rounded-full">
            Our Flow
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">How It Works</h2>
          <p className="text-sm text-slate-400 font-semibold">
            Simplest bookings with 100% satisfaction assurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-16 h-16 rounded-3xl bg-brand-teal text-white flex items-center justify-center font-black text-xl border-2 border-brand-mint/40 group-hover:rotate-6 transition-all duration-300">
              01
            </div>
            <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-200">Message on WhatsApp</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-semibold">
              Select your service and city inside our widget. It prepares a clear pre-filled message block.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-16 h-16 rounded-3xl bg-brand-coral text-white flex items-center justify-center font-black text-xl border-2 border-white/10 group-hover:rotate-6 transition-all duration-300">
              02
            </div>
            <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-200">Get Quote in 10 Min</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-semibold">
              Our professional sales team responds with fixed pricing structures. No hidden or surprises charges.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="w-16 h-16 rounded-3xl bg-brand-lime text-slate-900 flex items-center justify-center font-black text-xl border-2 border-white/10 group-hover:rotate-6 transition-all duration-300">
              03
            </div>
            <h3 className="font-extrabold text-sm uppercase tracking-wide text-slate-200">We Clean, You Pay</h3>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-semibold">
              Verified cleaning experts arrive at your doorstep. Clean, sanitize, and review. Pay only when satisfied.
            </p>
          </div>

        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] text-brand-teal font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3.5 py-1.5 rounded-full border border-brand-teal/15">
            Value Proposition
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Why Choose Busy Bucket</h2>
          <p className="text-sm text-slate-500 font-semibold max-w-xl mx-auto">
            Providing structured house cleaning since 2020 under ISO 9001:2015 specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Prop 1 */}
          <div className="glass p-6 rounded-2xl border border-white/60 space-y-3">
            <Clock className="w-8 h-8 text-brand-teal" />
            <h3 className="font-black text-sm uppercase text-slate-800 tracking-wider">On Time, Always</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              We value your schedule. Our teams arrive punctually, equipped to complete tasks on time.
            </p>
          </div>

          {/* Prop 2 */}
          <div className="glass p-6 rounded-2xl border border-white/60 space-y-3">
            <ThumbsUp className="w-8 h-8 text-brand-lime" />
            <h3 className="font-black text-sm uppercase text-slate-800 tracking-wider">Free Redo Cleaning</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Not satisfied with any specific spot? We schedule a return visit within 24 hours with no arguments.
            </p>
          </div>

          {/* Prop 3 */}
          <div className="glass p-6 rounded-2xl border border-white/60 space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand-teal" />
            <h3 className="font-black text-sm uppercase text-slate-800 tracking-wider">Verified Partners</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Identity-checked, police-verified, and in-house trained professionals to secure your safety.
            </p>
          </div>

          {/* Prop 4 */}
          <div className="glass p-6 rounded-2xl border border-white/60 space-y-3">
            <HeartHandshake className="w-8 h-8 text-brand-coral" />
            <h3 className="font-black text-sm uppercase text-slate-800 tracking-wider">Pay After Job Done</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Pay 100% only when the work is done and verified to your satisfaction. No advances needed.
            </p>
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section id="testimonials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] text-brand-coral font-extrabold uppercase tracking-widest bg-brand-coral/10 px-3.5 py-1.5 rounded-full border border-brand-coral/15">
            Verifiable Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Verifiable Customer Proof</h2>
          <p className="text-sm text-slate-500 font-semibold max-w-xl mx-auto">
            100% real reviews compiled directly from Google Business Profile and Justdial reviews list.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {["All", "Google Reviews", "Justdial"].map((source) => (
            <button
              key={source}
              onClick={() => setActiveReviewSource(source)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all ${
                activeReviewSource === source
                  ? "bg-brand-teal text-white border-brand-teal"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredReviews.map((review, i) => (
            <div
              key={i}
              className="glass p-6 rounded-3xl border border-white/60 flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Top review header info */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800">{review.name}</h4>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{review.date}</span>
                  </div>
                  {/* Source Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wide ${
                    review.source === "Google Reviews" 
                      ? "bg-blue-50 text-blue-600 border border-blue-100" 
                      : "bg-orange-50 text-orange-600 border border-orange-100"
                  }`}>
                    {review.source}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex space-x-1 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500 stroke-none" />
                  ))}
                </div>

                {/* Review Text */}
                {review.text ? (
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    "{review.text}"
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic font-semibold">
                    Rating Only — Left 5-Star feedback on Justdial aggregator listing.
                  </p>
                )}
              </div>

              {/* Tag Chips */}
              {review.tags && review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-slate-100">
                  {review.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. CITIES WE SERVE */}
      <section id="cities-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-3">
          <span className="text-[10px] text-brand-teal font-extrabold uppercase tracking-widest bg-brand-teal/10 px-3.5 py-1.5 rounded-full border border-brand-teal/15">
            Locations
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Cities We Serve</h2>
          <p className="text-sm text-slate-500 font-semibold max-w-xl mx-auto">
            Click on any city below to explore specific house cleaning services routes in that area.
          </p>
        </div>

        {/* Dynamic Link Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              to={`/services/deep-home-cleaning/${city.id}`}
              className="glass p-5 rounded-2xl border border-white/60 text-slate-800 hover:text-brand-teal hover:border-brand-teal/40 font-black tracking-wide text-sm shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
              <span>{city.name}</span>
              {city.isPrimary && (
                <span className="text-[8px] bg-brand-lime text-brand-dark px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                  Hub
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl text-center md:text-left">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 rounded-full bg-brand-teal/20 blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Ready to Experience <br />
                A Brand New Clean?
              </h2>
              <p className="text-xs md:text-sm text-slate-400 max-w-xl font-semibold leading-relaxed">
                Connect on WhatsApp, receive an instant fixed-price quote, and coordinate your cleanup. No arguments, zero upfront risks.
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
              <button
                onClick={handleBookNow}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm w-full cursor-pointer"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Book via WhatsApp</span>
              </button>
              <a
                href="tel:+919615920004"
                className="bg-slate-900 hover:bg-emerald-500 text-slate-200 border border-white/10 font-black py-4 px-8 rounded-2xl shadow transition-all flex items-center justify-center space-x-2 text-sm w-full"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 96159 20004</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
