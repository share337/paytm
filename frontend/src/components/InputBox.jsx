export function InputBox({ label, placeholder, onChange, type = "text" }) {
  return <div>
    <div className="py-2 text-left text-sm font-medium text-slate-700">
      {label}
    </div>
    <input type={type} onChange={onChange} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" />
  </div>
}
