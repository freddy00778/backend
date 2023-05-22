"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const config_1 = require("./config");
const resetEmail_1 = require("./templates/resetEmail");
const resultsEmail_1 = require("./templates/resultsEmail");
const assessmentsEmail_1 = require("./templates/assessmentsEmail");
const administratorSetUpEmail_1 = require("./templates/administratorSetUpEmail");
const coordinatorSetUpEmail_1 = require("./templates/coordinatorSetUpEmail");
const reminderEmailToCoordinator_1 = require("./templates/reminderEmailToCoordinator");
const allCompletedEmail_1 = require("./templates/allCompletedEmail");
const invoiceEmail_1 = require("./templates/invoiceEmail");
const userReminderEmail_1 = require("./templates/userReminderEmail");
const completedEmailToCoordinator_1 = require("./templates/completedEmailToCoordinator");
const coordinatorRegistrationEmail_1 = require("./templates/coordinatorRegistrationEmail");
const paymentLink_1 = require("./templates/paymentLink");
function SendEmail() {
    const Queue = require('bull');
    const transporter = (0, config_1.options)();
    const from = `no-reply@changeverveacademy.com`;
    const queueConfig = (name) => {
        return new Queue(name, {
            redis: {
                host: '127.0.0.1',
                port: 6379,
                password: ''
            }
        });
    };
    const queueEmail = ({ to, subject, email_content, queue_name }) => __awaiter(this, void 0, void 0, function* () {
        const sendMailQueue = queueConfig(queue_name);
        const data = {
            email: to,
            subject: subject,
            email_content: email_content
        };
        const delayMilliseconds = 1000;
        const queueOptions = {
            delay: delayMilliseconds,
            attempts: 2
        };
        sendMailQueue.add(data, queueOptions);
        sendMailQueue.process((job) => __awaiter(this, void 0, void 0, function* () {
            return transporter.sendMail({
                from,
                to: job.data.email,
                subject: job.data.subject,
                html: job.data.email_content,
                text: job.data.email_content
            });
        }));
    });
    const htmlPdf = require('html-pdf');
    const pdfOptions = { format: 'A3' };
    const queueEmailWithPdfAttachment = ({ to, subject, email_content, htmlForPdf, attachmentName, queue_name }) => __awaiter(this, void 0, void 0, function* () {
        const sendMailQueue = queueConfig(queue_name);
        const data = {
            email: to,
            subject: subject,
            email_content: email_content,
            htmlForPdf: htmlForPdf,
            attachmentName: attachmentName
        };
        const delayMilliseconds = 1000;
        const queueOptions = {
            delay: delayMilliseconds,
            attempts: 2
        };
        sendMailQueue.add(data, queueOptions);
        sendMailQueue.process((job) => __awaiter(this, void 0, void 0, function* () {
            const createPdfPromise = new Promise((resolve, reject) => {
                htmlPdf.create(job.data.htmlForPdf, pdfOptions).toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(buffer);
                    }
                });
            });
            const pdfBuffer = yield createPdfPromise;
            return transporter.sendMail({
                from,
                to: job.data.email,
                subject: job.data.subject,
                html: job.data.email_content,
                attachments: [
                    {
                        filename: job.data.attachmentName,
                        content: pdfBuffer,
                    },
                ],
            });
        }));
    });
    return {
        sendWelcomeEmail(recipientEmail, content, sign_off, expiry, user, license_id, id) {
            return __awaiter(this, void 0, void 0, function* () {
                const template = yield (0, assessmentsEmail_1.assessmentsEmailTemplate)(content, id, sign_off, expiry, recipientEmail, user, license_id);
                return queueEmail({ to: recipientEmail, email_content: template, subject: `Registration for the ChangeVerve Change Management Game`, queue_name: `send-welcome-email` });
            });
        },
        confirmationEmailToAdmin(adminEmail, no_of_purchases) {
            return __awaiter(this, void 0, void 0, function* () {
                const template = (0, administratorSetUpEmail_1.administratorSetUpEmail)(no_of_purchases);
                return queueEmail({ to: adminEmail, email_content: template,
                    subject: `Confirmation of team configuration for the ChangeVerve Change Management Game `,
                    queue_name: `send-admin-setup-email` });
            });
        },
        confirmationEmailToCoordinator(coordinatorEmail, team_name, expiry, administrator_email) {
            const template = (0, coordinatorSetUpEmail_1.coordinatorSetUpEmail)(team_name, expiry, administrator_email);
            return queueEmail({
                to: coordinatorEmail,
                email_content: template,
                subject: `Confirmation of team configuration for the ChangeVerve Change Management Game`,
                queue_name: `send-coordinator-email`
            });
        },
        coordinatorRegistrationEmail(coordinatorEmail, team_name, expiry, user_id) {
            const template = (0, coordinatorRegistrationEmail_1.coordinatorRegistrationEmail)(team_name, expiry, user_id);
            return queueEmail({
                to: coordinatorEmail,
                email_content: template,
                subject: `Confirmation of team configuration for the ChangeVerve Change Management Game`,
                queue_name: `send-coordinator-email`
            });
        },
        sendUserReminderEmail(recipientEmail, content, id, sign_off, expiry, user, license_id) {
            return __awaiter(this, void 0, void 0, function* () {
                const template = yield (0, userReminderEmail_1.userReminderEmail)(content, id, sign_off, expiry, recipientEmail, user, license_id);
                return queueEmail({
                    to: recipientEmail,
                    subject: "Reminder to complete the ChangeVerve Change Management Game",
                    email_content: template,
                    queue_name: "user-reminder-email"
                });
            });
        },
        sendCompletedResults(recipientEmail, user_id, game_id, license_id) {
            return __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore
                const { PdfHtml, firstName, lastName, licensedUser } = yield (0, resultsEmail_1.resultsTemplate)({ user_id, game_id, license_id });
                const introEmailContent = `
               <div>
                <p>Congratulations <b>${firstName} ${lastName}</b>,</p>
                <p>You have completed the ChangeVerve Change Management Game! We trust that you found the experience insightful and derived significant value throughout the process.</p>
                <p>Attached is a summary of your final results. 
<!--                <a href="results.html">HTML attachment with results</a>-->
                </p>
                <p>Please contact your Administrator at <a href="mailto:${licensedUser === null || licensedUser === void 0 ? void 0 : licensedUser.email}"></a> if you have any questions or if you are interested in developing any specific Change Management skills.</p>
                <p>All the best for your organisational Change Management projects!</p>
                <p>Sincerely,</p>
                <p>The ChangeVerve Team.</p>
                </div>
            `;
                return queueEmailWithPdfAttachment({ to: recipientEmail, email_content: introEmailContent,
                    htmlForPdf: PdfHtml, attachmentName: "results-pdf.pdf", queue_name: "send-completed-results", subject: "ChangeVerve Change Management Game Results" });
                // return queueEmail({to: recipientEmail, email_content: htmlEmailContent, subject: `ChangeVerve Change Management Game Results`, queue_name: `send-completed-results`})
            });
        },
        sendResetEmail(recipientEmail, content) {
            const htmlEmailContent = (0, resetEmail_1.resetEmailTemplate)(content);
            return queueEmail({ to: recipientEmail, email_content: htmlEmailContent, subject: `Reset Email`, queue_name: `send-reset-email` });
        },
        sendCompletedEmailToCoordinator(recipientEmail, name, email, administrator_email, team_name) {
            return __awaiter(this, void 0, void 0, function* () {
                const template = yield (0, completedEmailToCoordinator_1.completedEmailToCoordinator)(name, email, administrator_email, team_name);
                return queueEmail({ to: recipientEmail,
                    subject: "User completed the ChangeVerve Change Management Game", queue_name: "completed-email-coordinator", email_content: template });
            });
        },
        sendReminderEmailToCoordinator(recipientEmail, emails, expiry, administratorEmail) {
            const template = (0, reminderEmailToCoordinator_1.reminderEmailToCoordinator)(emails, expiry, administratorEmail);
            return queueEmail({
                to: recipientEmail,
                subject: "ChangeVerve Change Management Game",
                queue_name: "reminder-email-coordinator",
                email_content: template
            });
        },
        sendAllCompletedEmails(recipientEmail, company_name) {
            const template = (0, allCompletedEmail_1.allCompletedEmails)(company_name);
            return queueEmail({
                to: recipientEmail,
                subject: "User completed the ChangeVerve Change Management Game",
                queue_name: "completed-emails",
                email_content: template
            });
        },
        sendInvoiceEmail(recipientEmail, name, date, orderNumber, total, qty, token) {
            const template = (0, invoiceEmail_1.invoiceTemplate)(name, orderNumber, date, total, qty, token);
            return queueEmail({
                to: recipientEmail,
                subject: "Invoice",
                queue_name: "invoice-emails",
                email_content: template
            });
        },
        sendPaymentLink(email, plan, total, transaction_number, payment_link) {
            return __awaiter(this, void 0, void 0, function* () {
                const template = (0, paymentLink_1.paymentLink)(email, plan, total, transaction_number, payment_link);
                return queueEmail({
                    to: email,
                    subject: "Payment Link",
                    queue_name: "payment-link",
                    email_content: template
                });
            });
        }
    };
}
exports.SendEmail = SendEmail;
//# sourceMappingURL=SendEmail.js.map