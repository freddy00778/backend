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
exports.create = exports.getGameById = exports.createGame = exports.listGames = void 0;
const GameController_1 = __importDefault(require("./GameController"));
const listGames = (game) => () => __awaiter(void 0, void 0, void 0, function* () {
    return yield game.list();
});
exports.listGames = listGames;
const createGame = (game) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield game.create(req);
});
exports.createGame = createGame;
// export const updateProduct = (product: Controller) => async (req: Request) => {
//   return await product.update(req)
// }
const getGameById = (game) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield game.getById(id);
});
exports.getGameById = getGameById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = yield GameController_1.default.create(data);
        return {
            list: (0, exports.listGames)(game),
            create: (0, exports.createGame)(game),
            // update: updateProduct(product),
            getById: (0, exports.getGameById)(game)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=GameHandlers.js.map