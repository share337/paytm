import { Link } from "react-router-dom";

export function ButtonWarning({ label, buttonText, to }) {
  return <div className="text-center text-sm text-slate-500">
    <div className="inline">
      {label}
    </div>
    <Link className="pl-1 font-semibold text-brand-700 hover:underline" to={to}>{buttonText}</Link>
  </div>
}
