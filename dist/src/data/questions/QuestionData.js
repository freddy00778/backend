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
exports.create = exports.updateQuestion = exports.createQuestion = exports.getQuestion = exports.getQuestions = void 0;
const config_1 = require("../../config");
const getQuestions = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = questions().select("Question.*").from('Question')
        .leftJoin('PhaseStep', 'Question.id', 'PhaseStep.question')
        .leftJoin("Step", "PhaseStep.step", "Step.id");
    if (input)
        query.where(input);
    return yield query.orderBy("Step.order", "asc");
});
exports.getQuestions = getQuestions;
const getQuestion = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = questions().select();
    if (input)
        query.where(input);
    return yield query.orderBy("created_at", "desc").first();
});
exports.getQuestion = getQuestion;
const createQuestion = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield questions().insert(input, ['id', 'question']))[0];
});
exports.createQuestion = createQuestion;
const updateQuestion = (questions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield questions().select().where({ id: input.id }).update(input));
});
exports.updateQuestion = updateQuestion;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = () => data.postgres.withSchema(config_1.Database.schema).table('Question');
        return {
            getList: (0, exports.getQuestions)(questions),
            get: (0, exports.getQuestion)(questions),
            update: (0, exports.updateQuestion)(questions),
            create: (0, exports.createQuestion)(questions),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=QuestionData.js.map