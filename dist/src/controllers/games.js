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
exports.getGame = exports.getAll = exports.create = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const GameHandlers_1 = __importDefault(require("../data/game/GameHandlers"));
exports.create = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { media } = req.body;
    const body = Object.assign(Object.assign({}, req.body), { media: media.value });
    console.log("Body", body);
    const game = (yield GameHandlers_1.default.create(data)).create(body);
    return res.respond({
        game
    });
}));
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const games = yield (yield GameHandlers_1.default.create(data)).list();
    console.log("data", req.body);
    return res.respond({
        games
    });
}));
exports.getGame = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    const games = yield (yield GameHandlers_1.default.create(data)).getById(id);
    console.log("data", req.body);
    return res.respond({
        games
    });
}));
//# sourceMappingURL=games.js.map