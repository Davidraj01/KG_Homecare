import type { Metadata } from "next";
import { Clock, ShieldCheck, Wrench, MapPin } from "lucide-react";
import { BUSINESS, PHONE_DISPLAY, waHref } from "@/lib/contact";
import { LeadCaptureForm } from "@/components/site/LeadCaptureForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";

export const metadata: Metadata = {
  title: {
    absolute: "Contact — Book a Washing Machine Service | KG Home Care",
  },
  description:
    "Book a washing machine repair, installation, or maintenance service with KG Home Care. Send your details and we'll get back to you shortly.",
  keywords:
    "contact washing machine service, book washing machine repair, washing machine service enquiry, washing machine technician booking, appliance repair booking, kg home care contact",
  alternates: { canonical: "/contact" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://kghomecare.in/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://kghomecare.in/contact/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I book a washing machine service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fill in the booking form with your details and issue, and our team will get back to you to confirm.",
      },
    },
    {
      "@type": "Question",
      name: "What are your service hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `KG Home Care is available ${BUSINESS.hours}.`,
      },
    },
    {
      "@type": "Question",
      name: "How quickly will I hear back?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We typically respond to booking requests within 30 minutes during business hours.",
      },
    },
  ],
};

const TRUST_POINTS = [
  { icon: Clock, label: "Fast response", desc: "We usually reply within 30 minutes." },
  { icon: Wrench, label: "Certified technicians", desc: "Trained, background-verified experts." },
  { icon: ShieldCheck, label: "Service warranty", desc: "1-year warranty on every job." },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f172a 0%,#0f2a6b 60%,#1e40af 100%)" }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-400">Get in Touch</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
            We&apos;re here to help.
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/60">
            Fill the form below — we usually respond within 30 minutes.
          </p>
        </div>
      </section>

      {/* ── Trust points ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-100/40 blur-[80px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.3]" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {TRUST_POINTS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Form ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-50">
        <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-100/30 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-blue-100/30 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.25]" style={{ backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative mx-auto grid max-w-5xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
          <div id="book" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft md:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Book a Service</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Send us a message
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill in your details and we&apos;ll assign a certified technician to your request.
            </p>
            <div className="mt-8">
              <LeadCaptureForm />
            </div>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900">{BUSINESS.name}</h3>
              <p className="text-sm text-slate-500">{BUSINESS.tagline}</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {BUSINESS.address.line1}<br />
                    {BUSINESS.address.line2}<br />
                    {BUSINESS.address.city}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25d366]" />
                  <a
                    href={waHref("Hi KG Home Care, I'd like to book a washing machine service.")}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span>{BUSINESS.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
