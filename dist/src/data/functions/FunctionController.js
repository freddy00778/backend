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
exports.create = exports.createFunction = exports.getFunctions = void 0;
const FunctionData_1 = __importDefault(require("./FunctionData"));
const getFunctions = (industries) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return industries.getList(input);
});
exports.getFunctions = getFunctions;
const createFunction = (functions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return functions.create(input);
});
exports.createFunction = createFunction;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const functions = yield FunctionData_1.default.create(data);
        return {
            list: (0, exports.getFunctions)(functions),
            create: (0, exports.createFunction)(functions),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=FunctionController.js.map