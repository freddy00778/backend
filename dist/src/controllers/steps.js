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
exports.getByGameAndColumn = exports.getByGame = exports.create = exports.getPhaseStep = exports.getStep = exports.getAll = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const StepHandlers_1 = __importDefault(require("../data/steps/StepHandlers"));
// import omit from  "omit"
const PhaseStepHandlers_1 = __importDefault(require("../data/phaseSteps/PhaseStepHandlers"));
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req);
    const data = yield DataProvider_1.default.create();
    const steps = yield (yield StepHandlers_1.default.create(data)).getStepList();
    return res.respond({
        steps
    });
}));
exports.getStep = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("req", req);
    const data = yield DataProvider_1.default.create();
    const step = yield (yield StepHandlers_1.default.create(data)).get({ id });
    return res.respond({
        step
    });
}));
exports.getPhaseStep = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log("req", req)
    const data = yield DataProvider_1.default.create();
    const step = yield (yield PhaseStepHandlers_1.default.create(data)).get({ id });
    console.log("phase step ", step);
    return res.respond({
        step
    });
}));
exports.create = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, game, question, step, column, phase } = req.body;
    const data = yield DataProvider_1.default.create();
    const stepOrder = Number(column) == 1 ? step : Number(column) === 2 ? Number(step) + 4 : Number(column) === 3 ? Number(step) + 8 : Number(column) === 4
        ? Number(step) + 12 : Number(column) === 5 ? Number(step) + 16 :
        Number(column) === 6 ? Number(step) + 20 :
            Number(column) === 7 ? Number(step) + 24 :
                Number(column) === 8 ? Number(step) + 28 :
                    Number(column) === 9 ? Number(step) + 32 :
                        Number(column) === 10 ? Number(step) + 36 :
                            Number(column) === 11 ? Number(step) + 40 :
                                Number(column) === 12 ? Number(step) + 44 :
                                    Number(column) === 13 ? Number(step) + 48 :
                                        null;
    const stepObject = yield (yield StepHandlers_1.default.create(data)).get({ order: stepOrder });
    // @ts-ignore
    const insertedStep = stepObject ? stepObject : yield (yield StepHandlers_1.default.create(data)).create({ order: stepOrder, name: stepOrder });
    console.log("Main step", stepOrder);
    console.log("inserted step", insertedStep);
    const body = Object.assign(Object.assign({}, req.body), { game: game, name,
        description,
        column, question: question.value, step: insertedStep.id, phase: phase.value });
    // const stepBodyObject = omit(["step"], body)
    //@ts-ignore
    yield (yield PhaseStepHandlers_1.default.create(data)).create(body);
    res.respond({
        step
    });
}));
exports.getByGame = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    const steps = yield (yield StepHandlers_1.default.create(data)).getStepsByGameID(id);
    return res.respond({
        steps
    });
}));
exports.getByGameAndColumn = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, column } = req.query;
    const data = yield DataProvider_1.default.create();
    // @ts-ignore
    const steps = yield (yield StepHandlers_1.default.create(data)).getByGameIdAndColumn(id, column);
    return res.respond({
        steps
    });
}));
//# sourceMappingURL=steps.js.map