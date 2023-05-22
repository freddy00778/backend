"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatorRegistrationEmail = void 0;
const coordinatorRegistrationEmail = (team_name, expiry, user_id) => {
    const date = new Date(expiry);
    // @ts-ignore
    const mainDate = date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
    const baseURL = process.env.NODE_ENV === 'staging'
        ? `http://localhost:3000`
        : 'https://changeverveacademy.com';
    return `
   
   <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome to ChangeVerve Academy</title>
  </head>
  <body>
    <p>Dear Coordinator,</p>
    <p>Welcome to the ChangeVerve Academy. Your organisation purchased ChangeVerve Change Management Game licenses. You have been nominated as the Team Coordinator for the following team/s:</p>
    <ul>
      <li>${team_name}</li>
    </ul>
    <p>You are required to register as the Team Coordinator to access the Administrator’s Console.
     In the Administrator's Console, you are required to set up and administer individual users’ access to the online game, 
     check and track the registration status and progress of each user and schedule automated reminders. 
     You will be able to resend user invitation, reminders and results if required.</p>
    <p>To access the Administrator Console and create your password, simply click the following link:</p>
    <a href=${baseURL}/invitee-register/${user_id}>Register</a>
    <p>PLEASE NOTE THE FOLLOWING IMPORTANT INFORMATION:</p>
    <ul>
      <li>To set-up a team you will be required to upload the users’ email addresses onto the system. Bulk email uploads are possible.</li>
      <li>The deadline for the completion of the game has been specified by your organisation’s Administrator.</li>
      <li>If no deadline has been specified, the users will have 6 months from the date of the team set-up to complete the game. If the user does not complete the game within 6 months of set-up, the license will automatically expire.</li>
    </ul>
    <p>Contact us at <a href="mailto:support@changeverveacademy.com">support@changeverveacademy.com</a> if you require any further assistance.</p>
    <p>Sincerely,<br>ChangeVerve Support Team<br><a href="mailto:support@changeverveacademy.com">support@changeverveacademy.com</a></p>
  </body>
</html>
    `;
};
exports.coordinatorRegistrationEmail = coordinatorRegistrationEmail;
//# sourceMappingURL=coordinatorRegistrationEmail.js.map