"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAllCompletedNotificationsToAdministrator = void 0;
const LicenseHandlers_1 = __importDefault(require("../../../data/license/LicenseHandlers"));
const TeamUserHandlers_1 = __importDefault(require("../../../data/teamUser/TeamUserHandlers"));
const TeamHandlers_1 = __importDefault(require("../../../data/teams/TeamHandlers"));
const processAllCompletedNotificationsToAdministrator = (data, sendMail) => __awaiter(void 0, void 0, void 0, function* () {
    const licenses = yield (yield LicenseHandlers_1.default.create(data)).getAll();
    console.log(licenses);
    for (const license of licenses) {
        const teamHandlers = yield TeamHandlers_1.default.create(data);
        const team = yield teamHandlers.getById({ license: license === null || license === void 0 ? void 0 : license.id });
        console.log("Team from team", team);
        if (isActive(license === null || license === void 0 ? void 0 : license.expiry)) {
            const teamUserHandlers = yield TeamUserHandlers_1.default.create(data);
            const teamMembers = yield teamUserHandlers.getTeamMembers(team === null || team === void 0 ? void 0 : team.id);
            console.log("License expiry", license === null || license === void 0 ? void 0 : license.expiry);
            const uniqueTeamEmails = [...new Set(teamMembers.map((member) => member === null || member === void 0 ? void 0 : member.email))];
            console.log(uniqueTeamEmails);
            const completedMembers = [];
            const onlyEmails = [];
            for (const teamMember of teamMembers) {
                console.log("uncompleted team member ", teamMember);
                //@ts-ignore
                onlyEmails.push(teamMember === null || teamMember === void 0 ? void 0 : teamMember.email);
                if (teamMember.completed) {
                    console.log("completed team member", teamMember);
                    //@ts-ignore
                    completedMembers.push(teamMember);
                    //@ts-ignore
                    onlyEmails.push(teamMember === null || teamMember === void 0 ? void 0 : teamMember.email);
                }
                console.log("Emails from Admin", onlyEmails.join("-"));
            }
            const uniqueCompletedEmails = [...new Set(completedMembers)];
            if (uniqueTeamEmails.length == uniqueCompletedEmails.length) {
                for (const completedMember of uniqueCompletedEmails) {
                    try {
                        sendMail.sendAllCompletedEmails(completedMember.email, completedMember.company_name);
                    }
                    catch (e) {
                        console.log("e", e);
                    }
                }
            }
            onlyEmails.length = 0;
            yield (yield TeamHandlers_1.default.create(data)).update({ id: team === null || team === void 0 ? void 0 : team.id, completed: true });
        }
    }
});
exports.processAllCompletedNotificationsToAdministrator = processAllCompletedNotificationsToAdministrator;
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
//# sourceMappingURL=processAllCompletedNotificationsToAdministrator.js.map