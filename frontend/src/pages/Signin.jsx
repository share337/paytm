
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import SubHeading from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { ButtonWarning } from "../components/ButtonWarning";
import { Button } from "../components/Button";
import axios from "axios";
export const Signin = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  return <div className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-xl shadow-slate-200/60 sm:p-9">
        <div className="mb-7 text-left text-xl font-bold tracking-tight text-slate-900">Pay<span className="text-brand-600">TM</span></div>
        <Heading label={"Sign In"}></Heading>
        <SubHeading label="Sign in to manage your wallet and send money." />
        <InputBox onChange={(e) => setUserName(e.target.value)} label={"User Name"} placeholder={"user@gmail.com"} />
        <InputBox type="password" onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"Enter your password"} />
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-left text-sm text-red-700">{error}</p>}
        <div className="pt-4">
          <Button onClick={async () => {
            setError("")
            setIsSubmitting(true)
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                userName,
                password
              })
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")


            } catch (error) {
              setError(error.response?.data?.msg || "Sign in failed. Please check your details.")
            } finally {
              setIsSubmitting(false)
            }

          }} label={isSubmitting ? "Signing in..." : "Sign In"} />
        </div>
        <div className="mt-6"><ButtonWarning label="Don't have an account?" buttonText={"Sign Up"} to={"/signup"} /></div>
      </div>
    </div>
  </div>

}
