import React, { useState, useRef, useEffect } from "react";

export default function BeforeAfterSlider({ beforeImage, afterImage, aspectClass = "aspect-[4/3]" }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden shadow-lg select-none cursor-ew-resize`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Background) */}
      <img 
        src={beforeImage} 
        alt="Before Cleaning" 
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
      <div className="absolute top-4 left-4 bg-brand-dark/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 border border-white/20 shadow">
        Before
      </div>

      {/* After Image (Overlay, resized via clip-path) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={afterImage} 
          alt="After Cleaning" 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
      <div className="absolute top-4 right-4 bg-brand-lime text-brand-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10 border border-white/20 shadow">
        After
      </div>

      {/* Slider Bar separator */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center shadow-2xl border-2 border-brand-teal font-extrabold cursor-ew-resize hover:scale-110 active:scale-95 transition-all">
          <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18m-4 4l4-4m-4-4l4 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
