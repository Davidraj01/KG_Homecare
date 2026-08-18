import Link from "next/link";
import { format } from "date-fns";
import { getLeads } from "@/lib/cms";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-bold tracking-tight">Contact Leads</h1>
        <p className="mt-2 text-muted-foreground">Customer enquiries submitted through the website.</p>
      </section>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-soft">
        {leads.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Customer</th>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Request</th>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Received</th>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t">
                    <td className="px-5 py-4">
                      <p className="font-semibold">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p>{lead.service || "-"}</p>
                      {lead.brand ? <p className="text-xs text-muted-foreground">{lead.brand}</p> : null}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold">{lead.status}</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {lead.created_at ? format(new Date(lead.created_at), "dd MMM yyyy, p") : "-"}
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/dashboard/leads/${lead.id}`} className="font-medium text-primary hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
