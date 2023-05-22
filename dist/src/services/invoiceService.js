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
exports.updateInvoice = exports.createInvoice = exports.getInvoice = exports.getAll = void 0;
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const InvoiceHandlers_1 = __importDefault(require("../data/checkout/InvoiceHandlers"));
const planService = __importStar(require("./subscriptionPlanService"));
const omit_1 = __importDefault(require("omit"));
const order_id_1 = __importDefault(require("order-id"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    // console.log("body", body)
    return (yield InvoiceHandlers_1.default.create(data)).getAll();
});
exports.getAll = getAll;
const getInvoice = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    // console.log("body", body)
    return (yield InvoiceHandlers_1.default.create(data)).getInvoice(input);
});
exports.getInvoice = getInvoice;
const createInvoice = (req, items, license) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const provider = "Payment provider";
    const tax = 0;
    let total = 0;
    yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const plan = yield planService.getById(item, data);
        total += item.qty * plan.price_per_person;
    })));
    // const orderId = await customId({
    //     uniqueId: 4563
    // });
    const orderNo = (0, order_id_1.default)("zertde").generate();
    // console.log("custom id", orderNo)
    // const body = {...req.body,total, tax, provider,license, transaction_number:uuidv4() }
    const body = Object.assign(Object.assign({}, req.body), { total, tax, provider, license, transaction_number: orderNo, formatted_total: req.body.formattedPrice });
    const bodyObject = (0, omit_1.default)(["items", "email", "emailInvoice", "formattedPrice"], body);
    // @ts-ignore
    return yield (yield InvoiceHandlers_1.default.create(data)).create(bodyObject);
    // return await (await InvoiceHandlers.create(data)).update({
    //
    // })
});
exports.createInvoice = createInvoice;
const updateInvoice = (transactionNumber, input) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    return yield (yield InvoiceHandlers_1.default.create(data)).update(transactionNumber, input);
});
exports.updateInvoice = updateInvoice;
//# sourceMappingURL=invoiceService.js.map