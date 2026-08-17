import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { ContactCTA } from "@/components/site/ContactCTA";
import { ServicesInteractive } from "@/components/site/ServicesInteractive";
import { getPublicServices } from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Washing Machine Services — KG Home Care",
  description:
    "Repair, installation, drum cleaning, PCB and motor service for all washing machine brands. Certified technicians, genuine parts.",
  keywords: "washing machine service, washing machine repair, installation, drum cleaning, pcb repair, motor repair",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Washing Machine Services — KG Home Care",
    description: "Repair, installation, drum cleaning, PCB and motor service — all major brands.",
    url: "/services",
  },
};

export default async function ServicesPage() {
  const services = await getPublicServices();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-radial-primary">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full border-[3px] border-primary/10" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Washing Machine Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Repair, installation, and maintenance for all major brands — certified technicians, genuine parts.
          </p>
        </div>
      </section>

      <div className="relative overflow-hidden bg-slate-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }}
        />
        <Section eyebrow="All Services" title="Every service we offer" className="relative">
          <ScrollReveal>
            <ServicesGrid items={services} />
          </ScrollReveal>
        </Section>
      </div>

      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }}
        />
        <Section eyebrow="Explore" title="Pick a service" className="relative">
          <ScrollReveal>
            <ServicesInteractive items={services} />
          </ScrollReveal>
        </Section>
      </div>

      <div className="relative overflow-hidden bg-white">
        <Section className="relative">
          <ContactCTA />
        </Section>
      </div>
    </>
  );
}
