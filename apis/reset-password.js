import express from 'express'
import { db } from '../mongodb-connection.js'
import bcrypt from 'bcrypt'

const resetPasswordRouter = express.Router()
resetPasswordRouter.post('/', async(req, res) => {
    const userData = req.body
    const password = userData.password
    const collection = db.collection('users')
    try {
        bcrypt.hash(password, 10, async function(err, hash){
            if(err){
                res.status(500).send({message:"something error in your password"})
            } else {
                await collection.updateOne({email:userData.email}, {$set:{password:hash},
                })
                res.send({msg:"password reset successfully", code:1})
            }
        })
    } catch (error) {
        res.status(403).send({msg:"Failed User Verification", code:-1})
    }
})

export default resetPasswordRouter