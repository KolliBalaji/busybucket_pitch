import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Mascot({ state = "idle" }) {
  const [blink, setBlink] = useState(false);
  const [internalState, setInternalState] = useState(state);
  const [hoveredMascot, setHoveredMascot] = useState(null);

  // Sync prop state with internal state
  useEffect(() => {
    setInternalState(state);
  }, [state]);

  // Blink interval loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Bubble generator for Bina's cleaning state
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    if (internalState === "cleaning") {
      const interval = setInterval(() => {
        setBubbles((prev) => [
          ...prev.slice(-10), // Limit to 10 bubbles max
          {
            id: Math.random(),
            x: Math.random() * 80 + 320, // range around Bina
            y: 130,
            size: Math.random() * 8 + 4,
          },
        ]);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setBubbles([]);
    }
  }, [internalState]);

  // Sparkle generator for Sunny's cleaning state
  const [sparkles, setSparkles] = useState([]);
  useEffect(() => {
    if (internalState === "cleaning") {
      const interval = setInterval(() => {
        setSparkles((prev) => [
          ...prev.slice(-10), // Limit to 10 sparkles max
          {
            id: Math.random(),
            x: Math.random() * 80 + 80, // range around Sunny
            y: Math.random() * 60 + 80,
            scale: Math.random() * 0.8 + 0.4,
          },
        ]);
      }, 300);
      return () => clearInterval(interval);
    } else {
      setSparkles([]);
    }
  }, [internalState]);

  // Confetti generator for success state
  const [confetti, setConfetti] = useState([]);
  useEffect(() => {
    if (internalState === "success") {
      const newConfetti = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: 250 + (Math.random() - 0.5) * 50,
        y: 120 + (Math.random() - 0.5) * 50,
        color: ["#06b6d4", "#2dd4bf", "#f43f5e", "#84cc16", "#fbbf24"][Math.floor(Math.random() * 5)],
        angle: Math.random() * 360,
        speed: Math.random() * 150 + 100,
      }));
      setConfetti(newConfetti);
      // Return to idle after 4 seconds
      const timer = setTimeout(() => setInternalState("idle"), 4000);
      return () => clearTimeout(timer);
    } else {
      setConfetti([]);
    }
  }, [internalState]);

  // Handle local hovering
  const handleMouseEnter = (name) => {
    setHoveredMascot(name);
    if (internalState === "idle") {
      setInternalState("hover");
    }
  };

  const handleMouseLeave = () => {
    setHoveredMascot(null);
    if (internalState === "hover") {
      setInternalState("idle");
    }
  };

  // Shared anim variants
  const breatheVariant = {
    idle: { y: [0, -4, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    hover: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    cleaning: { y: [0, -6, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } },
    success: { y: [0, -35, 0], transition: { duration: 0.6, ease: "easeOut" } },
  };

  const armWipeVariant = {
    cleaning: {
      x: [0, 20, 0],
      y: [0, -10, 0],
      rotate: [0, 15, 0],
      transition: { repeat: Infinity, duration: 1, ease: "easeInOut" },
    },
    hover: {
      rotate: [0, 35, 0, 35, 0],
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const armMopVariant = {
    cleaning: {
      rotate: [-15, 20, -15],
      transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
    },
    hover: {
      rotate: [0, -35, 0, -35, 0],
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="relative w-full max-w-[500px] h-[320px] mx-auto select-none select-none">
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 500 320"
        className="w-full h-full drop-shadow-xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Brand Gradients */}
          <linearGradient id="sunnyShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>
          <linearGradient id="binaShirt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>
          <linearGradient id="apronGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="coralGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* BACKGROUND GLOW */}
        <circle cx="250" cy="160" r="130" fill="rgba(6, 182, 212, 0.06)" filter="blur(20px)" />
        <circle cx="250" cy="160" r="90" fill="none" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="2" strokeDasharray="5 5" />

        {/* ========================================================================= */}
        {/* SUNNY (MALE CHARACTER) - LEFT SIDE */}
        {/* ========================================================================= */}
        <motion.g
          id="sunny"
          variants={breatheVariant}
          animate={internalState}
          onMouseEnter={() => handleMouseEnter("sunny")}
          onMouseLeave={handleMouseLeave}
          onTouchStart={(e) => {
            e.preventDefault();
            handleMouseEnter("sunny");
            setTimeout(handleMouseLeave, 2000);
          }}
          className="cursor-pointer"
        >
          {/* Shadows */}
          <ellipse cx="140" cy="275" rx="50" ry="10" fill="rgba(15, 23, 42, 0.15)" />

          {/* Legs */}
          <rect x="115" y="240" width="16" height="35" rx="8" fill="#475569" />
          <rect x="149" y="240" width="16" height="35" rx="8" fill="#475569" />
          {/* Shoes */}
          <rect x="110" y="265" width="22" height="12" rx="6" fill="#1e293b" />
          <rect x="149" y="265" width="22" height="12" rx="6" fill="#1e293b" />

          {/* Body/Shirt */}
          <path d="M 95 240 L 185 240 L 175 160 L 105 160 Z" fill="url(#sunnyShirt)" />

          {/* Apron */}
          <path d="M 115 170 L 165 170 L 160 240 L 120 240 Z" fill="url(#apronGrad)" />
          {/* Apron Ties */}
          <path d="M 115 170 Q 140 155 165 170" fill="none" stroke="#94a3b8" strokeWidth="3" />
          {/* Small Busy Bucket Logo on Apron */}
          <circle cx="140" cy="200" r="12" fill="#06b6d4" />
          {/* Logo bucket handle */}
          <path d="M 134 198 A 6 6 0 0 1 146 198" fill="none" stroke="#fff" strokeWidth="1.5" />
          <rect x="134" y="198" width="12" height="10" rx="2" fill="#fff" />

          {/* Head & Neck */}
          <rect x="130" y="145" width="20" height="20" fill="url(#skinGrad)" rx="5" />
          <rect x="100" y="70" width="80" height="80" rx="40" fill="url(#skinGrad)" />

          {/* Hair (Sunny) */}
          <path d="M 98 95 C 98 60, 182 60, 182 95 C 182 70, 98 70, 98 95" fill="url(#hairGrad)" />
          <path d="M 98 95 Q 110 85 125 90 Q 140 85 155 90 Q 170 85 182 95" fill="url(#hairGrad)" />
          {/* Sunglasses pushed up on head */}
          <rect x="112" y="75" width="24" height="12" rx="3" fill="#0f172a" opacity="0.85" />
          <rect x="140" y="75" width="24" height="12" rx="3" fill="#0f172a" opacity="0.85" />
          <line x1="136" y1="81" x2="140" y2="81" stroke="#cbd5e1" strokeWidth="2" />

          {/* Face Elements */}
          {/* Eyes (Blinking) */}
          {!blink ? (
            <>
              {/* Left Eye */}
              <circle cx="125" cy="110" r="6" fill="#0f172a" />
              <circle cx="123" cy="108" r="2" fill="#fff" />
              {/* Right Eye */}
              <circle cx="155" cy="110" r="6" fill="#0f172a" />
              <circle cx="153" cy="108" r="2" fill="#fff" />
            </>
          ) : (
            <>
              {/* Blinking Eyes (Horizontal Lines) */}
              <line x1="119" y1="110" x2="131" y2="110" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <line x1="149" y1="110" x2="161" y2="110" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Mouth (Smile) */}
          <path d="M 133 125 Q 140 135 147 125" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />

          {/* Cheeks */}
          <circle cx="116" cy="118" r="4" fill="#f43f5e" opacity="0.5" />
          <circle cx="164" cy="118" r="4" fill="#f43f5e" opacity="0.5" />

          {/* Left Arm & Spray Bottle */}
          <g id="sunnyLeftArm">
            <path d="M 98 165 Q 70 190 65 210" fill="none" stroke="url(#skinGrad)" strokeWidth="14" strokeLinecap="round" />
            {/* Spray Bottle */}
            <g transform="translate(50, 195)">
              <rect x="0" y="10" width="16" height="24" rx="4" fill="#06b6d4" />
              <rect x="4" y="0" width="8" height="10" fill="#fff" />
              <path d="M 0 4 Q 8 -4 14 6" fill="none" stroke="#fff" strokeWidth="3" />
              {/* Spray nozzle */}
              <rect x="10" y="2" width="6" height="3" fill="#e2e8f0" />
            </g>
          </g>

          {/* Right Arm & Microfiber Cloth (Wiping animation target) */}
          <motion.g id="sunnyRightArm" variants={armWipeVariant}>
            <path d="M 178 165 Q 200 185 208 200" fill="none" stroke="url(#skinGrad)" strokeWidth="14" strokeLinecap="round" />
            {/* Microfiber Cloth */}
            <g transform="translate(198, 192)">
              <motion.rect
                x="0"
                y="0"
                width="24"
                height="24"
                rx="4"
                fill="url(#coralGrad)"
                animate={internalState === "cleaning" ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
              />
              <circle cx="6" cy="6" r="2" fill="#fff" opacity="0.6" />
              <circle cx="18" cy="18" r="2" fill="#fff" opacity="0.6" />
            </g>
          </motion.g>
        </motion.g>

        {/* ========================================================================= */}
        {/* BINA (FEMALE CHARACTER) - RIGHT SIDE */}
        {/* ========================================================================= */}
        <motion.g
          id="bina"
          variants={breatheVariant}
          animate={internalState}
          onMouseEnter={() => handleMouseEnter("bina")}
          onMouseLeave={handleMouseLeave}
          onTouchStart={(e) => {
            e.preventDefault();
            handleMouseEnter("bina");
            setTimeout(handleMouseLeave, 2000);
          }}
          className="cursor-pointer"
        >
          {/* Shadows */}
          <ellipse cx="360" cy="275" rx="50" ry="10" fill="rgba(15, 23, 42, 0.15)" />

          {/* Legs */}
          <rect x="335" y="240" width="16" height="35" rx="8" fill="#475569" />
          <rect x="369" y="240" width="16" height="35" rx="8" fill="#475569" />
          {/* Shoes */}
          <rect x="330" y="265" width="22" height="12" rx="6" fill="#1e293b" />
          <rect x="369" y="265" width="22" height="12" rx="6" fill="#1e293b" />

          {/* Body/Top */}
          <path d="M 315 240 L 405 240 L 395 160 L 325 160 Z" fill="url(#binaShirt)" />

          {/* Apron */}
          <path d="M 335 170 L 385 170 L 380 240 L 340 240 Z" fill="url(#apronGrad)" />
          {/* Apron Ties */}
          <path d="M 335 170 Q 360 155 385 170" fill="none" stroke="#94a3b8" strokeWidth="3" />
          {/* Logo Badge */}
          <circle cx="360" cy="200" r="12" fill="#0d9488" />
          <path d="M 354 198 A 6 6 0 0 1 366 198" fill="none" stroke="#fff" strokeWidth="1.5" />
          <rect x="354" y="198" width="12" height="10" rx="2" fill="#fff" />

          {/* Head & Neck */}
          <rect x="350" y="145" width="20" height="20" fill="url(#skinGrad)" rx="5" />
          <rect x="320" y="70" width="80" height="80" rx="40" fill="url(#skinGrad)" />

          {/* Hair & Bun (Bina) */}
          <path d="M 318 95 C 318 55, 402 55, 402 95 C 402 85, 318 85, 318 95" fill="url(#hairGrad)" />
          {/* Hair Bun on top */}
          <circle cx="360" cy="55" r="18" fill="url(#hairGrad)" />
          {/* Hair Tie */}
          <ellipse cx="360" cy="68" rx="14" ry="4" fill="#f43f5e" />

          {/* Face Elements */}
          {/* Eyes (Blinking) */}
          {!blink ? (
            <>
              {/* Left Eye */}
              <circle cx="345" cy="110" r="6" fill="#0f172a" />
              <circle cx="343" cy="108" r="2" fill="#fff" />
              {/* Right Eye */}
              <circle cx="375" cy="110" r="6" fill="#0f172a" />
              <circle cx="373" cy="108" r="2" fill="#fff" />
            </>
          ) : (
            <>
              <line x1="339" y1="110" x2="351" y2="110" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <line x1="369" y1="110" x2="381" y2="110" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Mouth (Happy Smile) */}
          <path d="M 353 125 Q 360 135 367 125" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />

          {/* Cheeks */}
          <circle cx="336" cy="118" r="4" fill="#f43f5e" opacity="0.5" />
          <circle cx="384" cy="118" r="4" fill="#f43f5e" opacity="0.5" />

          {/* Right Arm - Waving or Resting */}
          <g id="binaRightArm">
            <path d="M 402 165 Q 425 185 432 205" fill="none" stroke="url(#skinGrad)" strokeWidth="14" strokeLinecap="round" />
          </g>

          {/* Left Arm & Mop (Mopping animation target) */}
          <motion.g id="binaLeftArm" variants={armMopVariant}>
            {/* Upper arm stretching down/forward */}
            <path d="M 322 165 Q 295 190 285 210" fill="none" stroke="url(#skinGrad)" strokeWidth="14" strokeLinecap="round" />
            {/* The Mop Handle and Base */}
            <g transform="translate(260, 130)">
              {/* Mop pole */}
              <line x1="20" y1="0" x2="20" y2="120" stroke="#b45309" strokeWidth="5" strokeLinecap="round" />
              {/* Mop handle grip */}
              <rect x="17" y="20" width="6" height="20" rx="3" fill="#1e293b" />
              {/* Mop base connector */}
              <path d="M 8 115 L 32 115 L 20 100 Z" fill="#84cc16" />
              {/* Mop fibers / sponge */}
              <rect x="2" y="115" width="36" height="15" rx="5" fill="#facc15" />
            </g>
          </motion.g>
        </motion.g>

        {/* ========================================================================= */}
        {/* DYNAMIC SCENE EFFECTS (Bubbles & Sparkles) */}
        {/* ========================================================================= */}

        {/* Bubbles from Bina's Mop */}
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.circle
              key={b.id}
              cx={b.x}
              initial={{ cy: b.y, opacity: 0.8, scale: 0.5 }}
              animate={{ cy: b.y - 120, opacity: 0, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              r={b.size}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.5"
            />
          ))}
        </AnimatePresence>

        {/* Sparkles from Sunny's Cloth */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.g
              key={s.id}
              initial={{ x: s.x, y: s.y, opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 1, 0], scale: s.scale, rotate: [0, 90] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Sparkle star shape */}
              <path
                d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z"
                fill="#fbbf24"
              />
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Confetti Celebration for SUCCESS State */}
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.circle
              key={c.id}
              cx={c.x}
              cy={c.y}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                x: c.x + Math.cos((c.angle * Math.PI) / 180) * c.speed * 0.8,
                y: c.y - Math.sin((c.angle * Math.PI) / 180) * c.speed * 0.8 + 80, // grav gravity pull down
                opacity: 0,
                scale: 0.5,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              r={Math.random() * 5 + 3}
              fill={c.color}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Floating Sparkle / Interactive details overlay */}
      {internalState === "success" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5 }}
            className="px-6 py-3 rounded-full bg-brand-coral text-white font-extrabold text-lg shadow-lg tracking-wider border-2 border-white"
          >
            🎉 Booking Confirmed! 🎉
          </motion.div>
        </div>
      )}
    </div>
  );
}
