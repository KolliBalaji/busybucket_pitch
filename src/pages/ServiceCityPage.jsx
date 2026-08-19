import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { services, cities, getServiceById, getCityById } from "../data/servicesData";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import Mascot from "../components/Mascot";
import {
  Check,
  Send,
  Phone,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Sparkles,
  MapPin,
  ChevronRight
} from "lucide-react";

export default function ServiceCityPage() {
  const { service: serviceSlug, city: citySlug } = useParams();
  const navigate = useNavigate();
  const { setCity, toggleService, selectedServices, selectedCity, getWhatsAppURL, triggerSuccessAnimation, mascotState, setMascotState } = useBooking();

  // Find current service
  const service = getServiceById(serviceSlug);
  
  // Find current city (optional slug)
  const city = citySlug ? cities.find((c) => c.id === citySlug.toLowerCase()) : null;

  // Re-route if service slug is completely invalid
  useEffect(() => {
    if (!service) {
      navigate("/", { replace: true });
    }
  }, [service, navigate]);

  // Set booking defaults based on URL route (SEO target conversion)
  useEffect(() => {
    if (service) {
      // Pre-select service if not already in checklist
      if (!selectedServices.includes(service.name)) {
        toggleService(service.name);
      }
    }
    if (city) {
      // Sync state with URL parameter city
      setCity(city.name);
    }
  }, [service, city]);

  if (!service) return null;

  const cityNameFormatted = city ? city.name : "Your City";
  const displayTitle = city
    ? `Best ${service.name} in ${city.name}`
    : `Professional ${service.name} Services`;

  const handleBookNow = () => {
    triggerSuccessAnimation();
    setTimeout(() => {
      window.open(getWhatsAppURL(), "_blank");
    }, 600);
  };

  return (
    <div className="py-12 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Link Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-400">
          <Link to="/" className="hover:text-brand-teal transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <a href="#services-section" className="hover:text-brand-teal transition-colors">Services</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800">{service.name}</span>
          {city && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-brand-teal">{city.name}</span>
            </>
          )}
        </div>

        {/* Dynamic SEO Hero / Main content Card */}
        <div className="glass rounded-[40px] border border-white/60 p-8 md:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          {/* Top light glow */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />

          {/* Left Text Grid */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-teal/10 text-brand-teal px-4 py-1.5 rounded-full border border-brand-teal/15">
              <ShieldCheck className="w-4 h-4 text-brand-teal" />
              <span className="text-[10px] font-black tracking-wider uppercase">ISO 9001:2015 Quality Assured</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {displayTitle}
            </h1>

            <p className="text-xs text-brand-teal font-extrabold uppercase tracking-widest">
              {service.tagline}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed font-semibold">
              {city 
                ? `Need a top-rated, certified service provider? Busy Bucket Services is Chandigarh Tricity and ${city.name}'s leading choice. ${service.description} Rest assured with background-checked partners, transparent pricing grids, and our famous pay-after-job customer guarantee.`
                : `${service.description} We customize each session with eco-friendly cleaning agents, mechanized high-pressure gear, and trained, verified staff. Pay only when you are 100% satisfied with the outcome.`
              }
            </p>

            {/* Bullets List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              {service.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 font-bold">
                  <Check className="w-4 h-4 text-brand-lime stroke-[3] mt-0.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Quick Action Block */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
              <button
                onClick={handleBookNow}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-emerald-600/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center space-x-2 cursor-pointer text-sm"
                onMouseEnter={() => setMascotState("success")}
                onMouseLeave={() => setMascotState("idle")}
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Book {service.name} Now</span>
              </button>
              <a
                href="tel:+919615920004"
                className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-4 rounded-2xl border border-slate-300 flex items-center space-x-2 shadow-sm transition-all text-sm"
              >
                <Phone className="w-4 h-4 text-brand-teal" />
                <span>Call +91 96159 20004</span>
              </a>
            </div>

            <div className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
              🚀 Selected City Hub: <span className="text-brand-coral">{cityNameFormatted}</span> · Base Fee: {service.startingPrice}
            </div>
          </div>

          {/* Right visual Column: Before/After slider & Mascot */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs text-slate-700 font-extrabold uppercase tracking-wider flex items-center justify-center lg:justify-start">
              <Sparkles className="w-4 h-4 mr-1 text-brand-teal" /> Drag to reveal results
            </h3>
            
            {/* Custom Before/After Slide */}
            <BeforeAfterSlider 
              beforeImage={service.beforeAfter.before}
              afterImage={service.beforeAfter.after}
              aspectClass="aspect-[4/3]"
            />

            <div className="bg-white/50 border border-slate-100 p-4 rounded-2xl flex items-center space-x-4">
              <div className="w-16 h-16 flex-shrink-0">
                <Mascot state={mascotState} />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide">Satisfaction Guarantee</h4>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-0.5">
                  Not happy with the output? Sunny and Bina will return within 24 hours to re-clean for free!
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Related/Other Cleanings Panel */}
        <div className="space-y-6 text-center">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Explore Other Cleaning Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services
              .filter((s) => s.id !== serviceSlug)
              .slice(0, 4)
              .map((other) => (
                <Link
                  key={other.id}
                  to={city ? `/services/${other.id}/${city.id}` : `/services/${other.id}`}
                  className="glass p-5 rounded-2xl border border-white/60 hover:border-brand-teal/40 hover:text-brand-teal text-slate-800 text-xs font-black transition-all flex flex-col items-center justify-center space-y-2 group shadow-sm hover:shadow-md"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{other.emoji}</span>
                  <span>{other.name}</span>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
