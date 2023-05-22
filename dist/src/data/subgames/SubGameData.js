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
exports.create = exports.updateSubGame = exports.createSubGame = exports.getSubGame = exports.getSubGames = void 0;
const config_1 = require("../../config");
const getSubGames = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = subgames().select("SubGame.*").from('SubGame')
        .leftJoin('Question', 'SubGame.question', 'Question.id');
    if (input)
        query.where(input);
    return yield query.orderBy("SubGame.created_at", "desc");
});
exports.getSubGames = getSubGames;
const getSubGame = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = subgames().select("SubGame.*").from('SubGame')
        .leftJoin('Question', 'SubGame.question', 'Question.id');
    if (input === null || input === void 0 ? void 0 : input.question) {
        query.where("SubGame.question", input.question);
    }
    if (input && !(input === null || input === void 0 ? void 0 : input.question))
        query.where(input);
    return yield query.first();
});
exports.getSubGame = getSubGame;
const createSubGame = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield subgames().insert(input, ['id', 'question', 'options']))[0];
});
exports.createSubGame = createSubGame;
const updateSubGame = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield subgames().select().where({ question: input.question }).update(input));
});
exports.updateSubGame = updateSubGame;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const subgames = () => data.postgres.withSchema(config_1.Database.schema).table('SubGame');
        return {
            getList: (0, exports.getSubGames)(subgames),
            get: (0, exports.getSubGame)(subgames),
            update: (0, exports.updateSubGame)(subgames),
            create: (0, exports.createSubGame)(subgames),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubGameData.js.map