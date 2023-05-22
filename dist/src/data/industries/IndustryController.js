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
exports.create = exports.createIndustry = exports.getIndustries = void 0;
const IndustryData_1 = __importDefault(require("./IndustryData"));
const getIndustries = (industries) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return industries.getList(input);
});
exports.getIndustries = getIndustries;
const createIndustry = (industries) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return industries.create(input);
});
exports.createIndustry = createIndustry;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const industries = yield IndustryData_1.default.create(data);
        return {
            list: (0, exports.getIndustries)(industries),
            create: (0, exports.createIndustry)(industries),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=IndustryController.js.map