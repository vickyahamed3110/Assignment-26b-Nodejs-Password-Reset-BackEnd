import express from 'express'
import bcrypt from 'bcrypt'
import { db } from '../mongodb-connection.js'

const registerRouter = express.Router()
registerRouter.post('/', async (req, res) => {
    const userData = req.body
    const collection = db.collection('users')
    const userObj = await collection .findOne({email:userData.email})
    try {
        if(userObj) {
            res.status(400).send({message:"User already exists", code:1})
        } else {
            bcrypt.hash(userData.password,10, async function(err, hash){
                if(err){
                    res.status(500).send({msg:"Something error in your Password"})
                } else {
                    await collection.insertOne({
                        ...userData,
                        password:hash,
                    })
                    res.send({msg:"Registered Successfully"})
                }
            })
        }
    } catch (error) {
        res.status(500).send({message:"Something went wrong"})
    }
})

export default registerRouter