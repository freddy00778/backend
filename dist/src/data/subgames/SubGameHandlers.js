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
exports.create = exports.updateSubGame = exports.getSubGame = exports.createSubGame = exports.getSubGames = void 0;
const SubGameController_1 = __importDefault(require("./SubGameController"));
const getSubGames = (subgames) => () => __awaiter(void 0, void 0, void 0, function* () {
    return subgames.list();
});
exports.getSubGames = getSubGames;
const createSubGame = (subgames) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subgames.create(req);
});
exports.createSubGame = createSubGame;
const getSubGame = (subgames) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subgames.get(req);
});
exports.getSubGame = getSubGame;
const updateSubGame = (subgames) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield subgames.update(req);
});
exports.updateSubGame = updateSubGame;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const subgames = yield SubGameController_1.default.create(data);
        return {
            getList: (0, exports.getSubGames)(subgames),
            get: (0, exports.getSubGame)(subgames),
            create: (0, exports.createSubGame)(subgames),
            update: (0, exports.updateSubGame)(subgames),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=SubGameHandlers.js.map