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
exports.processCoordinatorReminderEmail = void 0;
const LicenseHandlers_1 = __importDefault(require("../../../data/license/LicenseHandlers"));
const TeamHandlers_1 = __importDefault(require("../../../data/teams/TeamHandlers"));
const TeamUserHandlers_1 = __importDefault(require("../../../data/teamUser/TeamUserHandlers"));
const UserHandlers_1 = __importDefault(require("../../../data/users/UserHandlers"));
const processCoordinatorReminderEmail = (data, sendMail) => __awaiter(void 0, void 0, void 0, function* () {
    const licenses = yield (yield LicenseHandlers_1.default.create(data)).getAll();
    console.log(licenses);
    for (const license of licenses) {
        if (isActive(license.expiry)) {
            const teamHandlers = yield TeamHandlers_1.default.create(data);
            const team = yield teamHandlers.getById({ license: license.id });
            const teamUserHandlers = yield TeamUserHandlers_1.default.create(data);
            const teamMembers = yield teamUserHandlers.getTeamMembers(team.id);
            const uniqueTeamEmails = [...new Set(teamMembers.map((member) => member.email))];
            console.log(uniqueTeamEmails);
            const coordinatorEmail = team.contact_email;
            const shouldSendReminder = uniqueTeamEmails.some((email) => !isTeamMemberStartedOrCompleted(teamMembers, email));
            if (shouldSendReminder) {
                // if (shouldSendReminder && coordinatorEmail === "frederickankamah988+2@gmail.com") {
                const userHandlers = yield UserHandlers_1.default.create(data);
                const user = yield userHandlers.getUser({ id: license === null || license === void 0 ? void 0 : license.user });
                //@ts-ignore
                sendMail.sendReminderEmailToCoordinator(coordinatorEmail, uniqueTeamEmails, license.expiry, user === null || user === void 0 ? void 0 : user.email);
            }
            console.log("Contact email", coordinatorEmail);
        }
    }
});
exports.processCoordinatorReminderEmail = processCoordinatorReminderEmail;
const isActive = (licenseExpiry) => {
    const currentDate = new Date();
    const desiredDate = new Date(licenseExpiry);
    return currentDate <= desiredDate;
};
const isTeamMemberStartedOrCompleted = (teamMembers, email) => {
    const member = teamMembers.find((member) => member.email === email);
    return (member === null || member === void 0 ? void 0 : member.isStarted) || (member === null || member === void 0 ? void 0 : member.completed);
};
//# sourceMappingURL=processCoordinatorReminderEmail.js.map