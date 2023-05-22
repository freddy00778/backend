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
exports.createSubGame = exports.getSubGame = exports.getSubGames = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const omit_1 = __importDefault(require("omit"));
const SubGameHandlers_1 = __importDefault(require("../data/subgames/SubGameHandlers"));
exports.getSubGames = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const subgames = yield (yield SubGameHandlers_1.default.create(data)).getList();
    // const shuffledGames =
    res.respond({
        body: req.body,
        data: subgames
    });
}));
exports.getSubGame = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield DataProvider_1.default.create();
    // const subgame =  await (await SubGameHandlers.create(data)).get({id })
    const subgame = yield (yield SubGameHandlers_1.default.create(data)).get({ question: id });
    res.respond({
        data: subgame
    });
}));
exports.createSubGame = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { question, statement_1, statement_2, statement_3, statement_4, statement_5, statement_6, answer_1, answer_2, answer_3, answer_4, answer_5, answer_6, } = req.body;
    const options = {
        statement_1, statement_2, statement_3, statement_4, statement_5, statement_6,
        answer_1, answer_2, answer_3, answer_4, answer_5, answer_6,
    };
    const body = Object.assign(Object.assign({}, req.body), { question, options: options });
    console.log("options", body);
    const questionsBodyObject = (0, omit_1.default)([
        'statement_1', 'statement_2', 'statement_3', 'statement_4', 'statement_5', 'statement_6',
        'answer_1', 'answer_2', 'answer_3', 'answer_4', 'answer_5', 'answer_6'
    ], body);
    const questionExists = yield (yield SubGameHandlers_1.default.create(data)).get({ question });
    const inserted = questionExists ? yield (yield SubGameHandlers_1.default.create(data)).update(questionsBodyObject) :
        yield (yield SubGameHandlers_1.default.create(data)).create(questionsBodyObject);
    res.respond({
        data: inserted
    });
}));
//# sourceMappingURL=subgames.js.map