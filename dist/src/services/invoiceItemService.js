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
exports.invoiceItemService = void 0;
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const planService = __importStar(require("./subscriptionPlanService"));
const InvoiceItemHandlers_1 = __importDefault(require("../data/invoiceItem/InvoiceItemHandlers"));
const omit_1 = __importDefault(require("omit"));
const invoiceItemService = (req, items, invoiceObject) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const planObject = yield planService.getById(item, data);
        const subscription_plan = planObject.id;
        const unit_price = planObject.price_per_person;
        const quantity = item.qty;
        const description = planObject.name;
        const invoice = invoiceObject.id;
        const body = Object.assign(Object.assign({}, req.body), { subscription_plan, unit_price, quantity, invoice, description });
        const bodyObject = (0, omit_1.default)(["user", "items", "cardCountry", "billingState", "billingZip", "billingCountry", "email", "emailInvoice", "formattedPrice"], body);
        // @ts-ignore
        yield (yield InvoiceItemHandlers_1.default.create(data)).create(bodyObject);
    })));
    return { items };
});
exports.invoiceItemService = invoiceItemService;
//# sourceMappingURL=invoiceItemService.js.map