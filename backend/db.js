import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const User = new Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String
})


const UserModel = mongoose.model('user', User)

export { UserModel }
