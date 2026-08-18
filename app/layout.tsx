import type { Metadata } from "next";
import { AppShell } from "@/components/site/AppShell";
import { BUSINESS } from "@/lib/contact";
import { getPublishedSeoPages } from "@/lib/cms";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kghomecare.in"),
  title: {
    default: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    template: `%s — ${BUSINESS.name}`,
  },
  description:
    "KG Home Care provides doorstep washing machine repair, installation, and maintenance in Tuticorin — certified technicians, genuine parts.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seoPages = await getPublishedSeoPages();

  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell seoPages={seoPages}>{children}</AppShell>
      </body>
    </html>
  );
}
