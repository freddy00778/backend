export const reminderEmailToCoordinator = ( emails: string[], expiry: string, administratorEmail) => {
    const date = new Date(expiry);
    const mainDate = date.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'})
    return `
    <div>
    <div>
        <p>Dear&nbsp;Team Coordinator,&nbsp;</p>
    </div>
   
    <div>
        <p>This is an automated&nbsp;confirmation&nbsp;of&nbsp;reminders sent to the&nbsp;users invited to play the&nbsp;ChangeVerve&nbsp;Change Management Game&nbsp;and who have not&nbsp;yet&nbsp;logged in&nbsp;or completed the game&nbsp;from&nbsp;Group Name.&nbsp;(team&nbsp;name)&nbsp;</p>
    </div>
   
    <div>
        <p>Reminders were sent on&nbsp;${expiry}&nbsp;to the following&nbsp;users:&nbsp;</p>
    </div>
    <div>
        <p>
        ${emails.join("\n\n")}
    </div>
   
    <div>
        <p>The deadline for this group to complete the game is&nbsp;${mainDate}&nbsp;</p>
    </div>
  
    <div>
        <p>Contact your game Administrator at&nbsp; ${administratorEmail},if you have any questions.&nbsp;</p>
    </div>
 
    <div>
        <p>Sincerely,&nbsp;</p>
    </div>
    <div>
        <p>The ChangeVerve Team&nbsp;</p>
    </div>
</div>
    `
}