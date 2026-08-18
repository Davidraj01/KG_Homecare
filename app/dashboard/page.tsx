import Link from "next/link";
import { format } from "date-fns";
import { Users, Wrench, FileText, ArrowRight } from "lucide-react";
import { getLeads, getServices, getSeoPages } from "@/lib/cms";

export default async function DashboardOverviewPage() {
  const [leads, services, seoPages] = await Promise.all([getLeads(), getServices(), getSeoPages()]);

  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const activeServices = services.filter((service) => service.status === "Active").length;
  const publishedPages = seoPages.filter((page) => page.status === "Published").length;
  const recentLeads = leads.slice(0, 5);

  const stats = [
    { label: "Total leads", value: leads.length, sub: `${newLeads} new`, icon: Users, href: "/dashboard/leads" },
    { label: "Services", value: services.length, sub: `${activeServices} active`, icon: Wrench, href: "/dashboard/services" },
    { label: "SEO pages", value: seoPages.length, sub: `${publishedPages} published`, icon: FileText, href: "/dashboard/seo-pages" },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Overview of leads, services, and SEO pages.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {stats.map(({ label, value, sub, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-3xl border bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-xs font-medium text-primary">{sub}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl border bg-white shadow-soft">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-lg font-semibold">Recent leads</h2>
          <Link href="/dashboard/leads" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Customer</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Service</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">Received</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="px-5 py-4">
                      <Link href={`/dashboard/leads/${lead.id}`} className="font-semibold hover:text-primary hover:underline">
                        {lead.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-4">{lead.service || "-"}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">{lead.status}</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {lead.created_at ? format(new Date(lead.created_at), "dd MMM yyyy") : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
