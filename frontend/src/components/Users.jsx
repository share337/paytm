import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true)
    setError("")
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then(response => {
        setUsers(response.data.user)
      })
      .catch(() => setError("We couldn't load users. Please try again."))
      .finally(() => setIsLoading(false))
  }, [filter])

  return <>
    <div className="mt-10 flex items-end justify-between gap-4">
      <div>
        <p className="text-xl font-bold text-slate-900">Send money</p>
        <p className="mt-1 text-sm text-slate-500">Choose a recipient from your contacts</p>
      </div>
      <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:inline">
        {users.length} {users.length === 1 ? "person" : "people"}
      </span>
    </div>
    <div className="my-5">
      <input value={filter} onChange={(e) => setFilter(e.target.value)} type="search" placeholder="Search by name..." className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
    </div>
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {isLoading && <div className="p-6 text-center text-sm text-slate-500">Finding people...</div>}
      {!isLoading && error && <div className="p-6 text-center text-sm text-red-600">{error}</div>}
      {!isLoading && !error && users.length === 0 && <div className="p-8 text-center text-sm text-slate-500">No users found. Try a different name.</div>}
      {!isLoading && !error && users.map(user => <User key={user._id} user={user} />)}
    </div>
  </>
}

function User({ user }) {
  const navigate = useNavigate();

  return <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-b-0 sm:p-5">
    <div className="flex min-w-0 items-center">
      <div className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700">
        {user.firstName?.[0]?.toUpperCase()}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-slate-800">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-xs text-slate-500">PayTM contact</div>
      </div>
    </div>
    <div className="shrink-0">
      <Button onClick={() => navigate("/send?id=" + user._id + "&name=" + encodeURIComponent(user.firstName))} label={"Send"} />
    </div>
  </div>
}
