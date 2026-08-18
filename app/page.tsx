import type { Metadata } from "next";
import { BUSINESS } from "@/lib/contact";
import { getPublicServices } from "@/lib/cms";
import { Section } from "@/components/site/Section";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { Hero } from "@/components/site/Hero";
import { TrustStats } from "@/components/site/TrustStats";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { HowItWorks } from "@/components/site/HowItWorks";
import { CommonProblems } from "@/components/site/CommonProblems";
import { WarrantyBanner } from "@/components/site/WarrantyBanner";
import { Reviews } from "@/components/site/Reviews";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { HomeContact } from "@/components/site/HomeContact";
import { ServicesGrid } from "@/components/site/ServicesGrid";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
  description:
    "Professional doorstep washing machine repair, installation, drum cleaning and maintenance in Tuticorin. Certified technicians, genuine parts, 90-day warranty.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    description: "Professional doorstep washing machine service in Tuticorin. Same-day service, genuine parts, 90-day warranty.",
    url: "/",
  },
};

export default async function HomePage() {
  const services = await getPublicServices();

  return (
    <>
      <Hero />
      <TrustStats />

      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }}
        />
        <Section
          eyebrow="Our Services"
          title="Complete washing machine care"
          description="From repair to installation, our certified technicians handle every washing machine issue at your doorstep."
          className="relative"
        >
          <ScrollReveal>
            <ServicesGrid limit={8} items={services} />
          </ScrollReveal>
        </Section>
      </div>

      <div className="relative overflow-hidden bg-slate-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }}
        />
        <Section
          eyebrow="Common Issues"
          title="We fix these every day"
          description="Whatever's wrong with your washing machine, chances are we've fixed it hundreds of times before."
          className="relative"
        >
          <ScrollReveal>
            <CommonProblems />
          </ScrollReveal>
        </Section>
      </div>

      <div className="relative overflow-hidden bg-[#07090f]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/25 blur-[80px]" />
        <Section className="relative">
          <ScrollReveal>
            <WhyChooseUs />
          </ScrollReveal>
        </Section>
      </div>

      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <Section
          eyebrow="How It Works"
          title="Booked in 2 minutes, fixed same day"
          align="center"
          className="relative"
        >
          <ScrollReveal>
            <HowItWorks />
          </ScrollReveal>
        </Section>
      </div>

      <Section className="bg-white">
        <ScrollReveal>
          <WarrantyBanner />
        </ScrollReveal>
      </Section>

      <div className="relative overflow-hidden bg-slate-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "26px 26px" }}
        />
        <Section
          eyebrow="Customer Reviews"
          title="Loved by homes across Tuticorin"
          align="center"
          className="relative"
        >
          <ScrollReveal>
            <Reviews />
          </ScrollReveal>
        </Section>
      </div>

      <div className="relative overflow-hidden bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.25]"
          style={{ backgroundImage: "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)", backgroundSize: "50px 50px" }}
        />
        <Section eyebrow="FAQ" title="Frequently asked questions" align="center" className="relative">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl">
              <FaqAccordion />
            </div>
          </ScrollReveal>
        </Section>
      </div>

      <div className="relative overflow-hidden bg-slate-50">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }}
        />
        <Section eyebrow="Get In Touch" title="Book your service today" className="relative">
          <ScrollReveal>
            <HomeContact />
          </ScrollReveal>
        </Section>
      </div>
    </>
  );
}
