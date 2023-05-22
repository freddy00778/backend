// import {options, mailOptions} from "./config";
// import * as Sentry from "@sentry/node"
//
//
// const Queue = require('bull');
//
// // @ts-ignore
// const sendSingleMail = ({email, subject, type, items, total, name, date, orderNumber, phoneNumber }) => {
//     const transporter = options()
//
//     transporter.sendMail(mailOptions({
//         name,
//         type: "invoice",
//         to: email,
//         subject,
//         text:"",
//         html:"",
//         sign_off: "",
//         id:"",
//         expiry:"",
//         game_id: "",
//         user_id: "",
//         license_id: ""
//     }), (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }
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
// export const queueInvoiceEmail = async ({email, items, total, name, date, orderNumber, phoneNumber}) => {
//     const sendSingleEmailQueue = queueConfig("sendSingleEmail")
//
//     const queueOptions = {
//         delay: 1000,
//         attempts: 2,
//     }
//
//     const data = {email, items, total, name, date, orderNumber, phoneNumber}
//     sendSingleEmailQueue.add(data, queueOptions);
//     sendSingleEmailQueue.process(async job => {
//         return  sendSingleMail({
//             name: job.data.name,
//             date: job.data.date,
//             email: job.data.email,
//             phoneNumber: job.data.phoneNumber,
//             orderNumber: job.data.orderNumber,
//             subject: "Invoice from Changeverve Academy",
//             type: "invoice",
//             items: job.data.items,
//             total
//         })
//     })
// }
//
// export const queueEmail = async ({to, subject, email_content, sign_off, scheduled, scheduled_at, user_license_id, interval, expiry, user, license}) =>{
//     console.log("Interval", interval)
//     const sendMailQueue = queueConfig("sendMail")
//
//     const data = {
//         email: to,
//         subject: subject,
//         email_content: email_content,
//         sign_off: sign_off,
//         scheduled,
//         scheduled_at,
//         user_license_id,
//         expiry,
//         user,
//         license
//     }
//     const sample_scheduled_time = new Date(scheduled_at).getTime()
//     const timeDifference = sample_scheduled_time - Date.now()
//     const delayMilliseconds = scheduled? timeDifference: 1000
//
//     const queueOptions = {
//         delay: delayMilliseconds,
//         attempts: 2,
//     }
//
//     sendMailQueue.add(data, queueOptions);
//
//     sendMailQueue.process(async job => {
//         return  await sendMail({
//             to: job.data.email,
//             subject: job.data.subject,
//             email_content: job.data.email_content,
//             sign_off: job.data.sign_off,
//             id: job.data.user_license_id,
//             expiry: job.data.expiry,
//             user: job.data.user,
//             license: job.data.license,
//         });
//     })
// }
//
// const sendMail = async ({to, subject, email_content, sign_off, id, expiry, user, license}) => {
//     const transporter = options()
//     const html = email_content
//     const text = `Test email`
//
//     transporter.sendMail(await mailOptions({
//         type: "invite", to, subject, text, html, sign_off,id, expiry, name: "",
//         user_id: user,
//         game_id: "",
//         license_id: license,
//     }), (error, info) => {
//         // transporter.sendMail(mailOptions({type: "invoice", to, subject, text, html, sign_off,id}), (error, info) => {
//         if (error) {
//             console.log(error);
//             Sentry.captureException(error)
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }
