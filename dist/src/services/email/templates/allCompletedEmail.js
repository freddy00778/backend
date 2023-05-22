"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allCompletedEmails = void 0;
const allCompletedEmails = (company_name) => {
    return `
        <div>
    <p>Dear&nbsp;Administrator,&nbsp;</p>
        </div>

<div>
    <p>This is an automated&nbsp;notification that&nbsp;all the&nbsp;users&nbsp;invited to complete the&nbsp;ChangeVerve&nbsp;Change Management Game&nbsp;for&nbsp;${company_name}&nbsp;have&nbsp;completed the game.&nbsp;</p>
</div>

<div>
    <p>A comprehensive report is available on the Administrator Console with user completion details and final scores.&nbsp;&nbsp;</p>
</div>

<div>
    <p>Please contact us if you have any questions or if you are interested in discussing the options to develop Change Management capability within your organisation.&nbsp;&nbsp;</p>
</div>

<div>
    <p>Sincerely,&nbsp;</p>
</div>
<div>
    <p>The&nbsp;ChangeVerve&nbsp;Team&nbsp;</p>
</div>
<div>
    <p>support@changeverve.co.za&nbsp;</p>
</div>
    `;
};
exports.allCompletedEmails = allCompletedEmails;
//# sourceMappingURL=allCompletedEmail.js.map