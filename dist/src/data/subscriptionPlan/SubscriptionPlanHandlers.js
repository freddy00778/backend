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
exports.create = exports.getSubscriptionPlanById = exports.getAll = exports.createSubscriptionPlan = void 0;
const SubscriptionPlanController_1 = __importDefault(require("./SubscriptionPlanController"));
const createSubscriptionPlan = (plan) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield plan.create(req);
});
exports.createSubscriptionPlan = createSubscriptionPlan;
const getAll = (plan) => () => __awaiter(void 0, void 0, void 0, function* () {
    return yield plan.getAll();
});
exports.getAll = getAll;
const getSubscriptionPlanById = (plan) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield plan.getById(id);
});
exports.getSubscriptionPlanById = getSubscriptionPlanById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const plans = yield SubscriptionPlanController_1.default.create(data);
        return {
            getAll: (0, exports.getAll)(plans),
            create: (0, exports.createSubscriptionPlan)(plans),
            getById: (0, exports.getSubscriptionPlanById)(plans)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubscriptionPlanHandlers.js.map