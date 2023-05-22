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
exports.create = exports.deleteUserLicense = exports.updateUserLicense = exports.completeGame = exports.updateUserStatus = exports.createUserLicense = exports.getLicense = exports.getUserLicensesByLicenseId = exports.getUserLicense = exports.getUserLicenses = void 0;
const UserLicenseData_1 = __importDefault(require("./UserLicenseData"));
const getUserLicenses = (userLicense) => () => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.getUserLicenses();
});
exports.getUserLicenses = getUserLicenses;
const getUserLicense = (userLicense) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.getById(id);
});
exports.getUserLicense = getUserLicense;
const getUserLicensesByLicenseId = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.getByLicenseId(input);
});
exports.getUserLicensesByLicenseId = getUserLicensesByLicenseId;
const getLicense = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.get(input);
});
exports.getLicense = getLicense;
const createUserLicense = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.create(input);
});
exports.createUserLicense = createUserLicense;
const updateUserStatus = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.updateStatus(input);
});
exports.updateUserStatus = updateUserStatus;
const completeGame = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.completeGame(input);
});
exports.completeGame = completeGame;
const updateUserLicense = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.update(input);
});
exports.updateUserLicense = updateUserLicense;
const deleteUserLicense = (userLicense) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return userLicense.delete(id);
});
exports.deleteUserLicense = deleteUserLicense;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userLicenses = yield UserLicenseData_1.default.create(data);
        return {
            getUserLicenses: (0, exports.getUserLicenses)(userLicenses),
            get: (0, exports.getLicense)(userLicenses),
            getById: (0, exports.getUserLicense)(userLicenses),
            getByLicenseId: (0, exports.getUserLicensesByLicenseId)(userLicenses),
            create: (0, exports.createUserLicense)(userLicenses),
            update: (0, exports.updateUserLicense)(userLicenses),
            updateStatus: (0, exports.updateUserStatus)(userLicenses),
            completeGame: (0, exports.completeGame)(userLicenses),
            delete: (0, exports.deleteUserLicense)(userLicenses)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserLicenseController.js.map