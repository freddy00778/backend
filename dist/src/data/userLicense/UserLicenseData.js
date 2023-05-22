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
exports.create = exports.getUserLicensesByLicenseId = exports.getUserLicense = exports.getUserLicenseById = exports.deleteUserLicense = exports.updateUserStatus = exports.updateUserLicense = exports.completeGame = exports.createUserLicense = exports.getUserLicenses = void 0;
const config_1 = require("../../config");
const getUserLicenses = (userLicenses) => () => __awaiter(void 0, void 0, void 0, function* () {
    return userLicenses().select("UserLicense.*", "License.expiry", "License.user as licenseOwnerUserId", "User.email", "User.id as userId").from('UserLicense')
        .leftJoin("License", "UserLicense.license", "License.id")
        .leftJoin("User", "UserLicense.user", "User.id");
});
exports.getUserLicenses = getUserLicenses;
const createUserLicense = (userLicenses) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield userLicenses().insert(input, ['id', 'license', 'user']))[0];
});
exports.createUserLicense = createUserLicense;
const completeGame = (userLicenses) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield userLicenses().select().where({ license: input.license, user: input.user }).update(input));
});
exports.completeGame = completeGame;
const updateUserLicense = (userLicenses) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield userLicenses().select().where({ id: input.id }).update(input));
});
exports.updateUserLicense = updateUserLicense;
const updateUserStatus = (userLicenses) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield userLicenses().select().where({ license: input.license })
        .where({ user: input.user }).update({ isStarted: true, isInvited: true }));
});
exports.updateUserStatus = updateUserStatus;
const deleteUserLicense = (userLicenses) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield userLicenses().where({ user: id }).del());
});
exports.deleteUserLicense = deleteUserLicense;
const getUserLicenseById = (userLicenses) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield userLicenses().select().where({ id: id }))[0];
});
exports.getUserLicenseById = getUserLicenseById;
const getUserLicense = (userLicenses) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield userLicenses().select().where(input).first());
});
exports.getUserLicense = getUserLicense;
const getUserLicensesByLicenseId = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultQuery = (query().select('UserLicense.*', "User.email", "TeamUser.team as team_id", "License.expiry").from('UserLicense')
        .leftJoin('TeamUser', 'UserLicense.user', 'TeamUser.user')
        .leftJoin('User', 'UserLicense.user', 'User.id')
        .leftJoin('License', 'UserLicense.license', 'License.id')
        .where({ "UserLicense.license": input.license }));
    if (input.team) {
        return defaultQuery.where({ "TeamUser.team": input.team });
    }
    return defaultQuery;
});
exports.getUserLicensesByLicenseId = getUserLicensesByLicenseId;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const licenses = () => data.postgres.withSchema(config_1.Database.schema).table('UserLicense');
        return {
            getUserLicenses: (0, exports.getUserLicenses)(licenses),
            getByLicenseId: (0, exports.getUserLicensesByLicenseId)(licenses),
            get: (0, exports.getUserLicense)(licenses),
            getById: (0, exports.getUserLicenseById)(licenses),
            create: (0, exports.createUserLicense)(licenses),
            update: (0, exports.updateUserLicense)(licenses),
            updateStatus: (0, exports.updateUserStatus)(licenses),
            completeGame: (0, exports.completeGame)(licenses),
            delete: (0, exports.deleteUserLicense)(licenses),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserLicenseData.js.map