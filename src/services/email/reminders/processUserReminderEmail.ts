import UserLicenseHandlers from "../../../data/userLicense/UserLicenseHandlers";
// import {userReminderEmail} from "../templates/userReminderEmail";

export const processUserReminderEmail = async (data, sendMail: EmailService) => {
    const users = await (await UserLicenseHandlers.create(data)).getUserLicenses()
    for(const user of users){
        if (isActive(user.expiry)){
            console.log("users", users)

            const content = ""
            const id = user.userId
            const sign_off = ""
            const expiry = user.expiry
            const recipientEmail : string = user.email
            const license_id = user.license

            // if (user.email === "frederickankamah988+3@gmail.com") {
                // @ts-ignore
            try{
                // const template = await userReminderEmail(content, id, sign_off, expiry, recipientEmail, id, license_id)
                sendMail.sendUserReminderEmail(recipientEmail,content, id, sign_off, expiry,id, license_id)

            }catch (e) {
                console.log("e", e);
            }
            // }

        }
    }
}

const isActive = (licenseExpiry) => {
    const currentDate = new Date();
    const desiredDate = new Date(licenseExpiry);
    return currentDate <= desiredDate && true
}