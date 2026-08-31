import Link from "next/link";
import { Plus, FileText, MapPin } from "lucide-react";
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

      {pages.length === 0 ? (
        <div className="rounded-2xl border border-slate-700/80 bg-slate-800/50 p-8 text-center text-sm text-slate-400">
          No SEO pages yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800/50 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-words font-semibold text-white">{page.title}</p>
                  {page.location ? (
                    <p className="mt-0.5 flex items-start gap-1 text-xs text-slate-400">
                      <MapPin className="h-3 w-3 shrink-0 translate-y-0.5" /> <span className="break-words">{page.location}</span>
                    </p>
                  ) : null}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    page.status === "Published" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {page.status}
                </span>
              </div>

              <dl className="mt-4 space-y-1.5 text-xs">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="shrink-0 text-slate-500">Slug</dt>
                  <dd className="min-w-0 break-all text-slate-300">/{page.slug}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="shrink-0 text-slate-500">Template</dt>
                  <dd className="text-slate-300">{page.template}</dd>
                </div>
              </dl>

              <div className="mt-4 flex gap-2 border-t border-slate-700/60 pt-4">
                <Link
                  href={`/dashboard/seo-pages/${page.id}/edit`}
                  className="flex-1 rounded-lg border border-slate-600 px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Edit
                </Link>
                <form
                  action={deleteSeoPageAction.bind(null, page.id, page.image_url, page.slug, page.section2_image_url)}
                  className="flex-1"
                >
                  <button
                    type="submit"
                    className="w-full rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
