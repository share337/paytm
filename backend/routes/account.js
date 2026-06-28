import express from "express"
import { auth } from "../auth.js"
import { Account } from "../db.js"
import mongoose from "mongoose"
import * as z from "zod"

const accountRouter = express.Router()
accountRouter.get("/")

accountRouter.get("/balance", auth, async (req, res) => {
  const userId = req.id
  const data = await Account.findOne({
    userId: userId,
  })

  if (data) {
    return res.status(200).json({
      balance: data.balance
    })
  }


  else {
    return res.status(403).json({
      msg: "User data not found"
    })
  }

})

accountRouter.post("/transfer", auth, async (req, res) => {
  try {

    const session = await mongoose.startSession()
    session.startTransaction()
    const { amount, to } = req.body
    const account = await Account.findOne({
      userId: req.id
    }).session(session)
    if (!account || account.balance < amount) {
      await session.abortTransaction()
      return res.status(403).json({
        msg: "Insufficient balance ",
        id: account.userId,
        balance: account.balance
      })

    }

    const toAccount = await Account.findOne({
      userId: to
    }).session(session)

    if (!toAccount) {
      await session.abortTransaction()
      return res.status(403).json({
        msg: "Receiver account not found"
      })
    }
    // perform the transaction
    await Account.updateOne({
      userId: req.id
    }, {
      $inc: { balance: -amount }
    }).session(session)

    await Account.updateOne({
      userId: to
    },
      {
        $inc: {
          balance: amount
        }

      }).session(session)

    await session.commitTransaction()
    res.status(200).json({
      msg: `completely transfered ${amount} from ${account.userId} to ${toAccount.userId} `
    })
  }
  catch (err) {
    await session.abortTransaction()
    return res.status(411).json({
      err: err
    })

  }
})

export { accountRouter }
