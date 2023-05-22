import {DataProvider} from "../../../data";
import TeamHandlers from "../../../data/teams/TeamHandlers";

// @ts-ignore
export const userReminderEmail = async(content, id, sign_off, expiry, to, user, license_id ) => {
    const date = new Date(expiry);
    const mainDate = date.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'})
    const data = await DataProvider.create()
    const teams = await (await TeamHandlers.create(data)).getAll(license_id)

    // @ts-ignore
    const team = teams.length > 0 ? teams[0] : ""

    const html = ` 
       <div>
             <p>Good day,&nbsp;</p>
        </div>
        
      <div>
        <p>This is a reminder to log&nbsp;in to the&nbsp;ChangeVerve&nbsp;Change Management Game&nbsp;to complete your online game.&nbsp;&nbsp;</p>
      </div>
  
        <div>
            <p>You are required to complete the&nbsp;game by &nbsp;&nbsp;${mainDate}&nbsp;</p>
        </div>
        <div>
            <p>The game offers flexibility in terms of playtime, allowing for either a single extended session lasting approximately 6 to 8 hours, or multiple shorter intervals that fit within your schedule. Your progress will be tracked and saved, allowing you to resume play at the point where you last left off upon your return.&nbsp;</p>
        </div>  
      
        <div>
            <p><strong>REGISTRATION AND&nbsp;LOGIN:&nbsp;</strong></p>
        </div>
        
        <div>
            <p>If you have a&nbsp;ChangeVerve&nbsp;account, please log&nbsp;in with your username and password to access the&nbsp;ChangeVerve&nbsp;Change Management Game.&nbsp;</p>
        </div>
        
        <div>
            <p>If you are a first-time user of ChangeVerve products, kindly follow the registration steps below.&nbsp;</p>
        </div>
     
        <p><strong>Steps to register for the game: </strong></p>
        <p><strong>Step 1</strong>: &nbsp;CLICK on the following link to access the game platform: &nbsp; https://changeverveacademy.com/invitee-register/${user} &nbsp;</p>
 
        <p><strong>Step 2</strong>: &nbsp;Enter your name, surname and email address in the fields provided. <span style="color: red">NB: Use the email address on which you received this email.</span></p>
             
        <p><strong>Step 3</strong>:  Create a password and CLICK on the “REGISTER” button.&nbsp;</p>
               
        <p><strong>Step 4</strong>:  Log in using your email and password on the login screen to go to your ChangeVerve Academy dashboard. &nbsp;</p>
             
        <p><strong>Step 5:</strong>  CLICK on the tile indicating the ChangeVerve Change Management Game for your team to start playing.</p>
               
        <p>For future login after registration, use the following link to access the game. https://changeverveacademy.com &nbsp;</p>
       
        <p>
        The game offers flexibility in terms of playtime, allowing for either a single extended session lasting approximately 6 to 8 hours, 
        or multiple shorter intervals that fit within your schedule. Your progress will be tracked and saved, 
        allowing you to resume play at the point where you last left off upon your return.
        </p>
        
        <p><strong>Your organisation requires you to complete the game by close of business ${mainDate}.</strong></p>
        
        <p>Should you have any difficulty logging in, kindly contact your Team Coordinator at ${team?.contact_email}.</p>
        
        <p>Good luck and enjoy the experience!</p>
           <br/>
        <p>Sincerely,&nbsp;</p>
        <p>The ChangeVerve team</p>
    `
    return html
}
