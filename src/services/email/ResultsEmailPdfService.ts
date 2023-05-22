// import {options} from "./config";
// import * as Sentry from "@sentry/node";
// const pdf = require('html-pdf');
// const nodemailer = require('nodemailer');
// const queue = require('bull');
//
//
// const queueConfig = (name) => {
//     return new queue(name, {
//         redis: {
//             host: '127.0.0.1',
//             port: 6379,
//             password: ''
//         }
//     })
// }
//
// const sendMailQueue = queueConfig("send-pdf");
// // const transporter = nodemailer.createTransport(options());
// const transporter = options()
//
// export const queueEmailWithPDF = async ({ to, subject, html }) => {
//     const data = {
//         email: to,
//         subject: subject,
//         html: html
//     };
//
//     const delayMilliseconds = 1000;
//     const queueOptions = {
//         delay: delayMilliseconds,
//         attempts: 2,
//     };
//
//     sendMailQueue.add(data, queueOptions);
//     sendMailQueue.process(async job => {
//         try {
//             const pdfBuffer = await generatePDF({ html: job.data.html });
//             const attachments = [{
//                 filename: 'attachment.pdf',
//                 content: pdfBuffer,
//                 contentType: 'application/pdf'
//             }];
//
//             await sendMail({
//                 to: job.data.email,
//                 subject: job.data.subject,
//                 attachments,
//             });
//
//             console.log('Message sent successfully');
//         } catch (error) {
//             console.error(error);
//             Sentry.captureException(error);
//         }
//     });
// };
//
// const generatePDF = async ({ html }) => {
//     return new Promise((resolve, reject) => {
//         pdf.create(html).toBuffer((error, buffer) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(buffer);
//         });
//     });
// };
//
// const sendMail = async ({ to, subject, attachments }) => {
//     const text = 'Test email';
//
//     const mailOptions = {
//         from: "no-reply@changeverveacademy.com",
//         to,
//         subject,
//         text,
//         attachments,
//     };
//
//     try {
//         await transporter.sendMail(mailOptions);
//     } catch (error) {
//         throw error;
//     }
// };
//
//
//
// // import {options, mailOptionsWithAttachment} from "./config";
// // import * as pdf from "html-pdf"
// // import * as Sentry from "@sentry/node";
// //
// // const Queue = require('bull');
// //
// // const queueConfig = (name) => {
// //     return new Queue(name, {
// //         redis: {
// //             host: '127.0.0.1',
// //             port: 6379,
// //             password: ''
// //         }
// //     })
// // }
// //
// // export const queueEmailWithPDF = async ({to, subject, html}) => {
// //     const sendMailQueue = queueConfig("send-pdf");
// //
// //     const data = {
// //         email: to,
// //         subject: subject,
// //         html: html
// //     }
// //
// //     const delayMilliseconds = 1000;
// //     const queueOptions = {
// //         delay: delayMilliseconds,
// //         attempts: 2,
// //     }
// //
// //     sendMailQueue.add(data, queueOptions);
// //
// //     const htmlString = '<html><body>Hello World</body></html>';
// //     sendMailQueue.process(async job => {
// //         return  await generatePDF({html: htmlString})
// //             .then(pdfBuffer => sendMail({
// //                 to: job.data.email,
// //                 subject: job.data.subject,
// //                 game_id: job.data.game_id,
// //                 user_id: job.data.user_id,
// //                 license_id: job.data.user_id,
// //                 attachments: [{
// //                     // filename: './public/attachment.pdf',
// //                     filename: 'attachment.pdf',
// //                     content: pdfBuffer,
// //                     contentType: 'application/pdf'
// //                 }]
// //             }))
// //             .catch(error => {
// //                 console.error(error)
// //                 Sentry.captureException(error)
// //             })
// //     })
// // }
// //
// // const generatePDF = async ({html}) => {
// //     // const html = '<html><body>Hello World</body></html>';
// //     // const options = {};
// //     return new Promise((resolve, reject) => {
// //         // pdf.create(html, options).toFile(`./public/attachment.pdf`, function(err, res) {
// //         //     if (err){
// //         //          reject(err);
// //         //     }
// //         //     console.log(res);
// //         //     resolve(res)
// //         // })
// //
// //         pdf.create(html).toBuffer((error, buffer) => {
// //             if (error) {
// //                 reject(error);
// //             }
// //             resolve(buffer);
// //         });
// //     });
// // };
// //
// // const sendMail = ({to, subject,  game_id, user_id, license_id, attachments}) => {
// //     const transporter = options()
// //     const text = `Test email`
// //
// //     transporter.sendMail(
// //         mailOptionsWithAttachment(
// //             {
// //                 type: "results",
// //                 to, subject,
// //                 text,
// //                 html:"",
// //                 sign_off:"",id:"",
// //                 expiry: "",
// //                 name: "",
// //                 game_id,
// //                 user_id,
// //                 license_id,
// //                 attachments,
// //                 token : ""
// //             }), (error, info) => {
// //         if (error) {
// //             return console.log(error);
// //         }
// //         console.log('Message %s sent: %s', info.messageId, info.response);
// //     });
// // }
// //
