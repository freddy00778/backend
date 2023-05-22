"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatorSetUpEmail = void 0;
const coordinatorSetUpEmail = (team_name, expiry, administrator_email) => {
    const date = new Date(expiry);
    const mainDate = date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
    return `
    <div>
    <p>Dear&nbsp;Team Coordinator,&nbsp;</p>
</div>
<div>
    <p>You have been nominated to be the team coordinator for ${team_name}&nbsp;who will be playing the&nbsp;ChangeVerve&nbsp;Change Management Game.&nbsp;&nbsp;</p>
</div>
<div>
    <p>All the members of this team have received their registration emails and are required to complete the game by ${mainDate}</p>
</div>

<div>
    <p>You will receive automated reminders at intervals specified by your organisation&rsquo;s game administrator&nbsp;of team members who have not completed the game.&nbsp;Please reach out to these team members to ensure they complete the game by the deadline.&nbsp;&nbsp;</p>
</div>

<div>
    <p>You will be notified&nbsp;via email each time a member completes the game.&nbsp;</p>
</div>

<div>
    <p>Please contact&nbsp;your&nbsp;Administrator&nbsp;at ${administrator_email} for any additional requirements or questions.&nbsp;</p>
</div>

<div>
    <p>Sincerely,&nbsp;</p>
</div>
<div>
    <p>The ChangeVerve Team&nbsp;</p>
</div>
    `;
};
exports.coordinatorSetUpEmail = coordinatorSetUpEmail;
//# sourceMappingURL=coordinatorSetUpEmail.js.map