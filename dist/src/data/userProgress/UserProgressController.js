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
exports.create = exports.updateProgress = exports.createProgress = exports.getProgress = exports.getSingleProgress = void 0;
const UserProgressData_1 = __importDefault(require("./UserProgressData"));
const getSingleProgress = (progress) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return progress.getSingleProgress(input);
});
exports.getSingleProgress = getSingleProgress;
const getProgress = (progress) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return progress.getList(input);
});
exports.getProgress = getProgress;
const createProgress = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return questions.create(input);
});
exports.createProgress = createProgress;
const updateProgress = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return questions.update(input);
});
exports.updateProgress = updateProgress;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = yield UserProgressData_1.default.create(data);
        return {
            list: (0, exports.getProgress)(questions),
            getSingleProgress: (0, exports.getSingleProgress)(questions),
            update: (0, exports.updateProgress)(questions),
            create: (0, exports.createProgress)(questions),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserProgressController.js.map