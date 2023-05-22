// import {options, mailOptions} from "./config";
// import * as Sentry from "@sentry/node"
//
// const Queue = require('bull');
//
// const queueConfig = (name) => {
//     return new Queue(name, {
//         redis: {
//             host: '127.0.0.1',
//             port: 6379,
//             password: ''
//         }
//     })
// }
//
// export const queueEmail = async ({to, subject, email_content}) =>{
//     const sendMailQueue = queueConfig("resetMail")
//
//     const data = {
//         email: to,
//         subject: subject,
//         email_content: email_content
//     }
//
//     const delayMilliseconds = 1000
//
//     const queueOptions = {
//         delay: delayMilliseconds,
//         attempts: 2
//     }
//
//     sendMailQueue.add(data, queueOptions);
//
//     sendMailQueue.process(async job => {
//         return  await sendMail({
//             to: job.data.email,
//             subject: job.data.subject,
//             email_content: job.data.email_content,
//         });
//     })
// }
//
// const sendMail = async ({to, subject, email_content}) => {
//     const transporter = options()
//     const html = email_content
//     const text = `Test email`
//
//     transporter.sendMail(
//         await mailOptions({
//         type: "reset", to, subject, text, html, sign_off: "",id:"", expiry: "", name: "",
//         user_id: "",
//         game_id: "",
//         license_id: "",
//     }), (error, info) => {
//         if (error) {
//             console.log(error);
//             Sentry.captureException(error)
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }