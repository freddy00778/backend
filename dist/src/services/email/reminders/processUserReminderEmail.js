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
exports.processUserReminderEmail = void 0;
const UserLicenseHandlers_1 = __importDefault(require("../../../data/userLicense/UserLicenseHandlers"));
// import {userReminderEmail} from "../templates/userReminderEmail";
const processUserReminderEmail = (data, sendMail) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (yield UserLicenseHandlers_1.default.create(data)).getUserLicenses();
    for (const user of users) {
        if (isActive(user.expiry)) {
            console.log("users", users);
            const content = "";
            const id = user.userId;
            const sign_off = "";
            const expiry = user.expiry;
            const recipientEmail = user.email;
            const license_id = user.license;
            // if (user.email === "frederickankamah988+3@gmail.com") {
            // @ts-ignore
            try {
                // const template = await userReminderEmail(content, id, sign_off, expiry, recipientEmail, id, license_id)
                sendMail.sendUserReminderEmail(recipientEmail, content, id, sign_off, expiry, id, license_id);
            }
            catch (e) {
                console.log("e", e);
            }
            // }
        }
    }
});
exports.processUserReminderEmail = processUserReminderEmail;
const isActive = (licenseExpiry) => {
    const currentDate = new Date();
    const desiredDate = new Date(licenseExpiry);
    return currentDate <= desiredDate && true;
};
//# sourceMappingURL=processUserReminderEmail.js.map