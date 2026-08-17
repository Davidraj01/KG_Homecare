"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FloatingActions } from "@/components/site/FloatingActions";
import { Toaster } from "@/components/ui/sonner";

type SeoPageLink = { id: string; slug: string; title: string };

type AppShellProps = {
  children: React.ReactNode;
  seoPages?: SeoPageLink[];
};

export function AppShell({ children, seoPages = [] }: AppShellProps) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname.startsWith("/login");
  const showSiteChrome = !isDashboardRoute && !isLoginRoute;

  if (!showSiteChrome) {
    return (
      <>
        {children}
        <Toaster richColors position="top-right" />
      </>
    );
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter seoPages={seoPages} />
        <FloatingActions />
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}
