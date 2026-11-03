import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
export function Dashboard() {
  return <div className="page-shell">
    <Appbar />
    <main className="mx-auto max-w-3xl px-5 py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-brand-700">Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Good to see you</h1>
      </div>
      <Balance value={"10000"} />
      <Users />
    </main>
  </div>
}
