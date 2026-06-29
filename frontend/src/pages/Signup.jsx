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
  const navigate = useNavigate()
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"}></Heading>
        <SubHeading label="Enter your information to create an account" />
        <InputBox onChange={(e) => setFirstName(e.target.value)} label={"First Name"} placeholder={"Bikram"} />
        <InputBox onChange={(e) => setLastName(e.target.value)} label={"Last Name"} placeholder={"Chaudhary"} />
        <InputBox onChange={(e) => setUserName(e.target.value)} label={"User Name"} placeholder={"user@gmail.com"} />
        <InputBox onChange={(e) => setPassword(e.target.value)} label={"Password"} placeholder={"34343d!234"} />
        <div className="pt=4">
          <Button onClick={async () => {
            try {

              const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                userName,
                firstName,
                lastName,
                password
              });
              console.log(response.data.msg)
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            } catch (error) {
              console.log("signup failed")
            }
          }} label={"Signup"} />
        </div>
        <ButtonWarning label={"Already have an account"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>

}
