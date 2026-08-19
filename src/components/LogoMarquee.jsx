import React from "react";

const corporateClients = [
  { name: "TATA Projects", type: "Infrastructure" },
  { name: "DLF Offices", type: "Real Estate" },
  { name: "Radisson Hotels", type: "Hospitality" },
  { name: "Oyo Living", type: "Co-Living" },
  { name: "Max Healthcare", type: "Medical" },
  { name: "Reliance Retail", type: "Retail" },
  { name: "Airtel Hubs", type: "Telecom" },
  { name: "L&T Realty", type: "Construction" },
  { name: "Godrej Properties", type: "Real Estate" },
  { name: "HDFC Bank Hub", type: "Finance" }
];

export default function LogoMarquee() {
  // Duplicate for seamless infinite loop
  const doubleClients = [...corporateClients, ...corporateClients];

  return (
    <div className="w-full bg-slate-900/5 py-8 border-y border-slate-200 overflow-hidden relative select-none">
      {/* Absolute fades on side */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee whitespace-nowrap">
        {doubleClients.map((client, index) => (
          <div 
            key={`${client.name}-${index}`}
            className="flex items-center mx-12 text-slate-400 hover:text-brand-teal transition-colors duration-300"
          >
            {/* Mock Vector Corporate Logos */}
            <div className="flex items-center space-x-3 cursor-default">
              <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-300 shadow-sm transition-transform duration-300 group-hover:scale-105">
                {client.name.substring(0, 2)}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm tracking-wider uppercase text-slate-700">
                  {client.name}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide">
                  {client.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
