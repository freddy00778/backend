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
exports.create = exports.createQuestion = exports.updateQuestion = exports.getQuestion = exports.getQuestions = void 0;
const QuestionData_1 = __importDefault(require("./QuestionData"));
const getQuestions = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return questions.getList(input);
});
exports.getQuestions = getQuestions;
const getQuestion = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return questions.get(input);
});
exports.getQuestion = getQuestion;
const updateQuestion = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return questions.update(input);
});
exports.updateQuestion = updateQuestion;
const createQuestion = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return questions.create(input);
});
exports.createQuestion = createQuestion;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = yield QuestionData_1.default.create(data);
        return {
            list: (0, exports.getQuestions)(questions),
            get: (0, exports.getQuestion)(questions),
            update: (0, exports.updateQuestion)(questions),
            create: (0, exports.createQuestion)(questions),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=QuestionController.js.map