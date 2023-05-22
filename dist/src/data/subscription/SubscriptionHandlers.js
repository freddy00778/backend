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
exports.create = exports.getSubscriptionByUser = exports.getSubscriptionPlanById = exports.updateSubscription = exports.createSubscriptionPlan = exports.getSubscription = exports.getAll = void 0;
const SubscriptionController_1 = __importDefault(require("./SubscriptionController"));
const getAll = (subscription) => (order, dateRange, input) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.getAll(order, dateRange, input);
});
exports.getAll = getAll;
const getSubscription = (subscription) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription.get(input);
});
exports.getSubscription = getSubscription;
const createSubscriptionPlan = (subscription) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription.create(req);
});
exports.createSubscriptionPlan = createSubscriptionPlan;
const updateSubscription = (subscription) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription.update(input);
});
exports.updateSubscription = updateSubscription;
const getSubscriptionPlanById = (subscription) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subscription.getById(id);
});
exports.getSubscriptionPlanById = getSubscriptionPlanById;
const getSubscriptionByUser = (subscription) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    return subscription.getSubscriptionByUser(user);
});
exports.getSubscriptionByUser = getSubscriptionByUser;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscription = yield SubscriptionController_1.default.create(data);
        return {
            getAll: (0, exports.getAll)(subscription),
            get: (0, exports.getSubscription)(subscription),
            create: (0, exports.createSubscriptionPlan)(subscription),
            update: (0, exports.updateSubscription)(subscription),
            getById: (0, exports.getSubscriptionPlanById)(subscription),
            getSubscriptionByUser: (0, exports.getSubscriptionByUser)(subscription)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubscriptionHandlers.js.map