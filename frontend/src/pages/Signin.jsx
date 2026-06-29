
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
  const navigate = useNavigate()
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"}></Heading>
        <SubHeading label="Sign in  with details" />
        <InputBox onChange={(e) => setUserName(e.target.value)} label={"User Name"} placeholder={"user@gmail.com"} />
        <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"34343d!234"} />
        <div className="pt-4">
          <Button onClick={async () => {
            try {
              const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                userName,
                password
              })
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")


            } catch (error) {

              console.log("Sign in failed")
            }

          }} label={"Sign In"} />
        </div>
        <ButtonWarning label="Do not have account?" buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  </div>

}
