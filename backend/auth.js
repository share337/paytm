import jwt from "jsonwebtoken"
import 'dotenv/config'
const JWT_SECRET = process.env.JWT_SECRET
function auth(req, res, next) {
  const token = req.headers.token
  const decodedToken = jwt.verify(token, JWT_SECRET)
  if (decodedToken) {
    req.userId = decodedToken.id
    next()
  }
  else {
    res.status(403).json({ "msg": "Invalid Credentials" })
  }
}

export { auth }
