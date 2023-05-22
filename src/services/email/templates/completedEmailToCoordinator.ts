export const completedEmailToCoordinator = (name, email, administrator_email, team_name) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();

    return `<div>
    <p>Dear&nbsp;Team Coordinator,&nbsp;</p>
</div>
<div>
</div>
<div>
    <p>This is an automated&nbsp;notification&nbsp;that the following user from ${team_name} has completed the&nbsp;ChangeVerve&nbsp;Change Management Game.&nbsp;</p>
</div>
<div>
</div>
<div>
    <p>${name}&nbsp;with email address:&nbsp;<a href=${email} rel="noreferrer noopener" target="_blank">${email}</a> completed the game&nbsp;on ${formattedDate}).&nbsp;&nbsp;<br>&nbsp;</p>
</div>
<div>
    <p>If you have any&nbsp;queries,&nbsp;please contact&nbsp;your&nbsp;Administrator on&nbsp; ${administrator_email}&nbsp;</p>
</div>
<div>
    <p>Sincerely,&nbsp;</p>
</div>
<div>
    <p>The ChangeVerve Team&nbsp;</p>
</div>`
}