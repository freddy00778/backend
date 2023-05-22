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
exports.create = exports.createStep = exports.getStepList = exports.getStep = exports.getStepById = exports.getByGameIdAndColumn = exports.getStepsByGameID = void 0;
const config_1 = require("../../config");
// @ts-ignore
const getStepsByGameID = (steps) => (game) => __awaiter(void 0, void 0, void 0, function* () {
    return steps().select("Step.*", "PhaseStep.id as phase_step_id", "PhaseStep.game as game_id", "PhaseStep.name as phase_step_name", "PhaseStep.video_url as step_video", "" +
        "PhaseStep.enabled as step_enabled", "Phase.name as phase_name", "PhaseStep.column as column", "Question.question", "Question.options", "Question.correct_video_url", "Question.wrong_video_url", "Question.only_media", "Video.link", "Video.mime_type", "Video.description as videoDescription")
        .from('Step')
        .leftJoin('PhaseStep', 'Step.id', 'PhaseStep.step')
        .leftJoin("Phase", "PhaseStep.phase", "Phase.id")
        .leftJoin("Question", "PhaseStep.question", "Question.id")
        .leftJoin("Video", "Question.video", "Video.id")
        .where({ "PhaseStep.game": game })
        .orderBy('order', 'asc');
});
exports.getStepsByGameID = getStepsByGameID;
const getByGameIdAndColumn = (steps) => (game, column) => __awaiter(void 0, void 0, void 0, function* () {
    return steps().select("Step.*", "PhaseStep.id as phase_step_id", "PhaseStep.game as game_id", "PhaseStep.name as phase_step_name", "PhaseStep.video_url as step_video", "PhaseStep.enabled as step_enabled", "Phase.name as phase_name", "Question.question", "Question.options", "Question.correct_video_url", "Question.wrong_video_url")
        .from('Step')
        .leftJoin('PhaseStep', 'Step.id', 'PhaseStep.step')
        .leftJoin("Phase", "PhaseStep.phase", "Phase.id")
        .leftJoin("Question", "PhaseStep.question", "Question.id")
        .where({ "PhaseStep.game": game, "PhaseStep.column": column })
        .orderBy('order', 'asc');
});
exports.getByGameIdAndColumn = getByGameIdAndColumn;
const getStepById = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield steps().select().where({ id: input.id }))[0];
});
exports.getStepById = getStepById;
const getStep = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const stepQb = steps().select("Step.*", "PhaseStep.id as phase_step_id", "PhaseStep.game as game_id", "PhaseStep.name as phase_step_name", "PhaseStep.video_url as step_video", "PhaseStep.enabled as step_enabled", "Phase.name as phase_name", "Question.question", "Question.options", "Question.correct_video_url", "Question.wrong_video_url", "Question.id as question_id")
        .from('Step')
        .leftJoin('PhaseStep', 'Step.id', 'PhaseStep.step')
        .leftJoin("Phase", "PhaseStep.phase", "Phase.id")
        .leftJoin("Question", "PhaseStep.question", "Question.id");
    if (input && input.id) {
        stepQb.where("Step.id", input.id);
    }
    if (input && input.order) {
        stepQb.where("Step.order", input.order);
    }
    return stepQb.first();
});
exports.getStep = getStep;
const getStepList = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = steps().select();
    if (input)
        query.where(input);
    return yield query;
});
exports.getStepList = getStepList;
const createStep = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield steps().insert(input, ['id']))[0];
});
exports.createStep = createStep;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const steps = () => data.postgres.withSchema(config_1.Database.schema).table('Step');
        return {
            create: (0, exports.createStep)(steps),
            list: (0, exports.getStepList)(steps),
            getStepById: (0, exports.getStepById)(steps),
            get: (0, exports.getStep)(steps),
            getStepsByGameID: (0, exports.getStepsByGameID)(steps),
            getByGameIdAndColumn: (0, exports.getByGameIdAndColumn)(steps)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=StepData.js.map