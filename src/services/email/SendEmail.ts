import { options} from "./config";
import {resetEmailTemplate} from "./templates/resetEmail";
import {resultsTemplate} from "./templates/resultsEmail";
import {assessmentsEmailTemplate} from "./templates/assessmentsEmail";
import {administratorSetUpEmail} from "./templates/administratorSetUpEmail";
import {coordinatorSetUpEmail} from "./templates/coordinatorSetUpEmail";
import {reminderEmailToCoordinator} from "./templates/reminderEmailToCoordinator";
import {allCompletedEmails} from "./templates/allCompletedEmail";
import { invoiceTemplate} from "./templates/invoiceEmail";
import {userReminderEmail} from "./templates/userReminderEmail";
import {completedEmailToCoordinator} from "./templates/completedEmailToCoordinator";
import {coordinatorRegistrationEmail} from "./templates/coordinatorRegistrationEmail";
import {paymentLink} from "./templates/paymentLink";
import {formInvoiceEmail} from "./templates/formInvoiceEmail";

export function SendEmail(): EmailService {

    const Queue = require('bull');
    const transporter = options()
    const from = `no-reply@changeverveacademy.com`

    const queueConfig = (name) => {
        return new Queue(name, {
            redis: {
                host: '127.0.0.1',
                port: 6379,
                password: ''
            }
        })
    }

    const queueEmail = async ({to, subject, email_content, queue_name}) => {
        const sendMailQueue = queueConfig(queue_name)
        const data = {
            email: to,
            subject: subject,
            email_content: email_content
        }
        const delayMilliseconds = 1000
        const queueOptions = {
            delay: delayMilliseconds,
            attempts: 2
        }
        sendMailQueue.add(data, queueOptions);

        sendMailQueue.process(async job => {
            return transporter.sendMail({
                from,
                to: job.data.email,
                subject: job.data.subject,
                html: job.data.email_content,
                text: job.data.email_content
            })
        })
    }

    const htmlPdf = require('html-pdf');
    const pdfOptions = { format: 'A3' };

    const queueEmailWithPdfAttachment = async ({ to, subject, email_content, htmlForPdf, attachmentName, queue_name }) => {
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

        sendMailQueue.process(async job => {
            const createPdfPromise = new Promise((resolve, reject) => {
                htmlPdf.create(job.data.htmlForPdf, pdfOptions).toBuffer((err, buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                });
            });

            const pdfBuffer = await createPdfPromise;

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
        });
    };


    return {

        async sendWelcomeEmail(recipientEmail,content, sign_off, expiry, user, license_id, id): Promise<void> {
            const template = await assessmentsEmailTemplate(content, id,sign_off, expiry,recipientEmail,user,license_id)
            return queueEmail({to: recipientEmail, email_content: template, subject: `Registration for the ChangeVerve Change Management Game`, queue_name: `send-welcome-email`})
        },

        async confirmationEmailToAdmin(adminEmail: string, no_of_purchases, user_id): Promise<void> {

            const template = administratorSetUpEmail(no_of_purchases, user_id)
            return queueEmail({to: adminEmail, email_content: template,
                subject: `Confirmation of team configuration for the ChangeVerve Change Management Game `,
                queue_name: `send-admin-setup-email`})
        },

        confirmationEmailToCoordinator(coordinatorEmail: string, team_name, expiry, administrator_email): Promise<void> {
            const template = coordinatorSetUpEmail(team_name, expiry, administrator_email)
            return queueEmail({
                to: coordinatorEmail,
                email_content: template,
                subject: `Confirmation of team configuration for the ChangeVerve Change Management Game`,
                queue_name: `send-coordinator-email`
            })
        },

        coordinatorRegistrationEmail(coordinatorEmail: string, team_name, expiry, user_id): Promise<void> {
            const template = coordinatorRegistrationEmail(team_name, expiry, user_id)
            return queueEmail({
                to: coordinatorEmail,
                email_content: template,
                subject: `Confirmation of team configuration for the ChangeVerve Change Management Game`,
                queue_name: `send-coordinator-email`
            })
        }
        ,
        async sendUserReminderEmail(recipientEmail: string, content: string, id: string, sign_off: string, expiry: string, user, license_id: string): Promise<void> {
            const template = await userReminderEmail(content, id, sign_off, expiry, recipientEmail, user, license_id)
            return queueEmail({
                to: recipientEmail,
                subject: "Reminder to complete the ChangeVerve Change Management Game",
                email_content: template,
                queue_name: "user-reminder-email"
            })
        },


        async sendCompletedResults(recipientEmail: string, user_id: string, game_id: string, license_id: string): Promise<void> {
            // @ts-ignore
            const {PdfHtml, firstName, lastName, licensedUser} = await resultsTemplate({user_id, game_id, license_id})

            const introEmailContent = `
               <div>
                <p>Congratulations <b>${firstName} ${lastName}</b>,</p>
                <p>You have completed the ChangeVerve Change Management Game! We trust that you found the experience insightful and derived significant value throughout the process.</p>
                <p>Attached is a summary of your final results. 
<!--                <a href="results.html">HTML attachment with results</a>-->
                </p>
                <p>Please contact your Administrator at <a href="mailto:${licensedUser?.email}"></a> if you have any questions or if you are interested in developing any specific Change Management skills.</p>
                <p>All the best for your organisational Change Management projects!</p>
                <p>Sincerely,</p>
                <p>The ChangeVerve Team.</p>
                </div>
            `
            return queueEmailWithPdfAttachment(
                {to: recipientEmail, email_content: introEmailContent,
                    htmlForPdf: PdfHtml, attachmentName: "results-pdf.pdf", queue_name: "send-completed-results", subject: "ChangeVerve Change Management Game Results" })
            // return queueEmail({to: recipientEmail, email_content: htmlEmailContent, subject: `ChangeVerve Change Management Game Results`, queue_name: `send-completed-results`})
        },

        sendResetEmail(recipientEmail: string, content: string): Promise<void> {
            const htmlEmailContent = resetEmailTemplate(content)
            return queueEmail({to: recipientEmail, email_content: htmlEmailContent, subject: `Reset Email`, queue_name: `send-reset-email`})
        },

        async sendCompletedEmailToCoordinator(recipientEmail: string, name: string, email: string, administrator_email: string, team_name: string): Promise<void> {
            const template = await completedEmailToCoordinator(name, email, administrator_email, team_name)
            return queueEmail({to: recipientEmail,
                subject: "User completed the ChangeVerve Change Management Game", queue_name: "completed-email-coordinator", email_content: template })
        },

        sendReminderEmailToCoordinator(recipientEmail: string, emails, expiry, administratorEmail: string): Promise<void> {
            const template = reminderEmailToCoordinator(emails, expiry, administratorEmail)
            return queueEmail({
                to: recipientEmail,
                subject: "ChangeVerve Change Management Game",
                queue_name: "reminder-email-coordinator",
                email_content: template
            })
        },

        sendAllCompletedEmails(recipientEmail: string, company_name: string): Promise<void> {
            const template = allCompletedEmails(company_name)
            return queueEmail({
                to: recipientEmail,
                subject: "User completed the ChangeVerve Change Management Game",
                queue_name: "completed-emails",
                email_content: template
            })
        },

        sendInvoiceEmail(recipientEmail: string, name:string, date:string, orderNumber:string, total:number, qty:number, token: string): Promise<void> {
            const template = invoiceTemplate(name, orderNumber,date, total, qty, token )
            return queueEmail({
                to: recipientEmail,
                subject: "Invoice",
                queue_name: "invoice-emails",
                email_content: template
            })
        },

        sendFormInvoiceEmail(recipientEmail: string, name:string, date:string, orderNumber:string, total:number, qty:number, url: string): Promise<void> {
            const template = formInvoiceEmail(name, orderNumber,date, total, qty, url )
            return queueEmail({
                to: recipientEmail,
                subject: "Invoice",
                queue_name: "form-invoice-emails",
                email_content: template
            })
        },

        async sendPaymentLink(email: string, plan: string, total: number, transaction_number: string, payment_link: string): Promise<void> {
            const template = paymentLink(email, plan, total, transaction_number, payment_link)

            return queueEmail({
                to: email,
                subject: "Payment Link",
                queue_name: "payment-link",
                email_content: template
            })
        }
    }
}
