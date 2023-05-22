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
exports.updateSubscription = exports.create = void 0;
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const omit_1 = __importDefault(require("omit"));
const SubscriptionHandlers_1 = __importDefault(require("../data/subscription/SubscriptionHandlers"));
const dateUtil_1 = require("../utils/dateUtil");
const create = (req, invoiceObject, license) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const user = invoiceObject.user;
    const invoice = invoiceObject.id;
    const expires_at = (0, dateUtil_1.futureDate)(30);
    const subscription_plan = req.body.items[0].id;
    const quantity = req.body.items[0].qty;
    const body = Object.assign(Object.assign({}, req.body), { user, invoice, subscription_plan, expires_at, quantity, license });
    const bodyObject = (0, omit_1.default)(["formattedPrice", "emailInvoice", "email",
        "name", "items", "cardCountry", "billingState",
        "billingZip", "billingCountry"], body);
    // @ts-ignore
    return yield (yield SubscriptionHandlers_1.default.create(data)).create(bodyObject);
});
exports.create = create;
const updateSubscription = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateSubscription = updateSubscription;
//# sourceMappingURL=subscriptionService.js.map