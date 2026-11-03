import axios from "axios"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export const SendMoney = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const name = searchParams.get("name")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTransfer = async () => {
    setMessage("")
    setIsSubmitting(true)

    try {
      await axios.post("http://localhost:3000/api/v1/account/transfer", {
        to: id,
        amount
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      setMessage("Transfer completed successfully.")
      setAmount("")
    } catch (error) {
      setMessage(error.response?.data?.msg || "Transfer failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return <div className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
    <div className="w-full max-w-md">
      <div
        className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"
      >
        <div className="mb-7">
          <p className="text-sm font-medium text-brand-700">Quick transfer</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Send money</h2>
          <p className="mt-2 text-sm text-slate-500">Transfer funds securely to your PayTM contact.</p>
        </div>
        <div>
          <div className="mb-7 flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600">
              <span className="text-xl font-semibold text-white">{name?.[0]?.toUpperCase()}</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Sending to</p>
              <h3 className="text-lg font-semibold text-slate-900">{name || "PayTM user"}</h3>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-700"
                htmlFor="amount"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min="0.01"
                step="0.01"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                id="amount"
                placeholder="Enter amount"
                value={amount}
              />
            </div>
            {message && <p className={`rounded-lg p-3 text-center text-sm ${message.includes("successfully") ? "bg-brand-50 text-brand-700" : "bg-red-50 text-red-700"}`}>{message}</p>}
            <button
              onClick={handleTransfer}
              disabled={isSubmitting || !amount || Number(amount) <= 0}
              className="h-12 w-full justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Transferring..." : "Initiate Transfer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}
