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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamUsersChartData = exports.changePassword = exports.resetPassword = exports.assessmentLogin = exports.adminLogin = exports.login = exports.completeGame = exports.update = exports.updateUser = exports.createUser = exports.getUsers = exports.getSingleUser = exports.getUser = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const UserHandlers_1 = __importDefault(require("../data/users/UserHandlers"));
const bcrypt = __importStar(require("bcrypt"));
const auth_1 = require("../utils/auth");
const randtoken = __importStar(require("rand-token"));
const omit_1 = __importDefault(require("omit"));
const UserLicenseData_1 = __importDefault(require("../data/userLicense/UserLicenseData"));
// import UserLicenseHandlers from "../data/userLicense/UserLicenseHandlers";
// import * as resultsEmailService from "../services/email/ResultsEmailService";
// import * as resetEmailService from "../services/email/resetEmailService";
const SendEmail_1 = require("../services/email/SendEmail");
const TeamHandlers_1 = __importDefault(require("../data/teams/TeamHandlers"));
const InvoiceHandlers_1 = __importDefault(require("../data/checkout/InvoiceHandlers"));
const SubscriptionHandlers_1 = __importDefault(require("../data/subscription/SubscriptionHandlers"));
// import * as resultsEmailPdfService from "../services/email/ResultsEmailPdfService";
// import omit from  "omit"
//  import * as nodemailer from 'nodemailer';
//  import * as crypto from 'crypto';
exports.getUser = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let jwt = req.headers.authorization;
    const jwtKey = jwt && jwt.slice('bearer'.length).trim();
    const parsed = parseJwt(jwtKey);
    return res.respond({
        payload: parsed.payloadObject
    });
}));
exports.getSingleUser = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const user = yield (yield UserHandlers_1.default.create(data)).getSingleUser(req);
    res.respond({
        data: user
    });
}));
exports.getUsers = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const users = yield (yield UserHandlers_1.default.create(data)).getUserList();
    res.respond({
        body: req.body,
        data: users
    });
}));
exports.createUser = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield DataProvider_1.default.create();
    const { firstName, lastName, email, phoneNumber, password, invoiceDetails } = req.body;
    if (!(email && password && firstName && lastName && phoneNumber)) {
        res.status(400).send("All inputs are required!");
    }
    const emailExists = yield (yield UserHandlers_1.default.create(data)).getEmail(email);
    if (emailExists) {
        return res.status(400).send();
    }
    const additionalDetails = {
        invoice_name: invoiceDetails === null || invoiceDetails === void 0 ? void 0 : invoiceDetails.name,
        invoice_email: invoiceDetails === null || invoiceDetails === void 0 ? void 0 : invoiceDetails.email,
        invoice_address: invoiceDetails === null || invoiceDetails === void 0 ? void 0 : invoiceDetails.address,
    };
    const hashedPassword = bcrypt.hashSync(password, 10);
    const body = Object.assign(Object.assign({}, req.body), { password: hashedPassword, additionalDetails: additionalDetails });
    console.log("body", body);
    const usersBodyObject = (0, omit_1.default)(["invoiceDetails", "confirm_password"], body);
    const insertedUser = yield (yield UserHandlers_1.default.create(data)).create(usersBodyObject);
    // let [firstInvoiceName, ...lastNameParts] = additionalDetails.invoice_name?.split(' ');
    // let lastInvoiceName = lastNameParts.join(' ');
    console.log("body again", body);
    const invoiceUser = yield (yield UserHandlers_1.default.create(data)).create({
        email: (_a = body === null || body === void 0 ? void 0 : body.invoiceDetails) === null || _a === void 0 ? void 0 : _a.invoice_email,
    });
    yield (yield InvoiceHandlers_1.default.create(data)).create({
        user: invoiceUser.id
    });
    const token = (0, auth_1.generateToken)(insertedUser);
    const payload = Object.assign(Object.assign({}, insertedUser), { token });
    res.respond({
        data: payload
    });
}));
exports.updateUser = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    const body = Object.assign(Object.assign({}, req.body), { id });
    const usersBodyObject = (0, omit_1.default)(["confirm_password"], body);
    const response = yield (yield UserHandlers_1.default.create(data)).update(usersBodyObject);
    res.respond({
        data: response
    });
}));
exports.update = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = req.body;
    const data = yield DataProvider_1.default.create();
    const passwordHash = yield bcrypt.hash(password, 10);
    const body = Object.assign(Object.assign({}, req.body), { id, password: passwordHash });
    console.log("body", body);
    console.log("password hash", passwordHash);
    const response = yield (yield UserHandlers_1.default.create(data)).update(body);
    res.respond({
        data: response
    });
}));
exports.completeGame = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { user, license, game_id, email_only, team_id } = req.body;
    const data = yield DataProvider_1.default.create();
    let response;
    const userObject = yield (yield UserHandlers_1.default.create(data)).getUser({ id: user });
    const teamObject = yield (yield TeamHandlers_1.default.create(data)).getById({ id: team_id });
    const fullName = `${userObject === null || userObject === void 0 ? void 0 : userObject.firstName} ${userObject.lastName}`;
    const email = userObject === null || userObject === void 0 ? void 0 : userObject.email;
    if (email_only) {
        const emailService = (0, SendEmail_1.SendEmail)();
        try {
            yield emailService.sendCompletedResults(userObject.email, user, game_id, license);
        }
        catch (e) {
            console.log("Send completed results", e);
        }
        try {
            yield emailService.sendCompletedEmailToCoordinator(teamObject === null || teamObject === void 0 ? void 0 : teamObject.contact_email, fullName, email, "", teamObject === null || teamObject === void 0 ? void 0 : teamObject.name);
        }
        catch (e) {
            console.log("Coordinator results", e);
        }
        // resultsEmailService.queueEmail({to: userObject.email, subject: "Results Email", user_id: user, game_id, license_id: license})
        // const html = `<p> This is a test!</p>`
        // var html = '<html><body>Hello World</body></html>';
        // resultsEmailPdfService.queueEmailWithPDF({to: userObject.email, subject: "Results Email", html: html})
    }
    else {
        response = yield (yield UserLicenseData_1.default.create(data)).completeGame({ user, license, completed: true });
    }
    res.respond({
        data: response
    });
}));
exports.login = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("Email and password are required!");
    }
    const emailExists = yield (yield UserHandlers_1.default.create(data)).getEmail(email);
    if (!emailExists) {
        return res.status(401).send();
    }
    const userObject = emailExists;
    const passwordMatch = emailExists && (yield bcrypt.compare(password, userObject.password));
    if (userObject && passwordMatch) {
        const subscription = yield (yield SubscriptionHandlers_1.default.create(data)).get({ administrator: userObject === null || userObject === void 0 ? void 0 : userObject.id });
        const currentDate = Date.now();
        const expiresAt = new Date(subscription.expires_at).getTime();
        const token = (0, auth_1.generateToken)(userObject);
        const jsonInfo = Object.assign(Object.assign({}, userObject), { token });
        if (userObject.coordinator) {
            return res.respond(Object.assign({}, jsonInfo));
        }
        // if ( userObject.subscription_plan == null || userObject.expires_at == null || expiresAt < currentDate ){
        //     return res.status(403).send("License has expired");
        // }
        if (subscription.subscription_plan == null || subscription.expires_at == null || expiresAt < currentDate) {
            return res.status(403).send("License has expired");
        }
        return res.respond(Object.assign({}, jsonInfo));
    }
    return res.status(401).send({ text: "username or password incorrect!" });
}));
exports.adminLogin = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("Email and password are required!");
    }
    const emailExists = yield (yield UserHandlers_1.default.create(data)).getEmail(email);
    console.log("email exists", emailExists);
    if (!emailExists) {
        return res.status(401).send();
    }
    const userObject = emailExists;
    const passwordMatch = emailExists && (yield bcrypt.compare(password, userObject.password));
    if (userObject && passwordMatch) {
        console.log('user object', userObject);
        if (!userObject.isAdmin) {
            return res.status(401).send();
        }
        const token = (0, auth_1.generateToken)(userObject);
        const jsonInfo = Object.assign(Object.assign({}, userObject), { token });
        return res.respond(Object.assign({}, jsonInfo));
    }
    return res.status(401).send({ text: "username or password incorrect!" });
}));
exports.assessmentLogin = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { email } = req.body;
    if (!(email)) {
        res.status(400).send("Email is required!");
    }
    const emailExists = yield (yield UserHandlers_1.default.create(data)).getUserLicense(email === null || email === void 0 ? void 0 : email.toLowerCase());
    if (emailExists.length == 0) {
        return res.status(401).send();
    }
    const userObject = emailExists ? emailExists[0] : emailExists;
    if (userObject) {
        const currentDate = Date.now();
        const expiresAt = new Date(userObject.expires_at).getTime();
        if (userObject.subscription_plan == null || userObject.expires_at == null || expiresAt < currentDate) {
            return res.status(403).send("License has expired");
        }
        const token = (0, auth_1.generateToken)(userObject);
        const jsonInfo = Object.assign(Object.assign({}, userObject), { token });
        return res.respond(Object.assign({}, jsonInfo));
    }
    return res.status(401).send({ text: "email not correct!" });
}));
exports.resetPassword = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required!');
    }
    const userHandlers = yield UserHandlers_1.default.create(data);
    const emailExists = yield userHandlers.getUserLicense(email);
    if (emailExists.length === 0) {
        return res.status(401).send({ text: 'Email not found!' });
    }
    const userObject = emailExists[0];
    const token = randtoken.generate(20);
    yield userHandlers.update({ id: userObject.id, verificationToken: token });
    const resetUrl = `https://changeverveacademy.com/change-password?token=${token}&email=${email}`;
    const emailSent = yield sendEmail(email, resetUrl);
    if (!emailSent) {
        return res.status(500).send({ text: 'Error sending email!' });
    }
    res.respond({
        data: {}
    });
}));
exports.changePassword = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { token, password } = req.body;
    // if (!email) {
    //     return res.status(400).send('Email is required!');
    // }
    const userHandlers = yield UserHandlers_1.default.create(data);
    const emailExists = yield userHandlers.getUser({ verificationToken: token });
    // if (!emailExists ) {
    //     return res.status(401).send({ text: 'Email not found!' });
    // }
    const hashedPassword = bcrypt.hashSync(password, 10);
    yield userHandlers.update({ id: emailExists.id, password: hashedPassword });
    return res.respond({
        data: emailExists
    });
}));
exports.teamUsersChartData = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { license } = req.query;
    const data = yield DataProvider_1.default.create();
    // @ts-ignore
    const chartsData = yield (yield UserHandlers_1.default.create(data)).getEmails(license);
    const groupedCounts = chartsData.reduce((accumulator, user) => {
        const teamId = user.team_id || 'no_team';
        if (!accumulator[teamId]) {
            accumulator[teamId] = {
                teamName: user.team_name,
                isStartedTrueCount: 0,
                isStartedFalseCount: 0,
                isCompletedTrueCount: 0
            };
        }
        accumulator[teamId].isStartedTrueCount += user.isStarted ? 1 : 0;
        accumulator[teamId].isStartedFalseCount += !user.isStarted ? 1 : 0;
        accumulator[teamId].isCompletedTrueCount += user.completed ? 1 : 0;
        return accumulator;
    }, {});
    console.log('Grouped counts by team_id:', groupedCounts);
    res.respond({
        groupedCounts
    });
}));
function sendEmail(email, resetUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = {
            to: email,
            subject: 'Reset Password',
            text: `Click the following link to reset your password: ${resetUrl}`,
            html: `Click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`,
        };
        try {
            const sendMail = (0, SendEmail_1.SendEmail)();
            sendMail.sendResetEmail(message.to, message.html);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    });
}
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
//# sourceMappingURL=users.js.map