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
    userName: z.string().min(3).max(100),
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


    const passwordMatch = bcrypt.compare(
      password,
      response.password
    )


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
      token
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
    "msg": "You are genius"
  })

})
export { userRouter }
