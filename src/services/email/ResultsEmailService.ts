// import {options, mailOptions, mailOptionsWithAttachment} from "./config";
// import * as pdf from "html-pdf"
// // import {resultsTemplate} from "./templates/resultsEmail";
//
//
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
// export const queueEmail = async ({to, subject, user_id, game_id, license_id}) =>{
//     const sendMailQueue = queueConfig("send-results")
//
//     const data = {
//         email: to,
//         subject: subject,
//         user_id,
//         game_id,
//         license_id
//     }
//
//     const delayMilliseconds = 1000
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
//             game_id: job.data.game_id,
//             user_id: job.data.user_id,
//             license_id: job.data.license_id
//         })
//     })
//
//     // const mainHtml = await resultsTemplate({user_id, game_id, license_id})
//     // sendMailQueue.process(async job => {
//     //     return generatePDF({html: mainHtml})
//     //         .then(pdfBuffer => sendMailWithPdf({
//     //             to: job.data.email,
//     //             subject: job.data.subject,
//     //             game_id: job.data.game_id,
//     //             user_id: job.data.user_id,
//     //             license_id: job.data.license_id,
//     //             attachments: [{
//     //                 filename: 'attachment.pdf',
//     //                 content: pdfBuffer,
//     //                 contentType: 'application/pdf'
//     //             }]
//     //         }))
//     //         .catch(error => {
//     //             console.error(error);
//     //         })
//     // })
// }
//
// // @ts-ignore
// const sendMail = async({to, subject, game_id, user_id, license_id}) => {
//     const transporter = options()
//     const text = `Test email`
//
//     transporter.sendMail( await mailOptions(
//         {
//             type: "results",
//             to,
//             subject,
//             text, html:"",
//             sign_off:""
//             ,id:"",
//             expiry: "",
//             name: "",
//             game_id,
//             user_id,
//             license_id,
//         }), (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });
// }
//
// // @ts-ignore
// const sendMailWithPdf = ({to, subject, game_id, user_id, license_id, attachments}) => {
//     const transporter = options()
//     const text = `Test email`
//
//     transporter.sendMail(
//         mailOptionsWithAttachment(
//             {
//                 type: "results",
//                 to,
//                 subject,
//                 text,
//                 html:"",
//                 sign_off:"",id:"",
//                 expiry: "",
//                 name: "",
//                 game_id,
//                 user_id,
//                 license_id,
//                 attachments,
//             }), (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message %s sent: %s', info.messageId, info.response);
//         });
// }
//
//
// // @ts-ignore
// const generatePDF = async ({html}) => {
//     return new Promise((resolve, reject) => {
//         pdf.create(html).toBuffer((error, buffer) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(buffer);
//         });
//     });
// };