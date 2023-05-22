import LicenseHandlers from "../../../data/license/LicenseHandlers";
import TeamHandlers from "../../../data/teams/TeamHandlers";
import TeamUserHandlers from "../../../data/teamUser/TeamUserHandlers";
import UserHandlers from "../../../data/users/UserHandlers";

export const processCoordinatorReminderEmail = async (data, sendMail: EmailService) => {
    const licenses = await (await LicenseHandlers.create(data)).getAll();
    console.log(licenses);

    for (const license of licenses) {
        if (isActive(license.expiry)) {
            const teamHandlers = await TeamHandlers.create(data);
            const team = await teamHandlers.getById({ license: license.id });
            const teamUserHandlers = await TeamUserHandlers.create(data);
            const teamMembers = await teamUserHandlers.getTeamMembers(team.id);
            const uniqueTeamEmails = [...new Set(teamMembers.map((member) => member.email))];
            console.log(uniqueTeamEmails);

            const coordinatorEmail = team.contact_email;
            const shouldSendReminder = uniqueTeamEmails.some(
                (email) => !isTeamMemberStartedOrCompleted(teamMembers, email)
            );

            if (shouldSendReminder) {
            // if (shouldSendReminder && coordinatorEmail === "frederickankamah988+2@gmail.com") {
                const userHandlers = await UserHandlers.create(data);
                const user = await userHandlers.getUser({ id: license?.user });
                //@ts-ignore
                sendMail.sendReminderEmailToCoordinator(coordinatorEmail, uniqueTeamEmails, license.expiry, user?.email);
            }
            console.log("Contact email", coordinatorEmail);
        }
    }
};

const isActive = (licenseExpiry) => {
    const currentDate = new Date();
    const desiredDate = new Date(licenseExpiry);
    return currentDate <= desiredDate;
};

const isTeamMemberStartedOrCompleted = (teamMembers, email) => {
    const member = teamMembers.find((member) => member.email === email);
    return member?.isStarted || member?.completed;
};
