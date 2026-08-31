export default function SeoPagesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700/80 bg-slate-800/50 p-8">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-slate-700" />
          <div>
            <div className="h-6 w-32 rounded bg-slate-700 mb-2" />
            <div className="h-4 w-56 rounded bg-slate-700" />
          </div>
        </div>
        <div className="h-10 w-36 rounded-lg bg-slate-700" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-700/80 bg-slate-800/50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="w-full">
                <div className="h-4 w-3/4 rounded bg-slate-700 mb-2" />
                <div className="h-3 w-1/2 rounded bg-slate-700" />
              </div>
              <div className="h-5 w-16 shrink-0 rounded-full bg-slate-700" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-2/3 rounded bg-slate-700" />
              <div className="h-3 w-1/3 rounded bg-slate-700" />
            </div>
            <div className="mt-4 flex gap-2 border-t border-slate-700/60 pt-4">
              <div className="h-8 flex-1 rounded-lg bg-slate-700" />
              <div className="h-8 flex-1 rounded-lg bg-slate-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
