
interface EmailService {
    sendWelcomeEmail: (recipientEmail: string, content: string, sign_off: string, expiry: string, user: string, license_id, id ) => Promise<void>;
    confirmationEmailToAdmin: (adminEmail: string, no_of_purchases: number) => Promise<void>;
    confirmationEmailToCoordinator: (coordinatorEmail: string, team_name: string, expiry: string, administrator_email: string) => Promise<void>;
    sendUserReminderEmail: (recipientEmail: string, content: string, id: string, sign_off: string, expiry: string, user:string, license_id: string) => Promise<void>;
    sendCompletedResults: (recipientEmail: string, user_id: string, game_id: string, license_id: string) => Promise<void>;
    sendResetEmail: (recipientEmail: string, content: string) => Promise<void>;
    sendCompletedEmailToCoordinator: (recipientEmail: string, name: string, email: string, administrator_email: string, team_name: string) => Promise<void>;
    sendReminderEmailToCoordinator: (recipientEmail: string, emails: string[], expiry: string, administratorEmail: string) => Promise<void>;
    sendAllCompletedEmails: (recipientEmail: string, compnay_name: string) => Promise<void>;
    sendInvoiceEmail: (recipientEmail: string, name:string, date:string, orderNumber:string, total:number, qty:number, token: string) => Promise<void>;
    coordinatorRegistrationEmail: (coordinatorEmail: string, team_name, expiry, user_id) => Promise<void>;
    sendPaymentLink: (email: string, plan: string, total: number, transaction_number: string, payment_link: string) => Promise<void>;

}
