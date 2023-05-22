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
exports.create = exports.getAll = exports.getSubscriptionByUser = exports.getSingleSubscription = exports.getSubscription = exports.updateSubscription = exports.createSubscription = void 0;
const config_1 = require("../../config");
const dateUtil_1 = require("../../utils/dateUtil");
const moment_1 = __importDefault(require("moment"));
const createSubscription = (subscriptions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const queryBuilder = yield subscriptions().select().where({ subscription_plan: input.subscription_plan, user: input.user }).first();
    if (queryBuilder) {
        // @ts-ignore
        const quantity = queryBuilder.quantity;
        // @ts-ignore
        const newQuantity = quantity + input.quantity;
        // @ts-ignore
        yield subscriptions().select().where({ subscription_plan: input.subscription_plan, user: input.user, license: input.license })
            .update({ quantity: newQuantity, expires_at: (0, dateUtil_1.futureDate)(30) });
        return;
    }
    return (yield subscriptions().insert(input, ['id', 'user', 'subscription_plan', 'invoice']))[0];
});
exports.createSubscription = createSubscription;
const updateSubscription = (subscriptions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield subscriptions().select().where({ id: input.id }).update(input));
});
exports.updateSubscription = updateSubscription;
const getSubscription = (subscriptions) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield subscriptions().select().where({ id: id }))[0];
});
exports.getSubscription = getSubscription;
const getSingleSubscription = (subscriptions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = subscriptions().select("Subscription.*", "Invoice.id", "Invoice.license", "SubscriptionPlan.name")
        .from('Subscription')
        .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
        .leftJoin('Invoice', 'Subscription.invoice', 'Invoice.id');
    if (input && input.license) {
        qb.where({ "Subscription.license": input.license });
    }
    if (input && input.user) {
        qb.where({ "Subscription.user": input.user });
    }
    if (input && !input.license && !input.user) {
        qb.where(input);
    }
    return qb.first();
});
exports.getSingleSubscription = getSingleSubscription;
const getSubscriptionByUser = (subscriptions) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    return subscriptions().select("Subscription.*", "Invoice.id", "Invoice.license", "SubscriptionPlan.name")
        .from('Subscription')
        .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
        .leftJoin('Invoice', 'Subscription.invoice', 'Invoice.id')
        .where({ "Subscription.user": user });
});
exports.getSubscriptionByUser = getSubscriptionByUser;
const getAll = (subscriptions) => (order, dateRange, input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = subscriptions().select("Subscription.*", "Subscription.id as sub_id", "Invoice.id", "Invoice.license", "SubscriptionPlan.name", "User.email")
        .from('Subscription')
        .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
        .leftJoin('Invoice', 'Subscription.invoice', 'Invoice.id')
        .leftJoin('User', 'Subscription.user', 'User.id');
    if (input) {
        qb.where(input);
    }
    if (dateRange && dateRange.startDate != 'undefined' && dateRange.endDate != 'undefined') {
        const startDate = (0, moment_1.default)(dateRange === null || dateRange === void 0 ? void 0 : dateRange.startDate).format('YYYY-MM-DDTHH:mm:ssZ');
        const endDate = (0, moment_1.default)(dateRange === null || dateRange === void 0 ? void 0 : dateRange.endDate).format('YYYY-MM-DDTHH:mm:ssZ');
        qb.where('Subscription.created_at', '>=', startDate.toString())
            .where('Subscription.created_at', '<', endDate.toString());
    }
    if (order) {
        if (order === "asc" || order === "desc") {
            return qb.orderBy("created_at", order);
        }
        if (order === "expired") {
            const currentDate = Date.now();
            const todaysDate = (0, moment_1.default)(currentDate).format('YYYY-MM-DDTHH:mm:ssZ');
            return qb.where('expires_at', '<', todaysDate);
        }
        if (order === "not-expired") {
            const currentDate = Date.now();
            const todaysDate = (0, moment_1.default)(currentDate).format('YYYY-MM-DDTHH:mm:ssZ');
            return qb.where('expires_at', '>', todaysDate);
        }
    }
    return qb.orderBy("created_at", "DESC");
});
exports.getAll = getAll;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptions = () => data.postgres.withSchema(config_1.Database.schema).table('Subscription');
        return {
            getAll: (0, exports.getAll)(subscriptions),
            getById: (0, exports.getSubscription)(subscriptions),
            get: (0, exports.getSingleSubscription)(subscriptions),
            getSubscriptionByUser: (0, exports.getSubscriptionByUser)(subscriptions),
            create: (0, exports.createSubscription)(subscriptions),
            update: (0, exports.updateSubscription)(subscriptions)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubscriptionData.js.map