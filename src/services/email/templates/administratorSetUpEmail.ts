 export const administratorSetUpEmail = (no_of_purchases: number) => {
    return `
<html xmlns="http://www.w3.org/1999/xhtml">

<div>
    <p>Dear&nbsp;Administrator,&nbsp;<br>&nbsp;
    <br>Welcome to the&nbsp;ChangeVerve&nbsp;Academy.&nbsp;
    Your organisation purchased ${no_of_purchases}&nbsp;ChangeVerve&nbsp;Change Management Game&nbsp;licenses. 
    You have been nominated as the&nbsp;Administrator for this&nbsp;group.&nbsp;</p>
</div>
<div>
    <p>You are required to register as the&nbsp;Administrator to access the Administrator&rsquo;s Console.&nbsp;In the&nbsp;Administrator&apos;s Console,&nbsp;you are required to&nbsp;
    set up and administer individual&nbsp;users&rsquo; access to the online&nbsp;game, check&nbsp;and track&nbsp;the&nbsp;registration&nbsp;status&nbsp;and progress&nbsp;of&nbsp;each&nbsp;user, and view&nbsp;your license usage and account information.&nbsp;If&nbsp;the&nbsp;licenses&nbsp;will be distributed across multiple teams, you will be able to assign a&nbsp;Team&nbsp;Coordinator,&nbsp;per team,&nbsp;to&nbsp;assist with&nbsp;the&nbsp;coordination of&nbsp;completion.&nbsp;&nbsp;</p>
</div>
<div>
    <p>To access the Administrator Console and set up your password, simply click the&nbsp;following&nbsp;link:&nbsp;<br> https://changeverveacademy.com</p>
</div>
<div>
    <p>PLEASE NOTE THE FOLLOWING IMPORTANT INFORMATION:&nbsp;</p>
</div>
<div>
    <div>
        <ul>
            <li>
                <p>The Administrator link to&nbsp;load users&nbsp;onto the system&nbsp;is valid for&nbsp;12 months&nbsp;from the date of purchase.&nbsp;&nbsp;</p>
            </li>
        </ul>
    </div>
 
    <div>
        <ul>
            <li>
                <p>The&nbsp;${no_of_purchases}&nbsp;licensed users&nbsp;will only be able to access the game once you have completed the set-up on the Administrator Console.&nbsp;&nbsp;</p>
            </li>
        </ul>
    </div>
 
    <div>
        <ul>
            <li>
                <p>You will be&nbsp;able to schedule the&nbsp;deadline for users to&nbsp;complete the game&nbsp;in the Administrator Console during the set-up.&nbsp;This&nbsp;deadline&nbsp;cannot exceed&nbsp;6 months from the date of the user set-up.&nbsp;&nbsp;</p>
            </li>
        </ul>
    </div>
</div>
<div>
   
    <div>
        <ul>
            <li>
                <p>Please consult your internal IT support to ensure that Changeverveacademy.com website will be accessible to all users and not blocked by your organisation&rsquo;s firewall or other security measures.&nbsp;</p>
            </li>
        </ul>
    </div>
 
    <div>
        <p>Contact us&nbsp;at&nbsp;<a href="mailto:support@changeverve.co.za" rel="noreferrer noopener" target="_blank">support@changeverve.co.za</a> if you require any further assistance.&nbsp;&nbsp;</p>
    </div>
 
</div>
<div>
    <p>Sincerely,&nbsp;<br>ChangeVerve&nbsp;Support Team&nbsp;</p>
</div>
<div>
    <p>support@changeverve.co.za&nbsp;</p>
</div>
</html>
    `
 }