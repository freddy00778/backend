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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getSubscriptionPlanById = exports.UpdateSubscriptionPlan = exports.createSubscriptionPlan = exports.getAll = void 0;
const config_1 = require("../../config");
const getAll = (plans) => () => __awaiter(void 0, void 0, void 0, function* () {
    const qb = plans().select("SubscriptionPlan.*", "Game.id as game_id", "Game.name as game_name")
        .from('SubscriptionPlan')
        .leftJoin('Game', 'SubscriptionPlan.game', 'Game.id');
    return qb.orderBy("SubscriptionPlan.created_at", "desc");
});
exports.getAll = getAll;
const createSubscriptionPlan = (qb) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield qb().insert(input, ['id', 'name', 'price_per_person']))[0];
});
exports.createSubscriptionPlan = createSubscriptionPlan;
const UpdateSubscriptionPlan = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield query().select().where({ id: input.id }).update(input));
});
exports.UpdateSubscriptionPlan = UpdateSubscriptionPlan;
const getSubscriptionPlanById = (plans) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield plans().select().where({ id: id }))[0];
});
exports.getSubscriptionPlanById = getSubscriptionPlanById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const plans = () => data.postgres.withSchema(config_1.Database.schema).table('SubscriptionPlan');
        return {
            getAll: (0, exports.getAll)(plans),
            getById: (0, exports.getSubscriptionPlanById)(plans),
            create: (0, exports.createSubscriptionPlan)(plans),
            update: (0, exports.UpdateSubscriptionPlan)(plans)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubscriptionPlanData.js.map