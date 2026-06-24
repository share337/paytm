import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js"

function auth(req, res, next) {
  const token = req.headers.token
  const tokenVerification = jwt.verify(token, JWT_SECRET)
  try {
    if (tokenVerification) {
      req.id = tokenVerification.id
      next()
    }
    return res.status(200).json({
      "msg": "authorized user"
    })

  }
  catch {
    return res.status(411).json({
      "msg": "wrong token"
    })

  }
}
export { auth }
