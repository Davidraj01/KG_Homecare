"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { usePathname } from "next/navigation";

export function FloatingActions() {
  const pathname = usePathname();

  // Hide on standard non-SEO pages
  const isExcluded =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login");

  if (isExcluded) return null;

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      <Link
        href="/contact"
        aria-label="Book now"
        className="flex items-center gap-2.5 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(24,95,165,0.5)] transition-all hover:scale-105 hover:bg-primary/90 active:scale-95"
      >
        <CalendarCheck className="h-5 w-5" />
        <span className="hidden sm:inline">Book Now</span>
      </Link>
    </div>
  );
}
