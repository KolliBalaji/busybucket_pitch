import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { cities, services } from "../data/servicesData";
import { ShoppingCart, MessageSquare, ChevronUp, ChevronDown, Check, X, Send, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectedCity,
    selectedServices,
    setCity,
    toggleService,
    getWhatsAppURL,
    whatsAppMessageText,
    triggerSuccessAnimation
  } = useBooking();

  const handleBookNow = () => {
    // 1. Trigger mascot success animation
    triggerSuccessAnimation();
    
    // 2. Open WhatsApp in new tab after a brief delay so they see the success wave/jump
    setTimeout(() => {
      window.open(getWhatsAppURL(), "_blank");
    }, 600);
  };

  return (
    <>
      {/* Floating Booking Action Trigger - Stays Fixed */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-brand-teal to-brand-aqua text-white px-5 py-4 rounded-full shadow-[0_10px_25px_-5px_rgba(6,182,212,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 font-bold border border-white/20 group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                {selectedServices.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-brand-coral text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-pulse">
                    {selectedServices.length}
                  </span>
                )}
              </div>
              <span className="text-sm tracking-wide">
                {selectedServices.length > 0 
                  ? `Book Clean (${selectedCity})` 
                  : "Quick Book Online"}
              </span>
              <ChevronUp className="w-4 h-4 ml-1 opacity-70" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded Chat Booking Widget */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-[92vw] sm:w-[400px] h-[550px] rounded-3xl shadow-2xl overflow-hidden glass border border-white/40 flex flex-col"
            >
              {/* Widget Header - WhatsApp Styled */}
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-white font-extrabold text-sm border-2 border-brand-aqua">
                      BB
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-brand-lime border-2 border-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-wide">Busy Bucket Booking</h3>
                    <p className="text-[10px] text-brand-mint font-semibold">Replies in 10 minutes</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Setup & Preview Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/5">
                {/* Agent Welcome Bubble */}
                <div className="flex space-x-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-xs flex-shrink-0 self-end shadow-sm">
                    BB
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm text-xs text-slate-700 leading-relaxed border border-slate-100">
                    👋 Hello! Select your city and the services you want, and I'll prepare a custom quote for you right now.
                  </div>
                </div>

                {/* Selection Panel Card */}
                <div className="bg-white/90 p-4 rounded-2xl shadow-sm border border-white/60 space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5 text-brand-teal" /> Select Service Details
                  </h4>
                  
                  {/* City Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">
                      Select Location
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 text-slate-800 text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal font-medium"
                    >
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Multi-Select Services Checklist */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide">
                      Select Services ({selectedServices.length})
                    </label>
                    <div className="max-h-[140px] overflow-y-auto pr-1 space-y-1 border border-slate-100 rounded-xl p-1.5 bg-slate-50">
                      {services.map((service) => {
                        const isSelected = selectedServices.includes(service.name);
                        return (
                          <button
                            key={service.id}
                            onClick={() => toggleService(service.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-semibold transition-all ${
                              isSelected 
                                ? "bg-brand-teal/15 text-brand-teal border border-brand-teal/20" 
                                : "hover:bg-slate-100 text-slate-600 border border-transparent"
                            }`}
                          >
                            <span className="flex items-center">
                              <span className="mr-2 text-sm">{service.emoji}</span>
                              {service.name}
                            </span>
                            {isSelected ? (
                              <Check className="w-3.5 h-3.5 text-brand-teal stroke-[3]" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-md border border-slate-300" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Live WhatsApp Message Preview Bubble */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wide ml-3">
                    WhatsApp Message Preview
                  </span>
                  
                  {/* WhatsApp Chat Container */}
                  <div 
                    className="p-4 rounded-2xl shadow-inner relative overflow-hidden"
                    style={{ 
                      backgroundColor: "#efeae2",
                      backgroundImage: "radial-gradient(#dfdcd6 1px, transparent 1px)",
                      backgroundSize: "16px 16px" 
                    }}
                  >
                    {/* Speech Bubble */}
                    <div className="bg-[#d9fdd3] text-[#111b21] p-3 rounded-2xl rounded-tr-none text-xs relative max-w-[95%] ml-auto shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] border border-[#c4ebc0]">
                      {/* Tail */}
                      <div className="absolute top-0 -right-1.5 w-3 h-3 bg-[#d9fdd3] clip-whatsapp-tail" />
                      
                      <p className="whitespace-pre-wrap leading-relaxed font-sans select-text">
                        {whatsAppMessageText}
                      </p>
                      
                      <div className="text-[9px] text-[#667781] text-right mt-1 font-semibold flex items-center justify-end space-x-0.5">
                        <span>Just now</span>
                        <svg className="w-3.5 h-3.5 text-[#53bdeb]" viewBox="0 0 16 15" fill="none">
                          <path d="M15 3L8.5 9.5L5.5 6.5M11.5 3L8.5 6M4 9.5L1 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking CTA Footer */}
              <div className="p-4 bg-white border-t border-slate-100 flex flex-col space-y-2">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl shadow-[0_4px_12px_rgba(16,185,129,0.3)] flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-95 duration-200 cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Send WhatsApp Booking</span>
                </button>
                <p className="text-[10px] text-center text-slate-400 font-semibold">
                  ⚠️ Pay 100% after job completion. Free redo guaranteed.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CSS Clip-Path definition for WhatsApp bubble tail */}
      <style>{`
        .clip-whatsapp-tail {
          clip-path: polygon(0 0, 0 100%, 100% 0);
        }
      `}</style>
    </>
  );
}
