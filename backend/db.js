import mongoose from 'mongoose'
const Schema = mongoose.Schema

const User = new Schema({
  name: String,
  email: String,
  password: String,
})

const UserModel = mongoose.model('user', User)

export { UserModel }
