import Link from "next/link";
import { BUSINESS } from "@/lib/contact";
import { Clock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#07090f] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">

        {/* ── Brand ── */}
        <div>
          <span className="text-base font-extrabold tracking-tight text-white">{BUSINESS.name}</span>
          <p className="mt-1 text-xs font-medium text-white/40">{BUSINESS.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
            Trusted washing machine service, installation and maintenance — certified technicians, genuine parts.
          </p>
          <p className="mt-5 flex items-center gap-2.5 text-sm text-white/60">
            <Clock className="h-3.5 w-3.5 text-primary" /> {BUSINESS.hours}
          </p>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/" className="text-white/55 hover:text-white">Home</Link></li>
            <li><Link href="/services" className="text-white/55 hover:text-white">Services</Link></li>
            <li><Link href="/about" className="text-white/55 hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="text-white/55 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* ── Book ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Get Started</h3>
          <p className="mt-4 text-sm text-white/55">
            Ready to book a service? Send us your details and we&apos;ll get back to you shortly.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Book Now
          </Link>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/30 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
