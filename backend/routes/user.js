import express from "express";
import { UserModel } from "../db.js";
import * as z from "zod"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js";

import { auth } from "../auth.js"

const userRouter = express.Router()

userRouter.post("/signup", async (req, res) => {
  const requireBody = z.object({
    userName: z.string().min(3).max(100).email(),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    password: z.string().min(3).max(100),

  })
  const parsedSuccess = requireBody.safeParse(req.body)
  if (!parsedSuccess.success) {
    res.status(411).json({
      "msg": "Invalid format",
      "error:": parsedSuccess.error

    })
  }
  const userName = req.body.userName
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password
  let throwError = false

  const existingUser = await UserModel.findOne({
    userName

  })
  if (existingUser) {
    return res.status(411).json({
      msg: "Email already taken, user already exists"
    })
  }
  try {

    const hashedPassword = await bcrypt.hash(password, 5)
    await UserModel.create({
      userName,
      firstName,
      lastName,
      password: hashedPassword
    })
  }
  catch (error) {
    console.log("User already exist")
    throwError = true
    res.status(411).json({
      msg: "User already exists"
    })
  } if (!throwError) {

    res.status(200).json({
      "msg": "Your are signed up"
    })
  }

})
userRouter.post("/signin", async (req, res) => {

  const requireBody = z.object({
    userName: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
  })

  const parsedSuccess = requireBody.safeParse(req.body)

  if (!parsedSuccess.success) {
    return res.status(411).json({
      msg: "Invalid format",
      error: parsedSuccess.error
    })
  }

  try {
    const { userName, password } = req.body

    const response = await UserModel.findOne({
      userName
    })

    if (!response) {
      return res.status(404).json({
        msg: "User not found"
      })
    }


    const passwordMatch = await bcrypt.compare(
      password,
      response.password
    )

    console.log(passwordMatch)

    if (!passwordMatch) {
      return res.status(401).json({
        msg: "Incorrect password"
      })
    }


    const token = jwt.sign(
      {
        id: response._id
      },
      JWT_SECRET
    )


    return res.status(200).json({
      msg: "Signed in successfully",
      token: token
    })


  } catch (error) {

    console.log(error)

    return res.status(500).json({
      msg: "Server error"
    })
  }

})
userRouter.post("/todo", auth, (req, res) => {
  const userId = req.id
  res.status(200).json({
    "msg": "You are genius",
    "userId": userId
  })

})
userRouter.post("/update", auth, async (req, res) => {
  const userId = req.id
  const reqBody = z.object({
    userName: z.string().min(3).max(100).email(),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
  })
  const parsedSuccess = reqBody.safeParse(req.body)
  if (!parsedSuccess.success) {
    return res.status(411).json({
      msf: "Invalid format"
    })

  }
  const userName = req.body?.userName
  const firstName = req.body?.firstName
  const lastName = req.body?.lastName
  const password = req.body?.password
  const hashedPassword = await bcrypt.hash(password, 5)
  const user = await UserModel.findOne({
    _id: userId


  })
  if (user) {
    await UserModel.updateOne({
      _id: userId
    },
      {
        $set: {

          userName: userName,
          firstName: firstName,
          lastName: lastName,
          password: hashedPassword
        }

      })
    return res.status(200).json({
      msg: "data modified successfully"
    })
  }
  else {
    return res.status(411).json({
      msg: "invalid format to update "
    })
  }

})

userRouter.get("/bulk", auth, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await UserModel.find({
    $or: [{
      firstName: {
        "$regex": filter
      },
      lastName: {
        "$regex": filter
      }
    }]
  })
  res.json({
    user: users.map((user) => ({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id

    }))
  })


})
export { userRouter }
