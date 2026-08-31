export default function LeadsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-3xl border bg-white p-8 shadow-soft">
        <div className="h-8 w-48 rounded bg-slate-200 mb-2" />
        <div className="h-4 w-80 rounded bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl border bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="w-full">
                <div className="h-4 w-2/3 rounded bg-slate-200 mb-2" />
                <div className="h-3 w-1/2 rounded bg-slate-200" />
              </div>
              <div className="h-5 w-16 shrink-0 rounded-full bg-slate-200" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-2/3 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200" />
              <div className="h-3 w-1/3 rounded bg-slate-200" />
            </div>
            <div className="mt-4 border-t pt-4">
              <div className="h-8 w-full rounded-lg bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
