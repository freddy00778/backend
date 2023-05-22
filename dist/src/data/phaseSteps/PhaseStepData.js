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
exports.create = exports.createPhaseStep = exports.getStepList = exports.getPhaseStep = exports.getById = void 0;
const config_1 = require("../../config");
const getById = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield steps().select().where({ id: input.id }))[0];
});
exports.getById = getById;
const getPhaseStep = (phaseSteps) => ((input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = phaseSteps().select('PhaseStep.*', "Step.order", "Step.name as step_name", "Phase.name as phase_name", "Step.id as stepId", "Question.id as questionId", "Question.question as scenario", "Question.options as questionOptions", "Question.description")
        .from('PhaseStep')
        .leftJoin('Step', 'PhaseStep.step', 'Step.id')
        .leftJoin('Phase', 'PhaseStep.phase', 'Phase.id')
        .leftJoin('Question', 'PhaseStep.question', 'Question.id');
    // .leftJoin('UserProgress', 'PhaseStep.id', 'UserProgress.phaseStep')
    if (input && input.id) {
        query.where({ "PhaseStep.id": input.id });
    }
    if (input && input.order) {
        query.where({ "Step.order": input.order });
    }
    if (input && input.column) {
        query.where({ "PhaseStep.column": input.column });
    }
    if (input && !input.order && !input.column && !input.id) {
        query.where(input);
    }
    return query.first();
}));
exports.getPhaseStep = getPhaseStep;
const getStepList = (steps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = steps().select();
    if (input)
        query.where(input);
    return yield query;
});
exports.getStepList = getStepList;
const createPhaseStep = (phaseSteps) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield phaseSteps().insert(input, ['id']))[0];
});
exports.createPhaseStep = createPhaseStep;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const phaseSteps = () => data.postgres.withSchema(config_1.Database.schema).table('PhaseStep');
        return {
            create: (0, exports.createPhaseStep)(phaseSteps),
            list: (0, exports.getStepList)(phaseSteps),
            getById: (0, exports.getById)(phaseSteps),
            get: (0, exports.getPhaseStep)(phaseSteps),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PhaseStepData.js.map