import type { Metadata } from "next";
import Script from "next/script";
import { AppShell } from "@/components/site/AppShell";
import { BUSINESS, LOGO_URL, PHONE_DISPLAY } from "@/lib/contact";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-3EBJB1DJZH";
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "_3Xc52UeNf49StI2V1MN0J_G2cd-Tnftt30MzMNW53w";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kghomecare.in"),
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
    images: [{ url: LOGO_URL, width: 1077, height: 1077, alt: BUSINESS.name }],
  },
  twitter: {
    card: "summary",
    images: [LOGO_URL],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  url: "https://www.kghomecare.in",
  logo: LOGO_URL,
  image: LOGO_URL,
  telephone: PHONE_DISPLAY,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.address.line1} ${BUSINESS.address.line2}`,
    addressLocality: BUSINESS.address.city,
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: BUSINESS.address.city,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "25",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BUSINESS.name,
  url: "https://www.kghomecare.in",
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
      <Script id="website-schema" type="application/ld+json">
        {JSON.stringify(websiteSchema)}
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
