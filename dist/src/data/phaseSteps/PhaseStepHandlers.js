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
exports.create = exports.createStep = exports.getPhaseStep = exports.getById = exports.getStepList = void 0;
const PhaseStepController_1 = __importDefault(require("./PhaseStepController"));
const getStepList = (steps) => () => __awaiter(void 0, void 0, void 0, function* () {
    return steps.list();
});
exports.getStepList = getStepList;
const getById = (steps) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    return steps.getStepById(user);
});
exports.getById = getById;
const getPhaseStep = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return steps.get(input);
});
exports.getPhaseStep = getPhaseStep;
const createStep = (steps) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield steps.create(req);
});
exports.createStep = createStep;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const steps = yield PhaseStepController_1.default.create(data);
        return {
            create: (0, exports.createStep)(steps),
            getStepList: (0, exports.getStepList)(steps),
            get: (0, exports.getPhaseStep)(steps),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PhaseStepHandlers.js.map