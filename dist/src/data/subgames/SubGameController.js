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
exports.create = exports.createSubGame = exports.updateSubGame = exports.getSubGame = exports.getSubGames = void 0;
const SubGameData_1 = __importDefault(require("./SubGameData"));
const getSubGames = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return subgames.getList(input);
});
exports.getSubGames = getSubGames;
const getSubGame = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return subgames.get(input);
});
exports.getSubGame = getSubGame;
const updateSubGame = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return subgames.update(input);
});
exports.updateSubGame = updateSubGame;
const createSubGame = (subgames) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return subgames.create(input);
});
exports.createSubGame = createSubGame;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const subgames = yield SubGameData_1.default.create(data);
        return {
            list: (0, exports.getSubGames)(subgames),
            get: (0, exports.getSubGame)(subgames),
            update: (0, exports.updateSubGame)(subgames),
            create: (0, exports.createSubGame)(subgames),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubGameController.js.map