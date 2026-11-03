import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import SubHeading from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";
import { ButtonWarning } from "../components/ButtonWarning";
export const Signup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  return <div className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-xl shadow-slate-200/60 sm:p-9">
        <div className="mb-7 text-left text-xl font-bold tracking-tight text-slate-900">Pay<span className="text-brand-600">TM</span></div>
        <Heading label={"Sign Up"}></Heading>
        <SubHeading label="Enter your information to create an account" />
        <InputBox onChange={(e) => setFirstName(e.target.value)} label={"First Name"} placeholder={"Bikram"} />
        <InputBox onChange={(e) => setLastName(e.target.value)} label={"Last Name"} placeholder={"Chaudhary"} />
        <InputBox onChange={(e) => setUserName(e.target.value)} label={"User Name"} placeholder={"user@gmail.com"} />
        <InputBox type="password" onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"Create a password"} />
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-left text-sm text-red-700">{error}</p>}
        <div className="pt-4">
          <Button onClick={async () => {
            setError("")
            setIsSubmitting(true)
            try {

              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                userName,
                firstName,
                lastName,
                password
              });
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            } catch (error) {
              setError(error.response?.data?.msg || "Sign up failed. Please try again.")
            } finally {
              setIsSubmitting(false)
            }
          }} label={isSubmitting ? "Creating account..." : "Create account"} />
        </div>
        <div className="mt-6"><ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} /></div>
      </div>
    </div>
  </div>

}
