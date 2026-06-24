import jwt from "jsonwebtoken"
import "dotenv/config"
const JWT_SECRET = process.env.JWT_SECRET
const SALTROUNDS = process.env.SALTROUNDS
const PORT = process.env.PORT
export { JWT_SECRET, PORT, SALTROUNDS }
