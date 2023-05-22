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
exports.create = exports.updateCompany = exports.getCompany = exports.createCompany = void 0;
const CompanyController_1 = __importDefault(require("./CompanyController"));
const createCompany = (company) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield company.create(input);
});
exports.createCompany = createCompany;
const getCompany = (company) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield company.get(input);
});
exports.getCompany = getCompany;
const updateCompany = (company) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield company.update(req);
});
exports.updateCompany = updateCompany;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = yield CompanyController_1.default.create(data);
        return {
            create: (0, exports.createCompany)(company),
            get: (0, exports.getCompany)(company),
            update: (0, exports.updateCompany)(company),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=CompanyHandlers.js.map