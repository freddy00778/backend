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
exports.extendSubscription = exports.getSingleSubscription = exports.getSubscription = exports.getSubscriptions = exports.getAll = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const SubscriptionData_1 = __importDefault(require("../data/subscription/SubscriptionData"));
const SubscriptionHandlers_1 = __importDefault(require("../data/subscription/SubscriptionHandlers"));
const moment_1 = __importDefault(require("moment"));
// import InvoiceHandlers from "../data/checkout/InvoiceHandlers";
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.query;
    const data = yield DataProvider_1.default.create();
    const subscription = yield (yield SubscriptionHandlers_1.default.create(data)).get({
        administrator: user === null || user === void 0 ? void 0 : user.toString()
    });
    const subscriptions = user != null ? yield (yield SubscriptionHandlers_1.default.create(data)).getSubscriptionByUser(subscription === null || subscription === void 0 ? void 0 : subscription.user) :
        yield (yield SubscriptionData_1.default.create(data)).getAll();
    return res.respond({
        subscriptions
    });
}));
exports.getSubscriptions = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order, fromDate, toDate } = req.query;
    const data = yield DataProvider_1.default.create();
    const dateRange = fromDate && toDate ? { startDate: fromDate ? fromDate.toString() : null, endDate: toDate ? toDate.toString() : null } : null;
    // @ts-ignore
    const subscriptions = yield (yield SubscriptionHandlers_1.default.create(data)).getAll(order && order.toString(), dateRange);
    return res.respond({
        subscriptions
    });
}));
exports.getSubscription = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, subscription_plan } = req.query;
    const data = yield DataProvider_1.default.create();
    // @ts-ignore
    const subscription = yield (yield SubscriptionHandlers_1.default.create(data)).get({ user, subscription_plan });
    return res.respond({
        subscription
    });
}));
exports.getSingleSubscription = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    // @ts-ignore
    const subscription = yield (yield SubscriptionHandlers_1.default.create(data)).get(req.body);
    return res.respond({
        subscription
    });
}));
exports.extendSubscription = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, days } = req.body;
    const data = yield DataProvider_1.default.create();
    const subscription = yield (yield SubscriptionHandlers_1.default.create(data)).getById(id);
    console.log(subscription);
    if (subscription) {
        const today = ((0, moment_1.default)(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ'));
        const diff = ((0, moment_1.default)(subscription.expires_at)).diff(today);
        console.log("diff", diff);
        const current_expiry = ((0, moment_1.default)(subscription.expires_at)).add(Number(days), 'days').format('YYYY-MM-DDTHH:mm:ssZ');
        console.log("expiry_date", current_expiry);
        yield (yield SubscriptionHandlers_1.default.create(data)).update({ id, expires_at: current_expiry });
    }
    return res.respond({
        subscription
    });
}));
//# sourceMappingURL=subscriptions.js.map