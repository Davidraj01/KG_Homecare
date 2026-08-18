import Link from "next/link";
import { Plus } from "lucide-react";
import { getServices } from "@/lib/cms";
import { deleteServiceAction, duplicateServiceAction } from "@/lib/actions/cms";
import { Button } from "@/components/ui/button";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-white p-8 shadow-soft">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="mt-2 text-muted-foreground">Manage services shown on `/services` and their detail pages.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/services/new">
            <Plus className="mr-2 h-4 w-4" />
            New service
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-soft">
        {services.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">No services yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-secondary/60">
                <tr>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Service</th>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Slug</th>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-t">
                    <td className="px-5 py-4">
                      <p className="font-semibold">{service.name}</p>
                      {service.description ? (
                        <p className="max-w-sm truncate text-xs text-muted-foreground">{service.description}</p>
                      ) : null}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{service.slug}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          service.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/dashboard/services/${service.id}/edit`}
                          className="rounded-lg border px-3 py-1.5 text-xs font-semibold hover:bg-secondary"
                        >
                          Edit
                        </Link>
                        <form action={duplicateServiceAction.bind(null, service.id)}>
                          <button type="submit" className="rounded-lg border px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
                            Duplicate
                          </button>
                        </form>
                        <form action={deleteServiceAction.bind(null, service.id, service.image_url, service.slug)}>
                          <button
                            type="submit"
                            className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
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
