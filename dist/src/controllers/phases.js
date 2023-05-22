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
exports.getAll = exports.create = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const PhaseHandlers_1 = __importDefault(require("../data/phases/PhaseHandlers"));
exports.create = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {name, description} = req.body
    // if (!(name && description)){
    //     return res.status(400).send("name and description are required")
    // }
    const data = yield DataProvider_1.default.create();
    const phase = yield (yield PhaseHandlers_1.default.create(data)).create(req.body);
    res.respond({
        phase
    });
}));
exports.getAll = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Log", req);
    const data = yield DataProvider_1.default.create();
    const phases = yield (yield PhaseHandlers_1.default.create(data)).getList();
    return res.respond({
        phases
    });
}));
//# sourceMappingURL=phases.js.map