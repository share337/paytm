import express from "express"
import mongoose from "mongoose"
import { UserModel } from "./db.js"
import jwt from "jsonwebtoken"
const JWT_SECRET = "S3CRET";
await mongoose.connect(
  "mongodb+srv://user1:geBDFeUUkVQoTs4M@cluster0.c60lphp.mongodb.net/hackers"
)
console.log("database connected")

const PORT = 3000
const app = express()
app.use(express.json())
app.get("/", (req, res) => {
  res.status(200).json({ "msg": "Welcome to the hackers group" })
})
app.get("/signup", async (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const user = UserModel.create({
    name: name,
    email: email,
    password: password
  })
  res.status(200).json({
    "msg": "Your are signed up"
  })

})

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password
  const response = UserModel.findOne({
    email: email,
    password: password
  })
  if (response) {
    const token = jwt.sign({
      id: response._id.toString()
    })
    res.json({
      token
    })
  }

  else {
    res.status(403).json({
      "msg": "Incorrect creds"
    })
  }

})

app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT)
})
