export default function DashboardOverviewLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-3xl border bg-white p-8 shadow-soft">
        <div className="h-8 w-48 rounded bg-slate-200 mb-2" />
        <div className="h-4 w-80 rounded bg-slate-200" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-3xl border bg-white p-6 shadow-soft">
            <div className="h-10 w-10 rounded-xl bg-slate-200" />
            <div className="mt-4 h-8 w-16 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-24 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-soft">
        <div className="border-b p-6">
          <div className="h-5 w-32 rounded bg-slate-200" />
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-secondary/60">
            <tr>
              {["Customer", "Service", "Status", "Received"].map((h) => (
                <th key={h} className="px-5 py-4">
                  <div className="h-4 w-20 rounded bg-slate-200" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-5 py-4">
                  <div className="h-4 w-32 rounded bg-slate-200 mb-2" />
                  <div className="h-3 w-24 rounded bg-slate-200" />
                </td>
                <td className="px-5 py-4"><div className="h-4 w-28 rounded bg-slate-200" /></td>
                <td className="px-5 py-4"><div className="h-6 w-16 rounded-full bg-slate-200" /></td>
                <td className="px-5 py-4"><div className="h-4 w-24 rounded bg-slate-200" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
