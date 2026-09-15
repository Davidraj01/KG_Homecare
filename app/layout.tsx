import type { Metadata } from "next";
import Script from "next/script";
import { AppShell } from "@/components/site/AppShell";
import { BUSINESS, LOGO_URL } from "@/lib/contact";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-3EBJB1DJZH";
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "_3Xc52UeNf49StI2V1MN0J_G2cd-Tnftt30MzMNW53w";

export const metadata: Metadata = {
  metadataBase: new URL("https://kghomecare.in"),
  title: {
    default: `${BUSINESS.name} — ${BUSINESS.tagline}`,
    template: `%s — ${BUSINESS.name}`,
  },
  description:
    "KG Home Care provides washing machine repair, installation, and maintenance — certified technicians, genuine parts.",
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    siteName: BUSINESS.name,
    images: [{ url: LOGO_URL, width: 1254, height: 1254, alt: BUSINESS.name }],
  },
  twitter: {
    card: "summary",
    images: [LOGO_URL],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BUSINESS.name,
  url: "https://kghomecare.in",
  logo: LOGO_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script id="organization-schema" type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </Script>
      {GTM_ID ? (
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      ) : null}
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            id="ga-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      ) : null}
      <body className="antialiased">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
