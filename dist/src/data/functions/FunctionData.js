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
exports.create = exports.createFunction = exports.getFunctions = void 0;
const config_1 = require("../../config");
const getFunctions = (functions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = functions().select();
    if (input)
        query.where(input);
    return yield query;
});
exports.getFunctions = getFunctions;
const createFunction = (functions) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield functions().insert(input, ['id', 'name']))[0];
});
exports.createFunction = createFunction;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const functions = () => data.postgres.withSchema(config_1.Database.schema).table('Function');
        return {
            getList: (0, exports.getFunctions)(functions),
            create: (0, exports.createFunction)(functions),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=FunctionData.js.map