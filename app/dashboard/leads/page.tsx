import Link from "next/link";
import { format } from "date-fns";
import { Phone, Wrench } from "lucide-react";
import { getLeads } from "@/lib/cms";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold tracking-tight">Contact Leads</h1>
        <p className="mt-2 text-muted-foreground">Customer enquiries submitted through the website.</p>
      </section>

      {leads.length === 0 ? (
        <div className="rounded-3xl border bg-white p-8 text-center text-sm text-muted-foreground shadow-soft">
          No leads yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-white p-5 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words font-semibold">{lead.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3 shrink-0" /> {lead.phone}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">
                  {lead.status}
                </span>
              </div>

              <dl className="mt-4 space-y-1.5 text-xs">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="shrink-0 text-muted-foreground">Service</dt>
                  <dd className="min-w-0 break-words">{lead.service || "-"}</dd>
                </div>
                {lead.brand ? (
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <dt className="shrink-0 text-muted-foreground">Brand</dt>
                    <dd className="min-w-0 break-words">{lead.brand}</dd>
                  </div>
                ) : null}
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="shrink-0 text-muted-foreground">Received</dt>
                  <dd className="min-w-0 break-words">
                    {lead.created_at ? format(new Date(lead.created_at), "dd MMM yyyy, p") : "-"}
                  </dd>
                </div>
              </dl>

              {lead.message ? (
                <p className="mt-3 line-clamp-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Wrench className="mt-0.5 h-3 w-3 shrink-0" />
                  <span className="break-words">{lead.message}</span>
                </p>
              ) : null}

              <div className="mt-4 border-t pt-4">
                <Link
                  href={`/dashboard/leads/${lead.id}`}
                  className="block w-full rounded-lg border px-3 py-1.5 text-center text-xs font-semibold text-primary hover:bg-secondary"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
