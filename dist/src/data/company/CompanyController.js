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
const CompanyData_1 = __importDefault(require("./CompanyData"));
const createCompany = (company) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return company.create(input);
});
exports.createCompany = createCompany;
const getCompany = (company) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return company.get(input);
});
exports.getCompany = getCompany;
const updateCompany = (license) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return license.update(input);
});
exports.updateCompany = updateCompany;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = yield CompanyData_1.default.create(data);
        return {
            create: (0, exports.createCompany)(company),
            get: (0, exports.getCompany)(company),
            update: (0, exports.updateCompany)(company)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=CompanyController.js.map