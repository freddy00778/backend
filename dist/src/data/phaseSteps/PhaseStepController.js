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
exports.create = exports.createStep = exports.getStepList = exports.getPhaseStep = exports.getStepById = void 0;
const PhaseStepData_1 = __importDefault(require("./PhaseStepData"));
const getStepById = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return steps.getById(input);
});
exports.getStepById = getStepById;
const getPhaseStep = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return steps.get(input);
});
exports.getPhaseStep = getPhaseStep;
const getStepList = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return steps.list(input);
});
exports.getStepList = getStepList;
const createStep = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return steps.create(input);
});
exports.createStep = createStep;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const steps = yield PhaseStepData_1.default.create(data);
        return {
            list: (0, exports.getStepList)(steps),
            create: (0, exports.createStep)(steps),
            getStepById: (0, exports.getStepById)(steps),
            get: (0, exports.getPhaseStep)(steps),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PhaseStepController.js.map