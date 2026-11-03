export const Appbar = () => {
  const handleSignOut = () => {
    localStorage.removeItem("token")
    window.location.href = "/signin"
  }

  return <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
      <div>
        <div className="text-xl font-bold tracking-tight text-slate-900">Pay<span className="text-brand-600">TM</span></div>
        <div className="text-xs text-slate-500">Simple, secure payments</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <div className="text-sm font-semibold text-slate-800">Welcome back</div>
          <div className="text-xs text-slate-500">Your wallet</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700">U</div>
        <button onClick={handleSignOut} className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
          Sign out
        </button>
      </div>
    </div>
  </header>
}
