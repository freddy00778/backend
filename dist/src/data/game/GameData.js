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
exports.create = exports.getGameById = exports.updateGame = exports.createGame = exports.getGameList = void 0;
const config_1 = require("../../config");
const getGameList = (games) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = games().select();
    if (input)
        query.where(input);
    return yield query;
});
exports.getGameList = getGameList;
const createGame = (games) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield games().insert(input, ['id', 'name', 'description']))[0];
});
exports.createGame = createGame;
const updateGame = (games) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield games().select().where({ id: input.id }).update(input));
});
exports.updateGame = updateGame;
const getGameById = (games) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield games().select().where({ id: id }))[0];
});
exports.getGameById = getGameById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const games = () => data.postgres.withSchema(config_1.Database.schema).table('Game');
        return {
            list: (0, exports.getGameList)(games),
            getById: (0, exports.getGameById)(games),
            create: (0, exports.createGame)(games),
            update: (0, exports.updateGame)(games)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=GameData.js.map