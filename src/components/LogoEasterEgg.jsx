import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Module-level variables to persist count across any component unmounts/remounts
let globalClickCount = 0;
let globalClickTimer = null;

export default function LogoEasterEgg() {
  const [showCameo, setShowCameo] = useState(false);
  const cameoTimerRef = useRef(null);
  const selfRef = useRef(null);

  // Mount/Unmount logging to check lifecycle behaviour
  useEffect(() => {
    console.log("[EasterEgg] Component mounted");
    return () => {
      console.log("[EasterEgg] Component unmounted");
    };
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (showCameo) return;

      // Find the logo Link element using its class or ref parent element
      const logoEl =
        document.querySelector(".group.flex.items-center.space-x-2\\.5") ||
        selfRef.current?.parentElement;

      if (!logoEl) return;

      // Check if the click target is the logo Link or nested inside it
      if (logoEl.contains(e.target)) {
        globalClickCount += 1;
        console.log(`[EasterEgg] Logo clicked! Count: ${globalClickCount}/5`);

        // Reset the rolling timer on every click
        if (globalClickTimer) clearTimeout(globalClickTimer);
        globalClickTimer = setTimeout(() => {
          console.log("[EasterEgg] Click window expired. Resetting count to 0.");
          globalClickCount = 0;
        }, 2000); // 2-second rolling window between clicks

        // Trigger cameo on the 5th click
        if (globalClickCount >= 5) {
          console.log("[EasterEgg] Easter Egg triggered!");
          setShowCameo(true);
          globalClickCount = 0;

          if (globalClickTimer) {
            clearTimeout(globalClickTimer);
            globalClickTimer = null;
          }

          // Auto-hide cameo after 3.5 seconds
          if (cameoTimerRef.current) clearTimeout(cameoTimerRef.current);
          cameoTimerRef.current = setTimeout(() => {
            console.log("[EasterEgg] Auto-hiding mascot cameo.");
            setShowCameo(false);
          }, 3500);
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      if (cameoTimerRef.current) clearTimeout(cameoTimerRef.current);
    };
  }, [showCameo]);

  return (
    <>
      {/* Invisible anchor element to reference the parent DOM Link */}
      <span ref={selfRef} style={{ display: "none" }} />

      {/* Render the fixed overlay inline (behaves identically to portal because parent has no transforms) */}
      <AnimatePresence>
        {showCameo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-24 right-6 z-[100]"
            style={{ pointerEvents: "none" }}
          >
            {/* Glassmorphic card */}
            <div 
              className="glass flex items-center space-x-3 p-4 rounded-3xl shadow-2xl border border-white/60 bg-white/90 max-w-sm" 
              style={{ pointerEvents: "auto" }}
            >
              
              {/* Tiny Sunny and Bina Mascots Cameo */}
              <svg
                width="100"
                height="70"
                viewBox="0 0 100 70"
                className="flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="cameoSunny" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#0e7490" />
                  </linearGradient>
                  <linearGradient id="cameoBina" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#115e59" />
                  </linearGradient>
                  <linearGradient id="cameoSkin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="100%" stopColor="#fdba74" />
                  </linearGradient>
                </defs>

                {/* Sunny Mascot (Left) */}
                <g transform="translate(8, 5)">
                  {/* Body */}
                  <path d="M 5 60 L 35 60 L 30 35 L 10 35 Z" fill="url(#cameoSunny)" />
                  {/* Head */}
                  <circle cx="20" cy="22" r="13" fill="url(#cameoSkin)" />
                  {/* Hair */}
                  <path d="M 7 20 C 7 5, 33 5, 33 20 C 33 12, 7 12, 7 20" fill="#1e293b" />
                  {/* Sunglasses */}
                  <rect x="11" y="10" width="8" height="4" rx="1" fill="#0f172a" opacity="0.8" />
                  <rect x="21" y="10" width="8" height="4" rx="1" fill="#0f172a" opacity="0.8" />
                  {/* Smile */}
                  <path d="M 17 26 Q 20 29 23 26" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Waving Right Hand */}
                  <motion.g
                    animate={{ rotate: [0, 20, -20, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    style={{ transformOrigin: "32px 35px" }}
                  >
                    <path d="M 28 35 Q 36 25 35 20" fill="none" stroke="url(#cameoSkin)" strokeWidth="4" strokeLinecap="round" />
                  </motion.g>
                </g>

                {/* Bina Mascot (Right) */}
                <g transform="translate(43, 5)">
                  {/* Body */}
                  <path d="M 5 60 L 35 60 L 30 35 L 10 35 Z" fill="url(#cameoBina)" />
                  {/* Head */}
                  <circle cx="20" cy="22" r="13" fill="url(#cameoSkin)" />
                  {/* Hair Bun */}
                  <circle cx="20" cy="6" r="5" fill="#1e293b" />
                  <ellipse cx="20" cy="9" rx="6" ry="1.5" fill="#f43f5e" />
                  {/* Hair */}
                  <path d="M 7 20 C 7 8, 33 8, 33 20" fill="#1e293b" />
                  {/* Smile */}
                  <path d="M 17 26 Q 20 29 23 26" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Waving Left Hand */}
                  <motion.g
                    animate={{ rotate: [0, -20, 20, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                    style={{ transformOrigin: "8px 35px" }}
                  >
                    <path d="M 12 35 Q 4 25 5 20" fill="none" stroke="url(#cameoSkin)" strokeWidth="4" strokeLinecap="round" />
                  </motion.g>
                </g>
              </svg>

              {/* Brand consistent Speech Bubble */}
              <div className="relative bg-emerald-50 text-emerald-800 text-[11px] font-bold p-3 rounded-2xl border border-emerald-100 shadow-sm max-w-[180px]">
                You found us! 🎉 Let's keep your home sparkling clean!
                
                {/* Bubble Pointer Triangle */}
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-emerald-50 border-b-8 border-b-transparent" />
                <div className="absolute top-1/2 -left-[9px] -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-emerald-100 border-b-8 border-b-transparent -z-10" />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
