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
exports.create = exports.createPhase = exports.getList = void 0;
const config_1 = require("../../config");
const getList = (phases) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = phases().select();
    if (input)
        query.where(input);
    return yield query;
});
exports.getList = getList;
const createPhase = (phases) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield phases().insert(input, ['id']))[0];
});
exports.createPhase = createPhase;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const phases = () => data.postgres.withSchema(config_1.Database.schema).table('Phase');
        return {
            create: (0, exports.createPhase)(phases),
            list: (0, exports.getList)(phases),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=PhaseData.js.map