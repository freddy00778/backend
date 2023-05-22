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
exports.create = exports.createIndustry = exports.getIndustries = void 0;
const config_1 = require("../../config");
const getIndustries = (industries) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = industries().select();
    if (input)
        query.where(input);
    return yield query;
});
exports.getIndustries = getIndustries;
const createIndustry = (industries) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield industries().insert(input, ['id', 'name']))[0];
    return result;
});
exports.createIndustry = createIndustry;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const industries = () => data.postgres.withSchema(config_1.Database.schema).table('Industry');
        return {
            getList: (0, exports.getIndustries)(industries),
            create: (0, exports.createIndustry)(industries),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=IndustryData.js.map