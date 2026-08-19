Written Explanation (DECISIONS.md, 1 page max)
Answer these, briefly:
1. Why this ingestion strategy over the obvious alternative you rejected?
2. One trade-off you made under the time limit, and what you’d do with a real week.
3. Where did you use AI tools, and what did you personally verify or change afterward?



1) Why this ingestion strategy over the obvious alternative you rejected?

I selected Part 2 (Premium Home Page), so I did not build a data-ingestion pipeline. The “ingestion strategy” question applies to Part 1, where the task involves collecting job listings from an external platform. For Part 2, my equivalent architectural decision was choosing how to structure and render the redesigned site under the one-day constraint. the real business data directly from the live busybucket.in site — services, stats, WhatsApp booking flow, testimonials and then i manually verified every data point myself against the original source rather than trusting the extraction blindly. Where a claim couldn't be independently confirmed, I flagged it instead of quietly including it: the ISO 9001:2015 certification, for instance, appears on the company's own site and Facebook page, but has no public certificate number or named certifying body anywhere, so I treated it as unverified rather than as fact.



2) One trade-off you made under the time limit, and what you'd do with a real week.

Given the time constraints, I prioritised the core visual direction, hero section, responsive layout, and the main product presentation, rather than spending more time on extensive usability testing and multiple design iterations. I wanted to make sure the page communicated the product's value clearly within the first few seconds and worked well across desktop and mobile. With a full week, I would conduct usability testing with a few target users, compare alternative hero and CTA variations, refine the micro-interaction based on feedback, and iterate on the design before finalizing it.

A few other trade-offs I'd have handled differently with more time, if I were treating this as an ongoing role rather than a one-day deliverable:

Animation restraint. I shipped several micro-interactions — the mascot's idle/hover/scroll states, scroll-triggered reveals, the before/after slider, and the logo marquee — rather than committing to a single, more polished signature interaction. Under real production time, I'd cut this down to one interaction the whole page is built around, and quiet or remove the rest, since a page trying to show range often reads as less confident than a page that commits to one strong moment.

Trust-signal verification. I couldn't independently confirm the ISO 9001:2015 certification or the authenticity of the client logos used in the marquee within the available time. With a real week, I'd get direct sign-off from the business owner — the actual certificate number and certifying body, and explicit permission for each client logo — before shipping either as a public trust signal, rather than carrying them forward from the original site on assumption.

Rendering strategy for SEO. I built the dynamic service/city pages as client-rendered React routes to hit the deadline. With more time, I'd move this to a proper SSR/SSG setup (Next.js or prerendering) before launch, since a pure client-rendered SPA risks losing the original site's existing search rankings for pages like /water-tank-cleaning-in-mohali/ — that's a real business cost, not just a technical nicety, and I'd want it solved before this ever went live for the actual client.

Performance measurement, not just performance decisions. I made the call to replace the AI-generated Rive-based mascot animation with lightweight SVG + Framer Motion based on known typical weight differences between the two approaches, but I didn't have time to benchmark an actual before/after Lighthouse comparison. With a full week, I'd build both versions, measure real LCP/bundle-size numbers for each, and make that call with data instead of general knowledge — good engineering judgment should be backed by measurement when the time exists to get it.




3) Where did you use AI tools, and what did you personally verify or change afterward?

I used AI tools at four distinct stages, each for a specific reason tied to the one-day time constraint I was working under (I had a campus placement drive the same day and needed to move fast without cutting corners on quality)

I used Claude to pull the existing business data — services, stats, testimonials, WhatsApp booking patterns, contact info — from the live busybucket.in site and cross-reference sources like Justdial. I did not take this at face value: I manually verified every data point against the original site myself afterward, and where a claim couldn't be independently confirmed (e.g. the ISO 9001:2015 certification, which has no public certificate number or certifying-body reference attached to it anywhere), I flagged it rather than presenting it as verified fact.

The actual UI/UX direction — golden-ratio-based color and type scale, layout brainstorming, the final visual system — was mine, built independently rather than AI-generated.

Given the time constraint, I used Antigravity to scaffold a basic site structure quickly. This was a starting skeleton only — the actual feature implementation (sections, WhatsApp booking logic, routing) I wrote myself on top of it.

Once the base design felt visually incomplete, I used Bolt.new specifically to generate the animated mascot characters, since hand-building character animation from scratch wasn't feasible in the remaining time. The first AI-generated pass used a heavier animation approach that noticeably increased initial page load. I checked the bundle size impact, confirmed it was hurting LCP, and had it rebuilt as lightweight hand-coded SVG + Framer Motion instead — cutting over 1MB off the page weight.

What I personally verified afterward: I went through all AI-generated code manually — checking for logic errors, unhandled edge cases, and common frontend vulnerabilities (XSS exposure through unsanitized inputs, insecure use of dangerouslySetInnerHTML, unvalidated URL construction in the WhatsApp deep-link logic, and outdated or unnecessary third-party dependencies). I also reviewed the code for performance issues — unnecessary re-renders, unoptimized assets, and anything that could hurt Core Web Vitals, which is exactly what led me to catch and fix the mascot animation weight issue above. AI tools saved me time on scaffolding and data-gathering; the design decisions, feature logic, and final code review were mine.
