import dotenv from "dotenv";
dotenv.config()
import JWT from 'jsonwebtoken'
import nodemailer from 'nodemailer'
// ** Helper for reauthenticating user access token
async function generateAccessToken(user) {
    return JWT.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '168h' })
}
const mail = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD,
        },
    });
    try {
        const info = transporter.sendMail({
            from: {
                name: "Zenithearn",
                address: process.env.MAILER_USERNAME
            },
            to: email,
            subject: subject,
            html: html
        });

        if (info.accepted.includes(email)) {
            return true
        }
    } catch (error) {
        console.error('Error sending upgrade email:', error);
        return false
    }
}
async function checkPasswordChange(startDate, interval = 21) {
    // Convert the input to a Date object
    const start = new Date(startDate);
    const today = new Date().toISOString(); // Use ISO format for consistent parsing

    // Check if the input date is valid
    if (isNaN(start)) {
        throw new Error("Invalid date format. Please provide a valid date.");
    }

    // Add interval days in milliseconds
    const resultDate = new Date(start.getTime() + interval * 24 * 60 * 60 * 1000).toISOString();
    if (new Date(today) >= new Date(resultDate)) {
        return true // Allow password change
    } else {
        return false // Disallow password change
    }
}
export { generateAccessToken, mail, checkPasswordChange }