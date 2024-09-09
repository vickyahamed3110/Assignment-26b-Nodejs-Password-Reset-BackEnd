import express from 'express'
import { db } from '../mongodb-connection.js'
import { transporter, mailOptions } from './mail-utils.js'
import dotenv from 'dotenv'
dotenv.config()

const forgetPasswordRouter = express.Router()
forgetPasswordRouter.post('/', async(req, res) => {
    const userData = req.body
    const collection = db.collection("users")
    const userObj = await collection.findOne({email:userData.email})
    try {
        if(userObj) {
            await collection.updateOne({email:userData.email}, {$set:{otp:Math.floor(100000 + Math.random() * 900000)}})
            const get_otp = await collection.findOne({email:userData.email})
            console.log(get_otp)
            await transporter.sendMail({
                ...mailOptions,
                to:userData.email,
                subject:"Password reset",
                text:
                `Hi!! ${get_otp.name}!!,
                otp: ${get_otp.otp}
                Enter your otp here,
                ${process.env.FE_URL}/get-otp?email=${get_otp.email}`,
            })
            res.send({msg:"Email sent successfully", code:1})
        } else {
            res.status(404).send({msg:"you are not user", code:0})
        }
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }
})

export default forgetPasswordRouter