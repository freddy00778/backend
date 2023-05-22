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
exports.getById = void 0;
const SubscriptionPlanHandlers_1 = __importDefault(require("../data/subscriptionPlan/SubscriptionPlanHandlers"));
const getById = (item, data) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield SubscriptionPlanHandlers_1.default.create(data)).getById(item.id);
});
exports.getById = getById;
//# sourceMappingURL=subscriptionPlanService.js.map