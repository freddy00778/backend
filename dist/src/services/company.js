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
exports.updateCompany = exports.createCompany = void 0;
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const CompanyHandlers_1 = __importDefault(require("../data/company/CompanyHandlers"));
const createCompany = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    return yield (yield CompanyHandlers_1.default.create(data)).create(req);
});
exports.createCompany = createCompany;
const updateCompany = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    return yield (yield CompanyHandlers_1.default.create(data)).update(req.body);
});
exports.updateCompany = updateCompany;
//# sourceMappingURL=company.js.map