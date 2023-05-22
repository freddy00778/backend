"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assessmentsEmailTemplate = void 0;
// @ts-ignore
const assessmentsEmailTemplate = (content, id, sign_off, expiry, to, user, token) => {
    const date = new Date(expiry);
    console.log(date.toLocaleString());
    const html = ` 
        <p>Good day,</p>
        <p><br></p>
        <p> You have been invited by xxx to play the ChangeVerve Change Management Game. 
        An online game that takes you on a journey through the typical decisions, events and challenges faced when organisations implement major change projects.&nbsp;</p>
     
        <p style="font-weight: 400;"> ${content} </p>    
     
        <p>Please follow the steps below to register for the game:</p>
        <p>Step 1: &nbsp;CLICK on the following link to access the game platform: &nbsp; https://changeverveacademy.com/invitee-register/${user} &nbsp;</p>
        <p>Step 2: &nbsp;Enter your name, surname and email address in the fields provided. NB: Use the email address on which you received this email.</p>
        <p>Step 3: CLICK on the &ldquo;START&rdquo; button to start playing.&nbsp;</p>
        <p>For future login after registration, use the following link to access the game. https://changeverveacademy.com &nbsp;</p>
        <p>The game can be played in one sitting, which will take approximately 6 &ndash; 8 hours, or it can be played in intervals, depending on your time availability. The game will record your progress and allow you to start at the point that you left off when logging out.&nbsp;</p>
        <p><br></p>
        <p>Your organisation requires you to complete the game by close of business ${date}.</p>
        <p>
        <br>
        </p>
<!--        <p>Should you have any difficulty logging in, kindly contact your administrator on xxxx. (add administrator email)</p>-->
        <p>Should you have any difficulty logging in, kindly contact your administrator.</p>
        <p><br></p>
        <p>Good luck and enjoy the experience!</p>
        <p><br></p>
        <p>Sincerely,&nbsp;</p>
        <p>The ChangeVerve team</p>
        <p><br></p>
    `;
    return html;
};
exports.assessmentsEmailTemplate = assessmentsEmailTemplate;
//# sourceMappingURL=tokenEmail.js.map