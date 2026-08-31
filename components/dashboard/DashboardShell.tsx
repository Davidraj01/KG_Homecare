"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, FileText, LogOut, Wrench, Menu, X } from "lucide-react";
import { signOutAdmin } from "@/lib/actions/cms";

const NAV = [
  { href: "/dashboard/leads",     label: "Contact Leads", icon: Users    },
  { href: "/dashboard/services",  label: "Services",      icon: Wrench   },
  { href: "/dashboard/seo-pages", label: "SEO Pages",     icon: FileText },
];

function SidebarContent({ userEmail, onNavigate }: { userEmail: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* brand */}
      <div className="border-b border-slate-700 px-5 py-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Admin Dashboard</p>
        <p className="mt-1 text-base font-extrabold text-white">KG Home Care</p>
        <p className="text-[10px] text-slate-400">Washing Machine Service Centre</p>
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                active ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* user + sign out */}
      <div className="space-y-1 border-t border-slate-700 px-3 py-4">
        <div className="flex items-center gap-3 px-3 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-black text-white">
            {userEmail?.[0]?.toUpperCase() ?? "A"}
          </span>
          <p className="truncate text-xs font-medium text-slate-300">{userEmail}</p>
        </div>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </form>
      </div>
    </>
  );
}

export function DashboardShell({
  userEmail,
  children,
}: {
  userEmail: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close the mobile drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="flex min-h-screen bg-slate-900">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-700 bg-slate-900 lg:flex">
        <SidebarContent userEmail={userEmail} />
      </aside>

      {/* ── Mobile drawer ── */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-end px-3 pt-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarContent userEmail={userEmail} onNavigate={() => setOpen(false)} />
      </aside>

      {/* ── Content area ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-800">
        {/* top bar */}
        <header className="flex h-14 shrink-0 items-center border-b border-slate-700 bg-slate-900 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-300 transition-colors hover:bg-slate-700 hover:text-white lg:hidden"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
          <span className="ml-2 text-sm font-bold text-white lg:hidden">KG Home Care</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-xs font-medium text-slate-400">Live</span>
          </div>
        </header>

        {/* page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
