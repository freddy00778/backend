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
exports.regenerateLink = exports.create = exports.testTransactionStatus = exports.checkTransactionStatus = exports.addAdministrator = exports.validateAndRedirectToSetup = exports.paymentNotification = exports.processPayment = exports.sendPaymentLink = exports.processPaymentForm = exports.getSale = exports.getSaleDetails = exports.getAll = void 0;
const errors_1 = require("../errors");
const invoiceService = __importStar(require("../services/invoiceService"));
const auth_1 = require("../utils/auth");
const UserHandlers_1 = __importDefault(require("../data/users/UserHandlers"));
const data_1 = require("../data");
const InvoiceHandlers_1 = __importDefault(require("../data/checkout/InvoiceHandlers"));
const order_id_1 = __importDefault(require("order-id"));
const SubscriptionPlanHandlers_1 = __importDefault(require("../data/subscriptionPlan/SubscriptionPlanHandlers"));
// import {sendEmails} from "./teams";
const SendEmail_1 = require("../services/email/SendEmail");
const axios_1 = __importDefault(require("axios"));
// import * as bcrypt from "bcrypt";
const LicenseHandlers_1 = __importDefault(require("../data/license/LicenseHandlers"));
const dateUtil_1 = require("../utils/dateUtil");
const querystring_1 = __importDefault(require("querystring"));
const cheerio_1 = __importDefault(require("cheerio"));
const InvoiceItemHandlers_1 = __importDefault(require("../data/invoiceItem/InvoiceItemHandlers"));
const SubscriptionHandlers_1 = __importDefault(require("../data/subscription/SubscriptionHandlers"));
const merchantId = '21013235';
const merchantKey = 'zcx350nyoedit';
// const returnUrl = 'https://changeverveacademy.com/transaction-status';
const returnUrl = 'https://store.changeverveacademy.com';
const cancelUrl = 'https://changeverveacademy.com/cancel-url';
const notifyUrl = 'https://backend.changeverveacademy.com/notify';
const itemName = 'Change Management Game';
const SECRET_KEY = '6LdTVP8lAAAAAN4vi6Qc-rDwwB5TfOp2haVN_6Xm';
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sales = yield invoiceService.getAll();
    console.log("sales", req.body);
    res.respond({
        sales
    });
}));
exports.getSaleDetails = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const invoice = yield invoiceService.getInvoice({ transaction_number: token });
    const payment_token = invoice.payment_link;
    const response = yield (0, auth_1.validateToken)(payment_token);
    console.log("invoice from sale details", invoice);
    const tokenObject = response.payloadObject;
    res.respond({
        sale: tokenObject
    });
}));
exports.getSale = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sale = yield invoiceService.getInvoice(req.body);
    console.log("sale", req.body);
    res.respond({
        sale
    });
}));
exports.processPaymentForm = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.cookies)
    // const csrfToken = req.cookies['XSRF-TOKEN'];
    // const csrfHeader = req.headers['x-xsrf-token'];
    // if (!csrfToken || !csrfHeader || csrfToken !== csrfHeader) {
    //     return res.status(403).json({ message: 'Invalid CSRF token' });
    // }
    const { email, quantity } = req.body;
    console.log("Req body", req.body);
    if (!(email)) {
        return res.status(400).send("All inputs are required!");
    }
    const dataProvider = yield data_1.DataProvider.create();
    const plans = yield (yield SubscriptionPlanHandlers_1.default.create(dataProvider)).getAll();
    const orderNo = (0, order_id_1.default)("zertde").generate();
    // const plan_id = plans[0]?.id
    const plan_qty = quantity;
    const plan = plans[0];
    // const planObject = await (await SubscriptionPlanHandlers.create(dataProvider)).getById(plan_id)
    const total = (plan === null || plan === void 0 ? void 0 : plan.price_per_person) * Number(plan_qty);
    const generated_url = (0, auth_1.generateToken)({
        email,
        total: (plan === null || plan === void 0 ? void 0 : plan.price_per_person) * Number(plan_qty),
        transaction_number: orderNo,
        url: `/card-payments/${orderNo}`,
        items: [
            {
                id: plan === null || plan === void 0 ? void 0 : plan.id,
            }
        ]
    }, '72h');
    yield (yield InvoiceHandlers_1.default.create(dataProvider)).create({
        transaction_number: orderNo,
        total: (plan === null || plan === void 0 ? void 0 : plan.price_per_person) * Number(plan_qty),
        provider: "payfast",
        payment_link: generated_url,
    });
    const data = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        notify_url: notifyUrl,
        email_address: email,
        m_payment_id: orderNo,
        amount: total,
        item_name: itemName,
        payment_method: "cc"
    };
    const postData = Object.assign({}, data);
    try {
        const response = yield axios_1.default.post('https://www.payfast.co.za/eng/process', querystring_1.default.stringify(postData));
        const $ = cheerio_1.default.load(response.data);
        const uuid = $('meta[name="uuid"]').attr("content");
        console.log("uuid", uuid);
        if (!uuid) {
            return res.status(400).send("UUID not found in the response");
        }
        return res.respond({
            url: `https://www.payfast.co.za/eng/process/payment/${uuid}`
        });
    }
    catch (error) {
        return res.respond({
            url: `${error}`
        });
    }
}));
exports.sendPaymentLink = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items, email } = req.body;
    console.log("Items, email", `${items} ${email}`);
    if (!(items && email)) {
        return res.status(400).send("All inputs are required!");
    }
    const data = yield data_1.DataProvider.create();
    const orderNo = (0, order_id_1.default)("zertde").generate();
    const plan_id = items[0]["id"];
    const plan_qty = items[0]["qty"];
    const planObject = yield (yield SubscriptionPlanHandlers_1.default.create(data)).getById(plan_id);
    const total = (planObject === null || planObject === void 0 ? void 0 : planObject.price_per_person) * Number(plan_qty);
    const generated_url = (0, auth_1.generateToken)({
        email,
        total: (planObject === null || planObject === void 0 ? void 0 : planObject.price_per_person) * Number(plan_qty),
        transaction_number: orderNo,
        url: `/card-payments/${orderNo}`,
        items
    }, '72h');
    yield (yield InvoiceHandlers_1.default.create(data)).create({
        transaction_number: orderNo,
        total: (planObject === null || planObject === void 0 ? void 0 : planObject.price_per_person) * Number(plan_qty),
        provider: "payfast",
        payment_link: generated_url,
    });
    const sendMail = (0, SendEmail_1.SendEmail)();
    sendMail.sendPaymentLink(email, planObject === null || planObject === void 0 ? void 0 : planObject.name, total, orderNo, generated_url);
    res.respond({
        data: null
    });
}));
exports.processPayment = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const parsedToken = parseJwt(token);
    if (!parsedToken) {
        return res.status(400).send("Token is not valid!");
    }
    console.log("Token Info", parsedToken);
    const { email, transaction_number, total } = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payloadObject;
    const data = {
        merchant_id: merchantId,
        merchant_key: merchantKey,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        notify_url: notifyUrl,
        email_address: email,
        m_payment_id: transaction_number,
        amount: total,
        item_name: itemName,
        payment_method: "cc"
    };
    // const signature = generateSignature(data);
    // const postData = {
    //     ...data,
    //     signature: signature,
    // };
    const postData = Object.assign({}, data);
    try {
        const response = yield axios_1.default.post('https://www.payfast.co.za/eng/process', querystring_1.default.stringify(postData));
        console.log(response);
        const $ = cheerio_1.default.load(response.data);
        const uuid = $('meta[name="uuid"]').attr("content");
        console.log("uuid", uuid);
        if (!uuid) {
            return res.status(400).send("UUID not found in the response");
        }
        return res.redirect(`https://www.payfast.co.za/eng/process/payment/${uuid}`);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.paymentNotification = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { m_payment_id, pf_payment_id, payment_status, item_name, amount_gross, amount_fee, amount_net, signature } = req.body;
    console.log("Payment Notification", req.body);
    if (payment_status === "COMPLETE") {
        // try {
        const data = yield data_1.DataProvider.create();
        const invoiceHandler = yield InvoiceHandlers_1.default.create(data);
        const userHandler = yield UserHandlers_1.default.create(data);
        const subscriptionPlanHandler = yield SubscriptionPlanHandlers_1.default.create(data);
        const invoiceItemHandler = yield InvoiceItemHandlers_1.default.create(data);
        const licenseHandler = yield LicenseHandlers_1.default.create(data);
        const subscriptionHandler = yield SubscriptionHandlers_1.default.create(data);
        const invoiceObject = yield invoiceHandler.getInvoice({ transaction_number: m_payment_id });
        const parsedToken = parseJwt(invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.payment_link);
        const payloadObject = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payloadObject;
        yield invoiceHandler.update(m_payment_id, { paid: true });
        const existingUserObject = yield userHandler.getUser({ email: payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.email });
        const userObject = existingUserObject ? existingUserObject : yield userHandler.create({ email: payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.email });
        const planObject = yield subscriptionPlanHandler.getById(payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.items[0].id);
        const subscription_plan = planObject.id;
        const unit_price = planObject.price_per_person;
        const quantity = 1;
        const description = planObject.name;
        const invoice = invoiceObject.id;
        const expires_at = (0, dateUtil_1.futureDate)(180);
        // @ts-ignore
        yield invoiceItemHandler.create({ subscription_plan, unit_price, quantity, description, invoice });
        // @ts-ignore
        const licenseObject = yield licenseHandler.create({ user: userObject === null || userObject === void 0 ? void 0 : userObject.id, expiry: expires_at });
        const body = { user: userObject === null || userObject === void 0 ? void 0 : userObject.id, invoice, subscription_plan, expires_at, quantity, license: licenseObject.id };
        console.log("Body", body);
        // @ts-ignore
        yield subscriptionHandler.create(body);
        const invoiceEmail = payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.email;
        const date = invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.created_at;
        const sendMail = (0, SendEmail_1.SendEmail)();
        yield sendMail.sendInvoiceEmail(invoiceEmail, invoiceEmail, date, m_payment_id, amount_gross, 1, invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.payment_link);
    }
    return res.respond({
        verified: true
    });
    // return res.send("").status(200)
}));
exports.validateAndRedirectToSetup = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { token } = req.params;
    const parsedToken = parseJwt(token);
    const transactionNumber = (_a = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payloadObject) === null || _a === void 0 ? void 0 : _a.transaction_number;
    const data = yield data_1.DataProvider.create();
    const invoiceObject = yield (yield InvoiceHandlers_1.default.create(data)).getInvoice({
        transaction_number: transactionNumber
    });
    if (invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.paid) {
        return res.redirect(`https://changeverveacademy.com/return-url/${token}`);
    }
    return res.redirect("https://changeverveacademy.com");
}));
exports.addAdministrator = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { name, email, captchaValue, token } = req.body;
    console.log("log", `email - ${email}`);
    // try{
    if (!captchaValue) {
        return res.status(400).json({ error: 'reCAPTCHA value is missing' });
    }
    const parsedToken = parseJwt(token);
    const transactionId = (_b = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payloadObject) === null || _b === void 0 ? void 0 : _b.transaction_number;
    const data = yield data_1.DataProvider.create();
    const userHandlers = yield UserHandlers_1.default.create(data);
    const existingUserObject = yield userHandlers.getUser({ email });
    console.log("log", `email 2 - ${email}`);
    if (existingUserObject) {
        return res.status(409).json({ error: 'This email is already exists!' });
    }
    const invoiceObject = yield (yield InvoiceHandlers_1.default.create(data)).getInvoice({
        transaction_number: transactionId
    });
    if (!invoiceObject || !(invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.paid)) {
        return res.status(404).json({ error: 'Transaction does not exist or not paid!' });
    }
    const isCaptchaValid = yield verifyCaptcha(captchaValue);
    if (!isCaptchaValid) {
        return res.status(400).json({ error: 'Invalid reCAPTCHA' });
    }
    const user = yield createUser(email, name);
    yield (yield InvoiceHandlers_1.default.create(data)).update(transactionId, {
        admin_setup: true
    });
    const subscriptionHandlers = yield SubscriptionHandlers_1.default.create(data);
    const subscription = yield subscriptionHandlers.get({ invoice: invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.id });
    yield subscriptionHandlers.update({
        id: subscription === null || subscription === void 0 ? void 0 : subscription.id,
        administrator: user === null || user === void 0 ? void 0 : user.id
    });
    const sendMail = (0, SendEmail_1.SendEmail)();
    sendMail.confirmationEmailToAdmin(email, 0, user === null || user === void 0 ? void 0 : user.id);
    return res.json({ success: true });
    // }catch (e) {
    return res.json({ success: false });
    // }
}));
//@ts-ignore
exports.checkTransactionStatus = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield data_1.DataProvider.create();
    const invoiceHandler = yield InvoiceHandlers_1.default.create(data);
    const allInvoices = yield invoiceHandler.getAll({
        paid: false
    });
    const latestInvoice = allInvoices[0];
    const m_payment_id = latestInvoice === null || latestInvoice === void 0 ? void 0 : latestInvoice.transaction_number;
    const amount_gross = latestInvoice === null || latestInvoice === void 0 ? void 0 : latestInvoice.total;
    const userHandler = yield UserHandlers_1.default.create(data);
    const subscriptionPlanHandler = yield SubscriptionPlanHandlers_1.default.create(data);
    const invoiceItemHandler = yield InvoiceItemHandlers_1.default.create(data);
    const licenseHandler = yield LicenseHandlers_1.default.create(data);
    const subscriptionHandler = yield SubscriptionHandlers_1.default.create(data);
    const invoiceObject = yield invoiceHandler.getInvoice({ transaction_number: m_payment_id });
    const parsedToken = parseJwt(invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.payment_link);
    const payloadObject = parsedToken === null || parsedToken === void 0 ? void 0 : parsedToken.payloadObject;
    const existingUserObject = yield userHandler.getUser({ email: payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.email });
    const userObject = existingUserObject ? existingUserObject : yield userHandler.create({ email: payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.email });
    const planObject = yield subscriptionPlanHandler.getById(payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.items[0].id);
    const subscription_plan = planObject.id;
    const unit_price = planObject.price_per_person;
    const quantity = 1;
    const description = planObject.name;
    const invoice = invoiceObject.id;
    const expires_at = (0, dateUtil_1.futureDate)(180);
    // @ts-ignore
    yield invoiceItemHandler.create({ subscription_plan, unit_price, quantity, description, invoice });
    // @ts-ignore
    const licenseObject = yield licenseHandler.create({ user: userObject === null || userObject === void 0 ? void 0 : userObject.id, expiry: expires_at });
    const body = { user: userObject === null || userObject === void 0 ? void 0 : userObject.id, invoice, subscription_plan, expires_at, quantity, license: licenseObject.id };
    yield invoiceHandler.update(m_payment_id, { paid: true, license: licenseObject === null || licenseObject === void 0 ? void 0 : licenseObject.id, user: userObject === null || userObject === void 0 ? void 0 : userObject.id });
    console.log("Body", body);
    // @ts-ignore
    yield subscriptionHandler.create(body);
    const invoiceEmail = payloadObject === null || payloadObject === void 0 ? void 0 : payloadObject.email;
    const date = invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.created_at;
    const sendMail = (0, SendEmail_1.SendEmail)();
    yield sendMail.sendInvoiceEmail(invoiceEmail, invoiceEmail, date, m_payment_id, amount_gross, 1, invoiceObject === null || invoiceObject === void 0 ? void 0 : invoiceObject.payment_link);
    // }
    return res.respond({
        verified: true
    });
}));
exports.testTransactionStatus = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transaction_id } = req.params;
    const version = 'v1'; // The PayFast API version
    const timestamp = new Date().toISOString(); // The current timestamp in ISO-8601 format
    const passphrase = ''; // Your passphrase as set on the settings page
    const id = transaction_id; // The payment or subscription ID
    const params = {
        merchantId,
        version,
        timestamp,
        passphrase
    };
    const keys = Object.keys(params).sort();
    // const values = keys.map(key => params[key]);
    // const str = values.join('');
    const signature = generateSignature(keys);
    // const signature = require('crypto').createHash('md5').update(str).digest('hex');
    const headers = {
        'merchant-id': merchantId,
        'version': version,
        'timestamp': timestamp,
        'signature': signature
    };
    const options = {
        url: `https://api.payfast.co.za/process/query/${id}`,
        method: 'GET',
        headers: headers
    };
    (0, axios_1.default)(options)
        .then(resp => {
        console.log(resp.data);
        res.send(resp.data);
    })
        .catch(err => {
        console.error(err);
        res.send(err);
    });
}));
exports.create = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items, user } = req.body;
    if (!(items && user)) {
        return res.status(400).send("All inputs are required!");
    }
    // const data =       await DataProvider.create
    // const license     = (await createLicense(req)).id
    // const invoice     = license && await createInvoice(req, items, license)
    // const invoiceItem = (invoice) &&  await invoiceItemService(req, items, invoice)
    // const payment     = (license && invoice && invoiceItem) ? await paymentService(req,invoice, license) : {}
    // const userObject =  await (await UserHandlers.create(data)).getTeamUsersByUserId(user)
    //
    // const generated_url = generateToken({
    //   invoice_id: invoice && invoice.id,
    //   total: invoice.total,
    //   transaction_number: invoice.transaction_number,
    //   formatted_total: invoice.formatted_total,
    //   url: `/card-payments/${invoice.id}?item=${invoiceItem.id}`,
    //   items
    // }, '24h')
    //
    // await invoiceService.updateInvoice(invoice.transaction_number, {
    //   payment_link: generated_url
    // })
    // console.log("User email",  userObject.length > 0 ? userObject[0]?.email: "")
    // const sendMail = SendEmail()
    // sendMail.confirmationEmailToAdmin(userObject[0]?.email, items[0].qty)
    // const invoiceEmail = userObject[0]?.additionalDetails.invoice_email
    // const invoiceEmail = userObject[0]?.email
    // console.log("invoice email", invoiceEmail)
    // await sendMail.sendInvoiceEmail(invoiceEmail, invoiceEmail,
    //     userObject[0]?.created_at, invoice.transaction_number, invoice.formatted_total, items[0]?.qty)
    res.respond({});
}));
exports.regenerateLink = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transaction_number } = req.params;
    const invoice = yield invoiceService.getInvoice({ transaction_number: transaction_number });
    const tokenObject = parseJwt(invoice.payment_link).payloadObject;
    const generated = (0, auth_1.generateToken)(tokenObject);
    yield invoiceService.updateInvoice(transaction_number, { payment_link: generated });
    res.respond({
        payment_token: generated
    });
}));
function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
// @ts-ignore
const generateSignature = (data) => {
    const crypto = require('crypto');
    let pfOutput = "";
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] !== "") {
                pfOutput += `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}&`;
            }
        }
    }
    let getString = pfOutput.slice(0, -1);
    // if (passPhrase !== null) {
    //     getString +=`&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
    // }
    return crypto.createHash("md5").update(getString).digest("hex");
};
const verifyCaptcha = (captchaValue) => __awaiter(void 0, void 0, void 0, function* () {
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captchaValue}`;
    const response = yield axios_1.default.post(verificationURL);
    return response.data.success;
});
const createUser = (email, company) => __awaiter(void 0, void 0, void 0, function* () {
    // const hashedPassword = password ??  bcrypt.hashSync(password, 10);
    // const fullNameArray = name?.split(" ");
    const data = yield data_1.DataProvider.create();
    const userHandlers = yield UserHandlers_1.default.create(data);
    const existingUserObject = yield userHandlers.getUser({ email });
    if (!existingUserObject) {
        return yield userHandlers.create({
            email,
            additionalDetails: {
                company: company
            }
        });
    }
    return existingUserObject;
});
//# sourceMappingURL=checkout.js.map