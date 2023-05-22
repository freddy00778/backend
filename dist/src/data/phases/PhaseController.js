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
exports.create = exports.createPhase = exports.getList = void 0;
const PhaseData_1 = __importDefault(require("./PhaseData"));
const getList = (phases) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return phases.list(input);
});
exports.getList = getList;
const createPhase = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return steps.create(input);
});
exports.createPhase = createPhase;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const phases = yield PhaseData_1.default.create(data);
        return {
            list: (0, exports.getList)(phases),
            create: (0, exports.createPhase)(phases),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PhaseController.js.map