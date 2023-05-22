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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.updateCompany = exports.getCompany = exports.createCompany = void 0;
const config_1 = require("../../config");
const createCompany = (company) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield company().insert(input, ['id', 'name']))[0];
});
exports.createCompany = createCompany;
// export const createCompany = (company: () => QueryBuilder) => async (input?: CreateInput) => {
//     return (await company().insert(input, ['id', 'name']) as [{ id: string }])[0];
// }
const getCompany = (company) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield company().select().where(input).first());
});
exports.getCompany = getCompany;
const updateCompany = (company) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield company().select().where({ id: input.id }).update(input));
});
exports.updateCompany = updateCompany;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const company = () => data.postgres.withSchema(config_1.Database.schema).table('Company');
        return {
            create: (0, exports.createCompany)(company),
            get: (0, exports.getCompany)(company),
            update: (0, exports.updateCompany)(company)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=CompanyData.js.map