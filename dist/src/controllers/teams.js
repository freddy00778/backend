"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCount = exports.downloadResults = exports.resendEmail = exports.sendEmails = exports.getTeamsByUser = exports.getTeamsChartData = exports.getTeams = exports.getTeamMembers = exports.getTeam = exports.getAll = exports.removeMember = exports.addMembers = exports.addMember = exports.update = exports.create = void 0;
const errors_1 = require("../errors");
const TeamService = __importStar(require("../services/teamService"));
// import {createCompany} from "../services/company"
const omit_1 = __importDefault(require("omit"));
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const UserHandlers_1 = __importDefault(require("../data/users/UserHandlers"));
const UserLicenseHandlers_1 = __importDefault(require("../data/userLicense/UserLicenseHandlers"));
const TeamHandlers_1 = __importDefault(require("../data/teams/TeamHandlers"));
const TeamUserHandlers_1 = __importDefault(require("../data/teamUser/TeamUserHandlers"));
const LicenseHandlers_1 = __importDefault(require("../data/license/LicenseHandlers"));
// import * as resultsEmailService from "../services/email/ResultsEmailService";
const resultsEmail_1 = require("../services/email/templates/resultsEmail");
const SendEmail_1 = require("../services/email/SendEmail");
const TeamProcess_1 = require("../services/teams/TeamProcess");
// import {TeamProcess} from "../services/teams/TeamProcess";
exports.create = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataProvider = yield DataProvider_1.default.create();
    //@ts-ignore
    const { companyObject, team_name, contact_email, team_size, teamObject, email_message, license } = req.body;
    const teamProcess = yield (0, TeamProcess_1.TeamProcess)();
    const company = yield teamProcess.createCompany(companyObject.company_name, companyObject.company_function.value, companyObject.company_size, companyObject.industry);
    const userHandler = yield (yield UserHandlers_1.default.create(dataProvider));
    const userExist = yield userHandler.getEmail(contact_email);
    const user = userExist ? userExist : yield userHandler.create({ email: contact_email, coordinator: true });
    //@ts-ignore
    const team = yield teamProcess.createTeam({
        name: team_name,
        contact_email: contact_email,
        sizeGroup: team_size,
        company: company === null || company === void 0 ? void 0 : company.id, license,
        coordinator_id: user === null || user === void 0 ? void 0 : user.id
    });
    if (user) {
        const sendEmail = (0, SendEmail_1.SendEmail)();
        yield sendEmail.coordinatorRegistrationEmail(user === null || user === void 0 ? void 0 : user.email, team_name, "", user === null || user === void 0 ? void 0 : user.id);
    }
    res.respond({
        companyObject,
        teamObj: team
    });
}));
exports.update = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield TeamService.updateTeam(req.body);
    res.respond({
        data: team
    });
}));
exports.addMember = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberEmail, license, team_id, company, expiry_date } = req.body;
    const data = yield DataProvider_1.default.create();
    const userBody = Object.assign(Object.assign({}, req.body), { email: memberEmail });
    const bodyObject = (0, omit_1.default)(["memberEmail", "license", "team_id", "company", "expiry_date"], userBody);
    const emailExists = yield (yield UserHandlers_1.default.create(data)).getEmail(memberEmail);
    // @ts-ignore
    const insertedUser = emailExists ? emailExists : yield (yield UserHandlers_1.default.create(data)).create(bodyObject);
    const userLicenseBody = Object.assign(Object.assign({}, req.body), { license, user: insertedUser.id });
    const userLicenseBodyObject = (0, omit_1.default)(["memberEmail", "team_id", "company", "expiry_date"], userLicenseBody);
    // @ts-ignore
    yield (yield UserLicenseHandlers_1.default.create(data)).create(userLicenseBodyObject);
    console.log("UserLicense Body Object", userLicenseBodyObject);
    const teamUserBody = Object.assign(Object.assign({}, req.body), { user: insertedUser.id, team: team_id });
    console.log("team body", teamUserBody);
    const teamUserBodyObject = (0, omit_1.default)(["memberEmail", "license", "team_id", "company", "id", "expiry_date"], teamUserBody);
    const teamUser = yield (yield TeamUserHandlers_1.default.create(data)).create(teamUserBodyObject);
    if (team_id) {
        yield (yield TeamHandlers_1.default.create(data)).update({ id: team_id, expiry_date: expiry_date });
    }
    console.log("Company license", `${license} - ${company}`);
    const count = yield TeamService.incrementMemberCount(data, license, company);
    res.respond({
        license,
        memberEmail,
        count,
        teamUser
    });
}));
exports.addMembers = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emails, team_id, content } = req.body;
    const data = yield DataProvider_1.default.create();
    const team = yield (yield TeamHandlers_1.default.create(data)).getById({ id: team_id });
    const licenseObject = yield (yield LicenseHandlers_1.default.create(data)).getById(team === null || team === void 0 ? void 0 : team.license);
    const userHandler = yield UserHandlers_1.default.create(data);
    const userLicenseHandler = yield UserLicenseHandlers_1.default.create(data);
    const emailService = (0, SendEmail_1.SendEmail)();
    for (const email of emails) {
        const emailExists = yield userHandler.getEmail(email);
        const insertedUser = emailExists ? emailExists : yield (yield UserHandlers_1.default.create(data)).create({
            email
        });
        const userLicenseExist = yield userLicenseHandler.get({ license: team === null || team === void 0 ? void 0 : team.license, user: insertedUser === null || insertedUser === void 0 ? void 0 : insertedUser.id });
        const userLicenseBody = { license: team === null || team === void 0 ? void 0 : team.license, user: insertedUser.id, isInvited: true };
        const userLicenseObject = userLicenseExist ? userLicenseExist : yield userLicenseHandler.create(userLicenseBody);
        const teamUserBody = {
            user: insertedUser.id,
            team: team_id
        };
        // console.log("team body", teamUserBody)
        const teamUserExists = yield (yield TeamUserHandlers_1.default.create(data)).getAll(teamUserBody);
        if ((teamUserExists === null || teamUserExists === void 0 ? void 0 : teamUserExists.length) < 1) {
            yield (yield TeamUserHandlers_1.default.create(data)).create(teamUserBody);
        }
        // if(userLicenseExist && !userLicenseExist.isInvited ){
        yield emailService.sendWelcomeEmail(email, content, "", licenseObject === null || licenseObject === void 0 ? void 0 : licenseObject.expiry, insertedUser.id, team === null || team === void 0 ? void 0 : team.license, userLicenseObject.id);
    }
    // await userLicenseHandler.update({id: userLicenseObject?.id, isInvited: true})
    // }
    res.respond({});
}));
exports.removeMember = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, license, company } = req.body;
    const data = yield DataProvider_1.default.create();
    const user = yield (yield UserHandlers_1.default.create(data)).getEmail(email);
    const userObject = user && (yield (yield UserLicenseHandlers_1.default.create(data)).delete(user === null || user === void 0 ? void 0 : user.id));
    console.log("user from teams", user);
    yield TeamService.decrementMemberCount(data, license, company, user);
    return res.respond({
        user,
        userObject,
        email
    });
}));
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license } = req.params;
    const data = yield DataProvider_1.default.create();
    const teams = yield (yield TeamHandlers_1.default.create(data)).getAll(license);
    res.respond({
        teams
    });
}));
exports.getTeam = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license } = req.params;
    const { type } = req.query;
    const data = yield DataProvider_1.default.create();
    const team = type && type === "id" ? yield (yield TeamHandlers_1.default.create(data)).getById({ id: license }) :
        yield (yield TeamHandlers_1.default.create(data)).getById({ license });
    res.respond({
        team
    });
}));
exports.getTeamMembers = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const teams = yield (yield TeamUserHandlers_1.default.create(data)).getTeamMembers(req.params.id);
    const uniqueMembers = Array.from(new Set(teams.map((a) => a.id))).map((id) => {
        return teams === null || teams === void 0 ? void 0 : teams.find((a) => a.id === id);
    });
    res.respond({
        data: uniqueMembers
    });
}));
exports.getTeams = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    const { coordinator } = req.query;
    console.log("Req id", user_id);
    const data = yield DataProvider_1.default.create();
    const teamUserHandler = (yield TeamUserHandlers_1.default.create(data));
    const teamHandler = yield TeamHandlers_1.default.create(data);
    const teams = coordinator ? yield teamHandler.getTeams({ coordinator_id: user_id }) : yield teamUserHandler.getAll({ user: user_id });
    res.respond({
        teams
    });
}));
exports.getTeamsChartData = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license } = req.query;
    console.log("Req id", license);
    const data = yield DataProvider_1.default.create();
    const teamUserHandler = (yield TeamUserHandlers_1.default.create(data));
    const teams = yield teamUserHandler.getAll({ license: license === null || license === void 0 ? void 0 : license.toString() });
    const groupedCounts = teams.reduce((accumulator, team) => {
        if (!accumulator[team.team]) {
            accumulator[team.team] = {
                isStartedTrueCount: 0,
                isStartedFalseCount: 0,
                isCompletedTrueCount: 0,
                uniqueUsers: new Set()
            };
        }
        // Skip if user is already counted
        if (accumulator[team.team].uniqueUsers.has(team.user)) {
            return accumulator;
        }
        accumulator[team.team].uniqueUsers.add(team.user);
        accumulator[team.team].isStartedTrueCount += team.isStarted ? 1 : 0;
        accumulator[team.team].isStartedFalseCount += !team.isStarted ? 1 : 0;
        accumulator[team.team].isCompletedTrueCount += team.completed ? 1 : 0;
        return accumulator;
    }, {});
    // Remove uniqueUsers sets and prepare the final groupedCounts object
    const finalGroupedCounts = {};
    for (const teamId in groupedCounts) {
        const _a = groupedCounts[teamId], { uniqueUsers } = _a, teamCounts = __rest(_a, ["uniqueUsers"]);
        finalGroupedCounts[teamId] = teamCounts;
    }
    console.log('Individual counts by team with unique users:', finalGroupedCounts);
    res.respond({
        teams,
        groupedCounts
    });
}));
exports.getTeamsByUser = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const teams = yield (yield TeamUserHandlers_1.default.create(data)).getTeamMembers(req.params.id);
    res.respond({
        data: teams
    });
}));
exports.sendEmails = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license, scheduled, scheduled_at } = req.body;
    console.log("scheduled scheduled_at", `${scheduled} ${scheduled_at}`);
    const data = yield DataProvider_1.default.create();
    const users = yield (yield UserLicenseHandlers_1.default.create(data)).getByLicenseId({ license });
    const licenseObject = yield (yield LicenseHandlers_1.default.create(data)).getById(license);
    const team = yield (yield TeamHandlers_1.default.create(data)).getById({ license });
    const emailService = (0, SendEmail_1.SendEmail)();
    console.log("Email users", users);
    for (const value of users) {
        if (value.isInvited != null)
            continue;
        const to = value.email;
        // const subject = team.email_subject
        const email_content = team === null || team === void 0 ? void 0 : team.email_message;
        const sign_off = team.sign_off;
        const user_license_id = value.id;
        emailService.sendWelcomeEmail(to, email_content, sign_off, licenseObject === null || licenseObject === void 0 ? void 0 : licenseObject.expiry, value.user, license, user_license_id);
        //  EmailService.queueEmail(
        //     {
        //         to,
        //         subject,
        //         email_content,
        //         sign_off,
        //         scheduled,
        //         scheduled_at,
        //         user_license_id,
        //         interval: team.reminder_interval,
        //         expiry: licenseObject?.expiry,
        //         user: value.user,
        //         license
        //     })
        // console.log(value)
        yield (yield UserLicenseHandlers_1.default.create(data)).update({ id: value.id, isInvited: true });
    }
    res.respond({
        users
    });
}));
exports.resendEmail = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, team_id, license_id } = req.body;
    const data = yield DataProvider_1.default.create();
    const user = yield (yield UserHandlers_1.default.create(data)).getUser({ id: user_id });
    const userLicense = yield (yield UserLicenseHandlers_1.default.create(data)).get({ license: license_id, user: user_id });
    const licenseObject = yield (yield LicenseHandlers_1.default.create(data)).getById(license_id);
    const team = yield (yield TeamHandlers_1.default.create(data)).getById({ id: team_id });
    const to = user === null || user === void 0 ? void 0 : user.email;
    // const subject = ""
    const email_content = team === null || team === void 0 ? void 0 : team.email_message;
    const sign_off = team === null || team === void 0 ? void 0 : team.sign_off;
    // const scheduled = null
    // const scheduled_at = null
    const user_license_id = userLicense === null || userLicense === void 0 ? void 0 : userLicense.id;
    const emailService = (0, SendEmail_1.SendEmail)();
    // EmailService.queueEmail(
    //     {
    //         to,
    //         subject,
    //         email_content,
    //         sign_off,
    //         scheduled,
    //         scheduled_at,
    //         user_license_id,
    //         interval: null,
    //         expiry: licenseObject?.expiry,
    //         user: user_id,
    //         license: license_id
    //     })
    emailService.sendWelcomeEmail(to, email_content, sign_off, licenseObject === null || licenseObject === void 0 ? void 0 : licenseObject.expiry, user_id, license_id, user_license_id);
    res.respond({
        user
    });
}));
exports.downloadResults = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {user_id, game_id, license_id} = req.body
    const pdf = require('html-pdf');
    const { user_id, game_id, license_id } = req.query;
    // const data = await DataProvider.create()
    // const user  = await (await UserHandlers.create(data)).getUser({id: user_id})
    // resultsEmailService.queueEmail({to: user.email, subject: "Results Email", user_id: user, game_id, license_id})
    const resultsHtml = yield (0, resultsEmail_1.resultsTemplate)({ user_id, game_id, license_id });
    const options = { format: 'Letter' };
    // pdf.create(resultsHtml, options).toFile('./test.pdf', function(err, res) {
    //     if (err) return console.log(err);
    //     console.log(res);
    // });
    pdf.create(resultsHtml, options).toBuffer(function (err, buffer) {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while generating the PDF');
            return;
        }
        // Send the PDF as a file attachment in the HTTP response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${user_id}.pdf`);
        res.send(buffer);
    });
}));
exports.getCount = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const license_id = req.params.id;
    const body = {
        license: license_id
    };
    const count = yield (yield TeamUserHandlers_1.default.create(data)).getCount(body);
    res.respond({
        data: count
    });
}));
//# sourceMappingURL=teams.js.map