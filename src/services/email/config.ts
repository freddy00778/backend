import * as nodemailer from "nodemailer";

const emailConfig = {
    host: process.env.EMAIL_HOST || "smtppro.zoho.com",
    port: process.env.EMAIL_PORT || 465,
    secure: process.env.EMAIL_SECURE || "SSL",
    auth: {
        // user: process.env.EMAIL_USER || "no-reply@changeverveacademy.com",
        user: process.env.EMAIL_USER || "info@changeverveacademy.com",
        pass: process.env.EMAIL_PASSWORD || "TOPman88%%"
    }
}

export const options = () => nodemailer.createTransport(emailConfig);
