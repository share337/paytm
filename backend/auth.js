import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
function auth(req, res, next) {
  const token = req.headers.token;
  const tokenVerification = jwt.verify(token, JWT_SECRET)
  try {
    if (tokenVerification) {
      req.id = tokenVerification.id
      next()

    }
  }
  catch (error) {
    return res.status(403).json({
      msg: "Token Verification error"
    })
  }

}

export { auth }
