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
exports.TeamProcess = void 0;
const CompanyHandlers_1 = __importDefault(require("../../data/company/CompanyHandlers"));
const DataProvider_1 = __importDefault(require("../../data/DataProvider"));
const TeamHandlers_1 = __importDefault(require("../../data/teams/TeamHandlers"));
const SendEmail_1 = require("../email/SendEmail");
const LicenseHandlers_1 = __importDefault(require("../../data/license/LicenseHandlers"));
const UserHandlers_1 = __importDefault(require("../../data/users/UserHandlers"));
const UserLicenseHandlers_1 = __importDefault(require("../../data/userLicense/UserLicenseHandlers"));
const TeamUserHandlers_1 = __importDefault(require("../../data/teamUser/TeamUserHandlers"));
function TeamProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield DataProvider_1.default.create();
        const emailService = (0, SendEmail_1.SendEmail)();
        return {
            createCompany(company_name, company_function, company_size, company_industry) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (yield CompanyHandlers_1.default.create(data)).create({
                        name: company_name,
                        industry: company_industry,
                        function_unit: company_function,
                        sizeGroup: company_size
                    });
                });
            },
            createTeam(input) {
                return __awaiter(this, void 0, void 0, function* () {
                    const team = yield (yield TeamHandlers_1.default.create(data)).create(input);
                    return team;
                });
            },
            addEmailInfo(id, email_message, sign_off) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield (yield TeamHandlers_1.default.create(data)).update({ id, email_message, sign_off });
                });
            },
            addMembers(memberEmail, license, team_id, expiry_date) {
                return __awaiter(this, void 0, void 0, function* () {
                    const userObject = yield (yield UserHandlers_1.default.create(data)).getEmail(memberEmail);
                    const insertedUser = userObject ? userObject : yield (yield UserHandlers_1.default.create(data)).create({ email: memberEmail });
                    yield (yield UserLicenseHandlers_1.default.create(data)).create({ license, user: insertedUser.id });
                    const teamUser = yield (yield TeamUserHandlers_1.default.create(data)).create({ user: insertedUser === null || insertedUser === void 0 ? void 0 : insertedUser.id, team: team_id });
                    yield (yield TeamHandlers_1.default.create(data)).update({ id: team_id, expiry_date: expiry_date });
                    const team = yield (yield TeamHandlers_1.default.create(data)).getById({ id: team_id });
                    const no_of_members = (team === null || team === void 0 ? void 0 : team.no_of_members) ? (team === null || team === void 0 ? void 0 : team.no_of_members) + 1 : 0;
                    const count = yield (yield TeamHandlers_1.default.create(data)).update({ id: team_id, no_of_members });
                    return {
                        license,
                        memberEmail,
                        count,
                        teamUser
                    };
                });
            },
            sendCoordinatorEmail(license, contact_email, team_name) {
                return __awaiter(this, void 0, void 0, function* () {
                    const licenseObject = yield (yield LicenseHandlers_1.default.create(data)).getById(license);
                    const administratorObject = yield (yield UserHandlers_1.default.create(data)).getUser({ id: licenseObject.user });
                    emailService.confirmationEmailToCoordinator(contact_email, team_name, licenseObject === null || licenseObject === void 0 ? void 0 : licenseObject.expiry, administratorObject === null || administratorObject === void 0 ? void 0 : administratorObject.email);
                });
            }
        };
    });
}
exports.TeamProcess = TeamProcess;
//# sourceMappingURL=TeamProcess.js.map