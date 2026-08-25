import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";
import { ShieldCheck, Clock, Wrench } from "lucide-react";

const POINTS = [
  { icon: Clock, label: "Fast response", desc: "We usually reply within 30 minutes." },
  { icon: Wrench, label: "Certified technicians", desc: "Trained, background-verified experts." },
  { icon: ShieldCheck, label: "Service warranty", desc: "1-year warranty on every job." },
];

export function HomeContact() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">

      {/* ── LEFT: form ── */}
      <div id="book" className="rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Book a Service</p>
        <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900">Send us a message</h3>
        <p className="mt-1.5 text-sm text-slate-500">
          Fill in your details and we&apos;ll get back to you shortly.
        </p>
        <div className="mt-6">
          <LeadCaptureForm />
        </div>
      </div>

      {/* ── RIGHT: trust points ── */}
      <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border bg-secondary/30 p-6 shadow-soft md:p-8">
        {POINTS.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{label}</p>
              <p className="mt-0.5 text-sm text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
