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
exports.create = exports.updateQuestion = exports.getQuestion = exports.createQuestion = exports.getQuestions = void 0;
const QuestionController_1 = __importDefault(require("./QuestionController"));
const getQuestions = (questions) => () => __awaiter(void 0, void 0, void 0, function* () {
    return questions.list();
});
exports.getQuestions = getQuestions;
const createQuestion = (questions) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questions.create(req);
});
exports.createQuestion = createQuestion;
const getQuestion = (questions) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questions.get(req);
});
exports.getQuestion = getQuestion;
const updateQuestion = (questions) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield questions.update(req);
});
exports.updateQuestion = updateQuestion;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = yield QuestionController_1.default.create(data);
        return {
            getList: (0, exports.getQuestions)(questions),
            get: (0, exports.getQuestion)(questions),
            create: (0, exports.createQuestion)(questions),
            update: (0, exports.updateQuestion)(questions),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=QuestionHandlers.js.map