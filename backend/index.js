import express from "express"
import mongoose from "mongoose"
import { UserModel } from "./db.js"
import "dotenv/config"
import jwt from "jsonwebtoken"
import { auth } from "./auth.js"
import cors from "cors"
import { rootRouter } from "./routes/index.js"
import { JWT_SECRET, PORT } from "./config.js"
// await mongoose.connect(
//   "mongodb+srv://user1:geBDFeUUkVQoTs4M@cluster0.c60lphp.mongodb.net/paytm"
// )
await mongoose.connect(process.env.MONGO_URL)
console.log("database connected")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
  console.log("Server is running at port: " + process.env.PORT)
})
