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
exports.createPlan = exports.getById = exports.getAll = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const SubscriptionPlanHandlers_1 = __importDefault(require("../data/subscriptionPlan/SubscriptionPlanHandlers"));
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req);
    const data = yield DataProvider_1.default.create();
    const plans = yield (yield SubscriptionPlanHandlers_1.default.create(data)).getAll();
    return res.respond({
        plans
    });
}));
exports.getById = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    const plan = yield (yield SubscriptionPlanHandlers_1.default.create(data)).getById(id);
    return res.respond(Object.assign({}, plan));
}));
exports.createPlan = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price_per_person, price_per_person_europe, duration_in_days, game, show_on_website } = req.body;
    const data = yield DataProvider_1.default.create();
    const plan_body = Object.assign(Object.assign({}, req.body), { name,
        price_per_person,
        price_per_person_europe,
        duration_in_days, game: game.value, show_on_website });
    const plan = yield (yield SubscriptionPlanHandlers_1.default.create(data)).create(plan_body);
    return res.respond(Object.assign({}, plan));
}));
//# sourceMappingURL=plans.js.map