import express from "express"
import mongoose from "mongoose"
import { TodoModel, UserModel } from "./db.js"
import "dotenv/config"
import jwt from "jsonwebtoken"
import { auth } from "./auth.js"
await mongoose.connect(
  "mongodb+srv://user1:geBDFeUUkVQoTs4M@cluster0.c60lphp.mongodb.net/hackers"
)
console.log("database connected")

const app = express()
app.use(express.json())
app.get("/", (req, res) => {
  res.status(200).json({ "msg": "Welcome to the hackers group" })
})
app.post("/signup", async (req, res) => {
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

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password
  const response = await UserModel.findOne({
    email: email,
    password: password
  })
  console.log(response)
  if (response) {
    const token = jwt.sign({
      id: response._id.toString()
    }, process.env.JWT_SECRET)
    res.status(200).json({
      "token": token
    })
  }
  else {
    res.status(403).json({
      "msg": "Error in token generation"
    })
  }

})
app.post("/todo", auth, async (req, res) => {
  const title = req.body.title
  const userId = req.userId.toString()
  const completed = req.body.completed
  await TodoModel.create({
    title: title, userId: userId, completed: completed
  })
  res.status(200).json({ userId: userId.toString() })
})
app.get("/todos", auth, async (req, res) => {
  const userId = req.userId
  const data = await TodoModel.findOne({
    userId: userId
  })
  res.status(200).json({
    "title": data.title,
    "completed": data.completed
  })
})

app.listen(process.env.PORT, () => {
  console.log("Server is running at port: " + process.env.PORT)
})
