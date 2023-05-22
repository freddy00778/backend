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
exports.create = exports.updateSubscription = exports.getSubscriptionByUser = exports.createSubscription = exports.getSubscription = exports.getSingleSubscription = exports.getAll = void 0;
const SubscriptionData_1 = __importDefault(require("./SubscriptionData"));
const getAll = (subscription) => (order, dateRange, input) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.getAll(order, dateRange, input);
});
exports.getAll = getAll;
const getSingleSubscription = (subscription) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.get(input);
});
exports.getSingleSubscription = getSingleSubscription;
const getSubscription = (subscription) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.getById(id);
});
exports.getSubscription = getSubscription;
const createSubscription = (subscription) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.create(input);
});
exports.createSubscription = createSubscription;
const getSubscriptionByUser = (subscription) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.getSubscriptionByUser(user);
});
exports.getSubscriptionByUser = getSubscriptionByUser;
const updateSubscription = (subscription) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.update(input);
});
exports.updateSubscription = updateSubscription;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptions = yield SubscriptionData_1.default.create(data);
        return {
            getAll: (0, exports.getAll)(subscriptions),
            get: (0, exports.getSingleSubscription)(subscriptions),
            getById: (0, exports.getSubscription)(subscriptions),
            create: (0, exports.createSubscription)(subscriptions),
            getSubscriptionByUser: (0, exports.getSubscriptionByUser)(subscriptions),
            update: (0, exports.updateSubscription)(subscriptions)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubscriptionController.js.map