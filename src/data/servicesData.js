export const cities = [
  { id: "chandigarh", name: "Chandigarh", isPrimary: true },
  { id: "mohali", name: "Mohali", isPrimary: true },
  { id: "dehradun", name: "Dehradun", isPrimary: true },
  { id: "ludhiana", name: "Ludhiana", isPrimary: true },
  { id: "zirakpur", name: "Zirakpur", isPrimary: false },
  { id: "panchkula", name: "Panchkula", isPrimary: false },
  { id: "haridwar", name: "Haridwar", isPrimary: false },
  { id: "rishikesh", name: "Rishikesh", isPrimary: false },
  { id: "patiala", name: "Patiala", isPrimary: false },
];

export const services = [
  {
    id: "deep-home-cleaning",
    name: "Deep Home Cleaning",
    icon: "Home",
    emoji: "🏠",
    tagline: "Total home restoration & intensive sanitization",
    description: "Our signature service that covers every corner of your home. Deep scrubbing, dusting, vacuuming, and disinfection of all rooms, balconies, and common areas.",
    bullets: [
      "In-depth kitchen and bathroom scrubbing",
      "Floor deep scrubbing with machine-assisted polishing",
      "Dusting and cleaning of fans, lights, windows, and switchboards",
      "Sofa, mattress, and carpet dry vacuuming included",
    ],
    startingPrice: "₹2,999",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "bathroom-kitchen-cleaning",
    name: "Bathroom / Kitchen Cleaning",
    icon: "ShowerHead",
    emoji: "🚿",
    tagline: "Rigorous descaling and sanitization of high-use zones",
    description: "Deep scrubbing of oily tiles, exhaust fans, and kitchen cabinets, or descaling of bathroom wall tiles, taps, showerheads, toilet bowls, and sinks.",
    bullets: [
      "Hard-water stain removal from fittings and tiles",
      "Degreasing of chimneys, hobs, and cabinets in the kitchen",
      "Sanitization of toilet bowl, sink, shower area, and bathtubs",
      "Odour control and high-pressure steam sanitization",
    ],
    startingPrice: "₹999",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1620626011160-9928f1b2b69a?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "sofa-carpet-cleaning",
    name: "Sofa / Carpet Cleaning",
    icon: "Armchair",
    emoji: "🛋",
    tagline: "Shampooing & deep extraction for fabrics & leather",
    description: "Remove deep-seated dirt, stains, allergens, and odors from fabric and leather upholstery using advanced foam extraction machines.",
    bullets: [
      "High-suction vacuuming for dry dust removal",
      "Fabric shampooing with organic chemical foaming",
      "Stain removal and scrubbing treatment",
      "Moisture extraction for quick drying",
    ],
    startingPrice: "₹499",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1558882224-cca166733360?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "water-tank-cleaning",
    name: "Water Tank Cleaning",
    icon: "Droplets",
    emoji: "💧",
    tagline: "7-step certified sanitization process",
    description: "Secure your family's health with our certified 7-step water tank sanitization process. Removes mud, algae, and harmful bacteria from overhead and underground tanks.",
    bullets: [
      "Mechanized dewatering & high-pressure washing",
      "Sludge removal and vacuuming",
      "Anti-bacterial wall scrubbing",
      "UV radiation disinfection and chemical sanitization",
    ],
    startingPrice: "₹1,499",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1607472586893-edb5caba0c55?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "commercial-cleaning",
    name: "Commercial Cleaning",
    icon: "Building2",
    emoji: "🏢",
    tagline: "Bespoke corporate, retail, and industrial cleanups",
    description: "Comprehensive janitorial and deep cleaning services for offices, warehouses, clinics, retail stores, and commercial workspaces.",
    bullets: [
      "After-hours cleaning flexible schedules",
      "High-touch surface sanitization (keyboards, desks, doors)",
      "Carpet and tile extraction cleaning",
      "Dedicated account manager and verified staff",
    ],
    startingPrice: "₹4,999",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "Bug",
    emoji: "🐛",
    tagline: "Eco-friendly pest extermination & protection",
    description: "Get rid of termites, cockroaches, rodents, bed bugs, and mosquitoes using safe, government-approved, low-toxicity chemical formulations.",
    bullets: [
      "Gel treatment for cockroaches with zero smell",
      "Anti-termite drilling and chemical barrier creation",
      "Odourless spray treatment for mosquitoes and bed bugs",
      "100% safe for kids and elderly pets",
    ],
    startingPrice: "₹799",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1613214149579-909895e2b23c?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "ac-servicing",
    name: "AC Servicing",
    icon: "Wind",
    emoji: "❄️",
    tagline: "Jet-pump wash, filter cleaning & gas checkup",
    description: "Ensure ice-cold air and energy efficiency with our high-pressure jet wash service for split and window AC units.",
    bullets: [
      "Deep cleaning of indoor coils and outdoor units",
      "Drain pipe flushing to prevent leakages",
      "Gas level checks and electrical assessment",
      "Improves cooling and lowers electricity bills",
    ],
    startingPrice: "₹599",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "home-sanitization",
    name: "Home Sanitization Services",
    icon: "ShieldAlert",
    emoji: "🛡️",
    tagline: "Hospital-grade misting disinfection",
    description: "Thorough disinfection of surfaces to neutralize 99.9% of bacteria, viruses, and pathogens using safe misting techniques.",
    bullets: [
      "WHO-approved disinfectant chemical sprays",
      "High-touch surface sanitization (remotes, handles, switches)",
      "ULV cold-fogging machine disinfection",
      "Safe to enter the room within 30 minutes of treatment",
    ],
    startingPrice: "₹899",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1603618051074-af39fe197be5?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "tile-cleaning",
    name: "Tile Cleaning",
    icon: "Grid",
    emoji: "🧱",
    tagline: "Heavy scrubbing and grout stain removal",
    description: "Specialized mechanical floor scrubbing to clean tiles and extract stains from dirty grouting lines, bringing back initial floor shine.",
    bullets: [
      "Heavy duty machine scrubbing for marble/tiles",
      "Stain removal from bathroom and kitchen floor grouting",
      "Acid-free chemicals to protect tile glaze",
      "Polishing coat for extra luster",
    ],
    startingPrice: "₹1,199",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "glass-cleaning",
    name: "Glass Cleaning",
    icon: "Sparkles",
    emoji: "🧼",
    tagline: "Streak-free windows, doors, and facades",
    description: "Professional cleaning of tall windows, balcony glass railings, sliding doors, and mirrors for a crystal-clear, streak-free look.",
    bullets: [
      "Streak-free cleaning with squeegees and telescopic rods",
      "Water mark and dust crust removal",
      "Cleaning of window sills and sliding tracks",
      "Eco-friendly anti-static cleaning fluid to repel dust",
    ],
    startingPrice: "₹499",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=600&auto=format&fit=crop",
    }
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    icon: "Briefcase",
    emoji: "💼",
    tagline: "Corporate-standard cabin and workstation sanitization",
    description: "Provide a clean, productive environment for your staff with intensive cleaning of workstations, meeting rooms, carpets, and pantry spaces.",
    bullets: [
      "Deep vacuuming of office chairs and sofas",
      "Disinfection of shared printers, coffee makers, and desks",
      "Thorough scrubbing of staff toilets and breakrooms",
      "Flexible schedule to avoid interrupting business hours",
    ],
    startingPrice: "₹3,499",
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1521737711867-e3b904737d88?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1556761175-b813d53a9628?q=80&w=600&auto=format&fit=crop",
    }
  }
];

export const getServiceById = (id) => services.find((s) => s.id === id);
export const getCityById = (id) => cities.find((c) => c.id === id);
