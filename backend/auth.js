import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
function auth(req, res, next) {
  const token = req.headers.token;
  try {
    if (!token) {
      return res.status(401).json({
        msg: "Authentication required"
      })
    }

    const tokenVerification = jwt.verify(token, JWT_SECRET)
    if (tokenVerification) {
      req.id = tokenVerification.id
      return next()
    }
  }
  catch (error) {
    return res.status(403).json({
      msg: "Token Verification error"
    })
  }
}

export { auth }
