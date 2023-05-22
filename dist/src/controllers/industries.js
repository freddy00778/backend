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
exports.createIndustry = exports.getIndustries = void 0;
const errors_1 = require("../errors");
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const IndustryHandlers_1 = __importDefault(require("../data/industries/IndustryHandlers"));
exports.getIndustries = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const industries = yield (yield IndustryHandlers_1.default.create(data)).getList();
    res.respond({
        body: req.body,
        data: industries
    });
}));
exports.createIndustry = (0, errors_1.catchErrors)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const { name } = req.body;
    if (!(name)) {
        res.status(400).send("All inputs are required!");
    }
    const body = Object.assign(Object.assign({}, req.body), { name });
    const inserted = yield (yield IndustryHandlers_1.default.create(data)).create(body);
    res.respond({
        data: inserted
    });
}));
//# sourceMappingURL=industries.js.map