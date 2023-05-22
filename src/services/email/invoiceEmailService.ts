// import {options, mailOptions} from "./config";
//
// const Queue = require('bull');
//
// const sendSingleMail = ({email, subject, type, items, total }) => {
//     const transporter = options()
//     // const email = user.email
//     const sign_off = ""
//
//     transporter.sendMail(mailOptions({type, to: email, subject, text, html, sign_off,id}), (error, info) => {
//     // transporter.sendMail(mailOptionsConfig(type, email, subject,sign_off, items, total), (error, info) => {
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
//     });
// }
//
// export const queueInvoiceEmail = async ({email, items, total}) => {
//     const sendSingleEmailQueue = queueConfig("sendSingleEmail")
//
//     const queueOptions = {
//         delay: 1000,
//         attempts: 2,
//     }
//
//     const data = {email, items, total}
//     sendSingleEmailQueue.add(data, queueOptions);
//     sendSingleEmailQueue.process(async job => {
//         return  sendSingleMail({
//             email: job.data.email,
//             subject: "Invoice from Changeverve Academy",
//             type: "invoice",
//             items: job.data.items,
//             total
//         });
//     })
// }
//
// export const queueEmail = async ({to, subject, email_content, sign_off, scheduled, scheduled_at, user_license_id, interval, expiry}) =>{
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
//         expiry
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
//         return  sendMail({
//             to: job.data.email,
//             subject: job.data.subject,
//             email_content: job.data.email_content,
//             sign_off: job.data.sign_off,
//             id: job.data.user_license_id,
//             expiry: job.data.expiry
//         });
//     })
// }
//
// const sendMail = ({to, subject, email_content, sign_off, id, expiry}) => {
//     const transporter = options()
//     const html = email_content
//     const text = `Test email`
//
//     transporter.sendMail(mailOptions({type: "invite", to, subject, text, html, sign_off,id, expiry}), (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }
//
