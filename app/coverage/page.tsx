import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { CalendarCheck, Clock, ShieldCheck, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Coverage — KG Home Care",
  description:
    "KG Home Care is expanding its washing machine service coverage. Submit your details and we'll confirm availability in your area.",
  keywords:
    "washing machine service coverage, service areas kg home care, doorstep washing machine service",
  openGraph: {
    title: "Service Coverage — KG Home Care",
    description: "Submit your details and we'll confirm service availability in your area.",
    url: "/coverage",
  },
  alternates: { canonical: "/coverage" },
};

const POINTS = [
  { icon: Clock, label: "Fast confirmation", desc: "We usually confirm availability within 30 minutes." },
  { icon: Wrench, label: "Certified technicians", desc: "Trained, background-verified experts." },
  { icon: ShieldCheck, label: "Service warranty", desc: "1-year warranty on every job." },
];

export default function CoveragePage() {
  return (
    <>
      <PageHeader
        eyebrow="Service Coverage"
        title="Doorstep washing machine service, expanding to more areas."
        description="We're growing our service coverage. Submit your details and we'll confirm availability in your area."
      />
      <div className="relative overflow-hidden">
        {/* Dot grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-100/30 blur-[80px]" />
        <Section className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight">Not sure if we cover your area yet?</h2>
            <p className="mt-2 text-muted-foreground">
              Send us your details and our team will confirm availability and get back to you shortly.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {POINTS.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-foreground">{label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lift transition-all hover:-translate-y-0.5"
            >
              <CalendarCheck className="h-4 w-4" />
              Check Availability
            </Link>
          </div>
        </Section>
      </div>
    </>
  );
}
