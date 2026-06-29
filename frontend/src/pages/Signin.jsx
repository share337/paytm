
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import SubHeading from "../components/Subheading";
import { InputBox } from "../components/InputBox";
export const Signin = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"}></Heading>
        <SubHeading label="Sign up your details" />
        <InputBox onChange={(e) => setUserName(e.target.value)} label={"User Name"} placeholder={"user@gmail.com"} />
        <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"34343d!234"} />
      </div>
    </div>
  </div>

}
