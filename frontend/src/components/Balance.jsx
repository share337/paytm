export function Balance({ value }) {
  return <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/10">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-300">Available balance</p>
        <p className="mt-2 text-3xl font-bold tracking-tight">₹ {Number(value).toLocaleString("en-IN")}</p>
      </div>
      <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-300">● Active</div>
    </div>
    <p className="mt-6 text-xs text-slate-400">Your balance is ready whenever you are.</p>
  </section>
}
