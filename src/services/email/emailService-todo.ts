// import {options, mailOptions} from "./config";
//
// const Queue = require('bull');
//
// export const send = async ({to, subject, email_content, sign_off,id}) => {
//     const transporter = options()
//     const html = email_content
//     const text = `Test email`
//
//     transporter.sendMail(mailOptions({to, subject, text, html, sign_off,id}), (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }
//
// export const queueEmail = async ({to, subject, email_content, sign_off, scheduled, scheduled_at, user_license_id, interval}) =>{
//
//     // try {
//     console.log("interval ", interval)
//         const sendMailQueue = new Queue('sendMail', {
//             redis: {
//                 host: '127.0.0.1',
//                 port: 6379,
//                 password: ''
//             }
//         });
//
//         const data = {
//             email: to,
//             subject: subject,
//             email_content: email_content,
//             sign_off: sign_off,
//             scheduled,
//             scheduled_at,
//             user_license_id
//         }
//         const sample_scheduled_time = new Date(scheduled_at).getTime()
//         const timeDifference = sample_scheduled_time - Date.now()
//         const delayMilliseconds = scheduled ? timeDifference : 1000
//
//         // const dailyInMilliseconds = 86400000
//         // const weeklyInMilliseconds = 604800000
//         // const biWeeklyInMilliseconds = 1209600000
//         // const monthlyInMilliseconds = 2419200000
//
//         // const reminder_interval = interval === "daily" ?
//         //     dailyInMilliseconds : interval === "weekly" ?
//         //         weeklyInMilliseconds : interval === "biweekly" ?
//         //             biWeeklyInMilliseconds : interval === "monthly" ?
//         //                 monthlyInMilliseconds : 0
//
//         // const individualLimit = interval === "daily" ?
//         //     90 : interval === "weekly" ?
//         //         12 : interval === "biweekly" ?
//         //             6 : interval === "monthly" ?
//         //                 3 : 1
//
//         const queueOptions = {
//             delay: delayMilliseconds,
//             attempts: 2,
//             // repeat: {
//             //     every: reminder_interval,
//             //     limit: individualLimit
//             // }
//         }
//
//         sendMailQueue.add(data, queueOptions);
//
//         sendMailQueue.process(async job => {
//             return sendMail({
//                 to: job.data.email,
//                 subject: job.data.subject,
//                 email_content: job.data.email_content,
//                 sign_off: job.data.sign_off,
//                 id: job.data.user_license_id
//             })
//         })
//     // }catch (exception){
//     //     console.log("error from queue", exception)
//     // }
// }
//
// const sendMail = ({to, subject, email_content, sign_off, id}) => {
//     const transporter = options()
//     const html = email_content
//     const text = `Test email`
//
//     transporter.sendMail(mailOptions({to, subject, text, html, sign_off,id}), (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }