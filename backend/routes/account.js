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
  const transferBody = z.object({
    to: z.string().refine(value => mongoose.isValidObjectId(value), {
      message: "Invalid recipient"
    }),
    amount: z.coerce.number().finite().positive().max(1000000)
  })
  const parsedBody = transferBody.safeParse(req.body)

  if (!parsedBody.success) {
    return res.status(400).json({
      msg: "Invalid transfer details",
      error: parsedBody.error
    })
  }

  const { amount, to } = parsedBody.data
  if (to === req.id) {
    return res.status(400).json({
      msg: "You cannot transfer money to yourself"
    })
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const account = await Account.findOne({
      userId: req.id
    }).session(session)
    if (!account || account.balance < amount) {
      await session.abortTransaction()
      return res.status(403).json({
        msg: "Insufficient balance"
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
    if (session.inTransaction()) {
      await session.abortTransaction()
    }
    console.error("Transfer failed", err)
    return res.status(411).json({
      msg: "Transfer failed"
    })
  } finally {
    await session.endSession()
  }
})

export { accountRouter }
