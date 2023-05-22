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
exports.create = exports.createGame = exports.getGame = exports.getGameList = void 0;
const GameData_1 = __importDefault(require("./GameData"));
const getGameList = (game) => () => __awaiter(void 0, void 0, void 0, function* () {
    return game.list();
});
exports.getGameList = getGameList;
const getGame = (game) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return game.getById(id);
});
exports.getGame = getGame;
const createGame = (game) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return game.create(input);
});
exports.createGame = createGame;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const games = yield GameData_1.default.create(data);
        return {
            list: (0, exports.getGameList)(games),
            getById: (0, exports.getGame)(games),
            create: (0, exports.createGame)(games),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=GameController.js.map