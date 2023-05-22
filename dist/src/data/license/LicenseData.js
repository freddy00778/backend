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
exports.create = exports.getLicenseById = exports.updateLicense = exports.createLicense = exports.getAll = void 0;
const config_1 = require("../../config");
const getAll = (licenses) => () => __awaiter(void 0, void 0, void 0, function* () {
    const query = licenses().select('License.*').from("License");
    return query.orderBy('created_at', 'desc');
});
exports.getAll = getAll;
const createLicense = (licenses) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield licenses().insert(input, ['id', 'user']))[0];
});
exports.createLicense = createLicense;
const updateLicense = (licenses) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield licenses().select().where({ id: input.id }).update({ isActive: true }));
});
exports.updateLicense = updateLicense;
const getLicenseById = (licenses) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield licenses().select().where({ id: id }))[0];
    //  return licenses().select("License.*", "User.email").from("License")
    //      .leftJoin("User", "License.user", "User.id")
    //      .where({id: id}).first()
});
exports.getLicenseById = getLicenseById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const licenses = () => data.postgres.withSchema(config_1.Database.schema).table('License');
        return {
            getAll: (0, exports.getAll)(licenses),
            getById: (0, exports.getLicenseById)(licenses),
            create: (0, exports.createLicense)(licenses),
            update: (0, exports.updateLicense)(licenses)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=LicenseData.js.map