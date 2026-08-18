import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { getSeoPages } from "@/lib/cms";
import { deleteSeoPageAction } from "@/lib/actions/cms";
import { Button } from "@/components/ui/button";

export default async function SeoPagesPage() {
  const pages = await getSeoPages();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700/80 bg-slate-800/50 p-8">
        <div className="flex items-center gap-4">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-400">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">SEO Pages</h1>
            <p className="text-sm text-slate-400">Manage location and service landing pages.</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/dashboard/seo-pages/new">
            <Plus className="mr-2 h-4 w-4" />
            New SEO page
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/50">
        {pages.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-400">No SEO pages yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/60">
                <tr>
                  <th className="px-5 py-4 font-medium text-slate-400">Page</th>
                  <th className="px-5 py-4 font-medium text-slate-400">Slug</th>
                  <th className="px-5 py-4 font-medium text-slate-400">Template</th>
                  <th className="px-5 py-4 font-medium text-slate-400">Status</th>
                  <th className="px-5 py-4 font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="border-t border-slate-700/60">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{page.title}</p>
                      {page.location ? <p className="text-xs text-slate-400">{page.location}</p> : null}
                    </td>
                    <td className="px-5 py-4 text-slate-400">/{page.slug}</td>
                    <td className="px-5 py-4 text-slate-400">{page.template}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          page.status === "Published" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/dashboard/seo-pages/${page.id}/edit`}
                          className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
                        >
                          Edit
                        </Link>
                        <form
                          action={deleteSeoPageAction.bind(null, page.id, page.image_url, page.slug, page.section2_image_url)}
                        >
                          <button
                            type="submit"
                            className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
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
