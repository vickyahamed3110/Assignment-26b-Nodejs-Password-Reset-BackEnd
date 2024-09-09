import express from 'express'
import loginRouter from './apis/login.js';
import connectToDb from './mongodb-connection.js';
import cors from 'cors'
import registerRouter from './apis/register.js'
import forgetPasswordRouter from './apis/forget-password.js'
import checkOtpRouter from './apis/check-otp.js'
import resetPasswordRouter from './apis/reset-password.js'

const server = express()
server.use(express.json())
server.use(cors())
await connectToDb()
server.use('/register', registerRouter)
server.use('/login', loginRouter)
server.use('/forget-password', forgetPasswordRouter)
server.use('/check-otp', checkOtpRouter)
server.use('/reset-password', resetPasswordRouter)

const port = 7000;
server.listen(port, () =>{
    console.log(Date().toString(), "express port:", port)
})