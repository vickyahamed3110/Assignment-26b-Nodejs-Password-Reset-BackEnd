import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'vickyahamedbl@gmail.com',
        pass: process.env.GMAIL_PASS || '',
    }
})

const mailOptions = {
    from: 'vickyahamedbl@gmail.com',
    to:['vigneshbl68@gmail.com'],
    subject:'Gmail Sending',
    text: 'Sending Mails are so easy'
}

export {transporter, mailOptions}