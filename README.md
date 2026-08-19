# 🧼 Busy Bucket Services — Website Upgrade

An upgraded version of the existing [busybucket.in](https://busybucket.in) website — a professional home & office cleaning service platform serving Chandigarh Tricity, Mohali, Zirakpur, Panchkula, Dehradun, Ludhiana, Rishikesh, Haridwar & Patiala.

Rebuilt from a legacy WordPress/Elementor site into a fast, animated, WhatsApp-first booking experience — same real business data, dramatically upgraded design, performance, and UX.

🔗 **Live/Original site:** [https://busybucket.in](https://busybucket.in)

---

## ✨ Highlights

- **WhatsApp-first booking flow** — select services + city from a persistent floating booking cart, preview the exact message in a live chat bubble, then book in one tap. No forms, no friction.
- **Interactive SVG mascot characters ("Sunny & Bina")** — hand-built React vector SVGs animated with Framer Motion: blink/breathe when idle, sweep/mop/wipe on hover or scroll, wave on hover, and burst confetti on successful booking. Saves 1.2MB+ vs. a 3D engine (Rive/Three.js) for near-instant load.
- **Dynamic SEO route pages** — `/services/:service` and `/services/:service/:city` generated from a single config file, with metadata updating on the fly, replacing 30+ near-duplicate static WordPress pages.
- **Before/After reveal slider** — touch-enabled drag comparison for cleaning results.
- **Auto-scrolling client logo marquee** — grayscale-to-color hover infinite carousel.
- **Real, verified business data** — every stat, testimonial, service, and contact detail sourced directly from the live site and business listings (Google, Justdial), not placeholder content.
- **Multi-source testimonials** — reviews from both the original site and Justdial, clearly source-tagged for transparency.
- **Fully responsive** — built and tested from 390px (mobile) through 1440px (desktop).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Build tool | Vite |
| Framework | React 19 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| Routing | React Router |
| Animation | Framer Motion |
| Icons | Lucide Icons |
| Mascot characters | Pure React SVG + Framer Motion (not Rive/Three.js/Lottie) |

---

## 📱 WhatsApp Booking Logic

Users multi-select services and a city from the floating booking cart. A live preview bubble shows the exact message before it's sent:

```js
const number = "919615920005";

const message = selectedServices.length
  ? `Hello 👋 I want your cleaning services.\n\nCity: ${selectedCity}\nI'm interested in:\n${selectedServices.map(s => `✅ ${s}`).join("\n")}\n\nPlease share availability & pricing. Thank you!`
  : `Hello.. I want your cleaning services`;

const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
```

---

## 📂 Project Structure

```
/src
  /components
    Mascot.jsx              → Sunny & Bina — SVG mascot with idle/hover/scroll/success animation states
    BookingCart.jsx         → Floating WhatsApp booking widget with live message preview
    ServiceCityPage.jsx     → Dynamic SEO route handler for /services/:service/:city
    BeforeAfterSlider.jsx   → Touch-enabled before/after comparison slider
    LogoMarquee.jsx         → Auto-scrolling client logo carousel
  /hooks                    → useWhatsAppBooking, scroll/hover trigger hooks
  /data                     → services.js, cities.js, testimonials.js — single source of truth
  /assets                   → icons, illustrations
  /pages                    → route-level page components
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

---

## 📌 Business Info

**Busy Bucket Services Private Limited** — ISO 9001:2015 certified home & office cleaning provider, est. 2020.

📞 +91 96159 20004 · 💬 WhatsApp: +91 96159 20005 · ✉️ info@busybucket.in

---

## ⚠️ Notes for contributors

- This is an **upgrade/rebuild** of the live site at busybucket.in — all business data (stats, addresses, phone numbers, testimonials) is real and sourced directly from the business. Do not alter without confirming with the business owner.
- The WhatsApp number in `useWhatsAppBooking` is production-live and actively converting — do not change without explicit sign-off.
- Mascot SVGs are intentionally hand-coded (not Rive/GLB) to keep the animated hero lightweight and protect Core Web Vitals (LCP) — if extending the mascot animations, stay within a similar performance budget rather than swapping in a 3D engine.
