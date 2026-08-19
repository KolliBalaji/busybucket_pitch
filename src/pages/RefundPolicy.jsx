import React from "react";
import { ShieldCheck, RefreshCw, Sparkles, CreditCard } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header card */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden mb-10">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-brand-teal/20 blur-2xl pointer-events-none" />
          <span className="text-[10px] text-brand-mint font-extrabold uppercase tracking-widest border border-brand-mint/30 px-3 py-1 rounded-full">
            Trust & Transparency
          </span>
          <h1 className="text-3xl font-black mt-4 tracking-tight">Refund & Satisfaction Policy</h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl font-medium">
            At Busy Bucket Services, customer happiness is our absolute priority. We operate with robust guarantees to ensure 100% risk-free service.
          </p>
        </div>

        {/* Guarantees grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl border border-white/60 flex items-start space-x-4">
            <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Pay After Job Done</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                You make the final payment only when the cleaning task is completed to your full satisfaction. No advance payment required for home cleaning.
              </p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/60 flex items-start space-x-4">
            <div className="p-3 bg-brand-lime/10 rounded-xl text-brand-lime flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wide">Free Redo Guarantee</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Not fully satisfied with any area cleaned? Point it out within 24 hours. We return and re-clean that specific area for free — no arguments, no excuses.
              </p>
            </div>
          </div>
        </div>

        {/* Policy content */}
        <div className="glass p-8 rounded-3xl border border-white/60 space-y-6 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-brand-teal" /> 1. Satisfaction Guidelines
            </h2>
            <p className="text-slate-600">
              Our partners and professionals inspect the premises with you before and after the cleaning job. If any section does not meet your expectations, we request that you let the team know immediately on-site.
            </p>
            <p className="text-slate-600">
              If you notice any cleaning lapses after the team has left, contact our support team (+91 96159 20004) or WhatsApp (+91 96159 20005) within <strong>24 hours</strong> of the service completion. We will schedule a free redo session at your convenience.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-brand-teal" /> 2. Refund Eligibility
            </h2>
            <p className="text-slate-600">
              Since we operate on a "Pay after job is done to satisfaction" model, refunds are rarely applicable since you review the work before processing payment. However, in the following circumstances:
            </p>
            <ul className="list-disc pl-5 text-slate-600 space-y-1.5">
              <li>
                <strong>Double Payments:</strong> In case of transaction failures leading to duplicate online deductions, the duplicate amount will be refunded to your original bank account within 5-7 working days.
              </li>
              <li>
                <strong>Unresolved Complaints:</strong> If a redo session is scheduled and we fail to deliver standard results or cannot resolve your concerns after a second attempt, a discount or partial waiver on the final bill will be applied.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-wide">3. Contacting Support</h2>
            <p className="text-slate-600">
              For any billing, service quality, or dispute resolutions, please write to us at <a href="mailto:info@busybucket.in" className="text-brand-teal underline font-semibold">info@busybucket.in</a> or call our customer relations team at <a href="tel:+919615920004" className="text-brand-teal underline font-semibold">+91 96159 20004</a>. We guarantee an answer and resolution timeline within 24-48 business hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
