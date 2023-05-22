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
exports.getNextStep = exports.getKCTries = exports.getProgress = exports.updateProgress = exports.createProgress = exports.getById = exports.getAll = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const SubscriptionPlanHandlers_1 = __importDefault(require("../data/subscriptionPlan/SubscriptionPlanHandlers"));
const UserProgressHandlers_1 = __importDefault(require("../data/userProgress/UserProgressHandlers"));
const PhaseStepHandlers_1 = __importDefault(require("../data/phaseSteps/PhaseStepHandlers"));
const omit_1 = __importDefault(require("omit"));
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req);
    const { user } = req.params;
    const data = yield DataProvider_1.default.create();
    console.log("user", user);
    const userProgresses = yield (yield UserProgressHandlers_1.default.create(data)).getList();
    return res.respond({
        userProgresses
    });
}));
exports.getById = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    const plan = yield (yield SubscriptionPlanHandlers_1.default.create(data)).getById(id);
    return res.respond(Object.assign({}, plan));
}));
exports.createProgress = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, phaseStep, order, game, 
    // ee_score, et_score, budget_score,
    actual_ee_score, actual_et_score, actual_budget_score, answered_question_only } = req.body;
    if (!user || !phaseStep) {
        return res.status(400).send();
    }
    const data = yield DataProvider_1.default.create();
    const nextOrder = order === undefined ? 1 : Number(order) + 1;
    const nextPhaseStep = nextOrder === 4 || nextOrder === 8 || nextOrder === 12 || nextOrder === 16 ?
        yield (yield PhaseStepHandlers_1.default.create(data)).get({ order: nextOrder }) :
        yield (yield PhaseStepHandlers_1.default.create(data)).get({ order: nextOrder });
    const body = Object.assign(Object.assign({}, req.body), { user,
        game,
        answered_question_only, phaseStep: nextPhaseStep.id, actual_ee_score,
        actual_et_score,
        actual_budget_score });
    const bodyObject = ((0, omit_1.default)(['order', "column", "ee_score", "et_score", "budget_score"], body));
    const progress = yield (yield UserProgressHandlers_1.default.create(data)).create(bodyObject);
    return res.respond({
        progress
    });
}));
exports.updateProgress = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, kc_tries, kc_answered } = req.body;
    const data = yield DataProvider_1.default.create();
    const getUserProgress = yield (yield UserProgressHandlers_1.default.create(data)).getSingleProgress({ user: user });
    console.log("user id", getUserProgress);
    const progress = yield (yield UserProgressHandlers_1.default.create(data)).update({
        id: getUserProgress === null || getUserProgress === void 0 ? void 0 : getUserProgress.id,
        answered_question_only: false,
        kc_tries,
        kc_answered: kc_answered
    });
    return res.respond({
        progress
    });
}));
exports.getProgress = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {user, phaseStep, game} = req.body
    const data = yield DataProvider_1.default.create();
    const progressData = yield (yield UserProgressHandlers_1.default.create(data)).getSingleProgress(req.body);
    const progress = progressData ? progressData : {
        order: 0,
        column: 1
    };
    return res.respond({
        progress
    });
}));
exports.getKCTries = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const data = yield DataProvider_1.default.create();
    const progressData = yield (yield UserProgressHandlers_1.default.create(data)).getSingleProgress({ user });
    return res.respond({
        progress: progressData === null || progressData === void 0 ? void 0 : progressData.kc_tries
    });
}));
exports.getNextStep = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order } = req.body;
    const data = yield DataProvider_1.default.create();
    const nextOrder = order === undefined ? 1 : Number(order) + 1;
    // console.log("Order", order)
    const nextPhaseStep = yield (yield PhaseStepHandlers_1.default.create(data)).get({ order: nextOrder });
    console.log("next order", nextOrder);
    console.log("next phase step", nextPhaseStep);
    return res.respond({
        nextPhaseStep
    });
}));
//# sourceMappingURL=progress.js.map