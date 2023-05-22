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
exports.create = exports.updateProgress = exports.createUserProgress = exports.getProgress = exports.getSingleProgress = void 0;
const omit_1 = __importDefault(require("omit"));
const config_1 = require("../../config");
const getSingleProgress = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = queryBuilder().select('UserProgress.*', "Step.order", "Step.id as stepId", "PhaseStep.column", "Video.link", "Question.question", "Phase.name as phase_name", "Video.name as description", "Question.options as questionOptions", "Question.id as questionId")
        .from('UserProgress')
        .leftJoin('PhaseStep', 'UserProgress.phaseStep', 'PhaseStep.id')
        .leftJoin('Phase', 'PhaseStep.phase', 'Phase.id')
        .leftJoin('Question', 'PhaseStep.question', 'Question.id')
        .leftJoin('Video', 'Question.video', 'Video.id')
        .leftJoin('Step', 'PhaseStep.step', 'Step.id')
        .orderBy("created_at", "desc");
    if (input && input.game) {
        query.where({ "UserProgress.game": input.game });
    }
    if (input && input.user) {
        query.where({ "UserProgress.user": input.user });
    }
    const withoutGameInput = (0, omit_1.default)(['game'], input);
    return query.where(withoutGameInput).first();
});
exports.getSingleProgress = getSingleProgress;
const getProgress = (queryBuilder) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = queryBuilder().select('UserProgress.*', "PhaseStep.name", "PhaseStep.id as phaseStepId", "Step.order", "Step.id as stepId", "Game.id as game_id", "Game.name as game_name", "Video.link", "Question.options as questionOptions", "Question.id as questionId")
        .from('UserProgress')
        .leftJoin('PhaseStep', 'UserProgress.phaseStep', 'PhaseStep.id')
        .leftJoin('Question', 'PhaseStep.question', 'Question.id')
        .leftJoin('Video', 'Question.video', 'Video.id')
        .leftJoin('Step', 'PhaseStep.step', 'Step.id')
        .leftJoin('Game', 'PhaseStep.game', 'Game.id');
    if (input && input.game) {
        query.where({ "PhaseStep.game": input.game });
    }
    return yield query.orderBy("created_at", "desc");
});
exports.getProgress = getProgress;
const createUserProgress = (progress) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (yield progress().select().where(input));
    if (query.length > 0) {
        return query[0];
    }
    return (yield progress().insert(input, ['id', 'user', 'phaseStep']))[0];
});
exports.createUserProgress = createUserProgress;
const updateProgress = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield users().select().where({ id: input.id }).update({
        answered_question_only: input.answered_question_only, kc_tries: input.kc_tries, kc_answered: input.kc_answered
    }));
});
exports.updateProgress = updateProgress;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const progress = () => data.postgres.withSchema(config_1.Database.schema).table('UserProgress');
        return {
            getList: (0, exports.getProgress)(progress),
            update: (0, exports.updateProgress)(progress),
            getSingleProgress: (0, exports.getSingleProgress)(progress),
            create: (0, exports.createUserProgress)(progress),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserProgressData.js.map