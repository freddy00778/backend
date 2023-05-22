import {TeamUser} from "../../../data/teamUser/TeamUserData";
import LicenseHandlers from "../../../data/license/LicenseHandlers";
import TeamUserHandlers from "../../../data/teamUser/TeamUserHandlers";
import TeamHandlers from "../../../data/teams/TeamHandlers";

export const processAllCompletedNotificationsToAdministrator = async (data, sendMail: EmailService) => {
    const licenses = await (await LicenseHandlers.create(data)).getAll();
    console.log(licenses);

    for (const license of licenses) {
        const teamHandlers = await TeamHandlers.create(data);
        const team = await teamHandlers.getById({ license: license?.id });

        console.log("Team from team", team)

        if (isActive(license?.expiry)) {
            const teamUserHandlers = await TeamUserHandlers.create(data);
            const teamMembers = await teamUserHandlers.getTeamMembers(team?.id);
            console.log("License expiry", license?.expiry)
            const uniqueTeamEmails = [...new Set(teamMembers.map((member) => member?.email))];
            console.log(uniqueTeamEmails);

            const completedMembers = []
            const onlyEmails = []
            for (const teamMember of teamMembers){
                console.log("uncompleted team member ", teamMember)
                //@ts-ignore
                onlyEmails.push(teamMember?.email)

                if (teamMember.completed){
                    console.log("completed team member", teamMember)
                    //@ts-ignore
                    completedMembers.push(teamMember)
                    //@ts-ignore
                    onlyEmails.push(teamMember?.email)
                }

                console.log("Emails from Admin", onlyEmails.join("-"))
            }

            const uniqueCompletedEmails: TeamUser[] = [...new Set(completedMembers)]
            if (uniqueTeamEmails.length == uniqueCompletedEmails.length){

                for (const completedMember of uniqueCompletedEmails){
                    try{
                        sendMail.sendAllCompletedEmails(completedMember.email, completedMember.company_name)
                    }catch (e) {
                        console.log("e", e)
                    }
                }
            }

            onlyEmails.length = 0

            await (await TeamHandlers.create(data)).update({id: team?.id, completed: true})
        }
    }
};


    // export const processAllCompletedNotificationsToAdministrator = async (data, sendMail: EmailService) => {
    //     const licenses = await (await LicenseHandlers.create(data)).getAll();
    //     console.log(licenses);
    //
    //     for (const license of licenses) {
    //         console.log("License expiry", license.expiry)
    //
    //         if (isActive(license.expiry)) {
    //             try {
    //                 const teamHandlers = await TeamHandlers.create(data);
    //                 const team = await teamHandlers.getById({license: license?.id});
    //                 const teamUserHandlers = await TeamUserHandlers.create(data);
    //                 const teamMembers = await teamUserHandlers.getTeamMembers(team?.id);
    //                 const uniqueTeamEmails = [...new Set(teamMembers.map((member) => member?.email))];
    //                 console.log(uniqueTeamEmails);
    //
    //                 const completedMembers = []
    //                 const onlyEmails = []
    //                 for (const teamMember of teamMembers) {
    //                     console.log("uncompleted team member ", teamMember)
    //                     //@ts-ignore
    //                     onlyEmails.push(teamMember.email)
    //
    //                     if (teamMember.completed) {
    //                         console.log("completed team member", teamMember)
    //                         //@ts-ignore
    //                         completedMembers.push(teamMember)
    //                         //@ts-ignore
    //                         onlyEmails.push(teamMember.email)
    //                     }
    //
    //                     console.log("Emails from Admin", onlyEmails.join("-"))
    //                 }
    //
    //                 const uniqueCompletedEmails: TeamUser[] = [...new Set(completedMembers)]
    //                 if (uniqueTeamEmails.length == uniqueCompletedEmails.length) {
    //
    //                     for (const completedMember of uniqueCompletedEmails) {
    //                         sendMail.sendAllCompletedEmails(completedMember.email, completedMember.company_name)
    //                     }
    //                 }
    //
    //                 // onlyEmails.length = 0
    //
    //             // }catch (e) {
    //                 console.log(e)
    //             }
    //
    //         }
    //     }
    // };



const isActive = (licenseExpiry) => {
    const currentDate = new Date();
    const desiredDate = new Date(licenseExpiry);
    return currentDate <= desiredDate;
};

