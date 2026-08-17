import type { Metadata } from "next";
import { AppShell } from "@/components/site/AppShell";
import { BUSINESS } from "@/lib/contact";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kghomecare.in"),
  title: {
    default: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    template: `%s — ${BUSINESS.name}`,
  },
  description:
    "KG Home Care provides washing machine repair, installation, and maintenance — certified technicians, genuine parts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
