import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const User = new Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String
})
const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("account", accountSchema)



const UserModel = mongoose.model('user', User)

export { UserModel, Account }
