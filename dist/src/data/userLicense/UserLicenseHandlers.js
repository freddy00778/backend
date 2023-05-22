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
exports.create = exports.getUserLicenseByLicenseId = exports.getUserLicense = exports.getLicenseById = exports.deleteUserLicense = exports.completeGame = exports.updateUserStatus = exports.updateLicense = exports.createUserLicense = exports.getUserLicenses = void 0;
const UserLicenseController_1 = __importDefault(require("./UserLicenseController"));
const getUserLicenses = (userLicense) => () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.getUserLicenses();
});
exports.getUserLicenses = getUserLicenses;
const createUserLicense = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.create(input);
});
exports.createUserLicense = createUserLicense;
const updateLicense = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.update(input);
});
exports.updateLicense = updateLicense;
const updateUserStatus = (userLicense) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.updateStatus(req);
});
exports.updateUserStatus = updateUserStatus;
const completeGame = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.completeGame(input);
});
exports.completeGame = completeGame;
const deleteUserLicense = (userLicense) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.delete(id);
});
exports.deleteUserLicense = deleteUserLicense;
const getLicenseById = (userLicense) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.getById(id);
});
exports.getLicenseById = getLicenseById;
const getUserLicense = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.get(input);
});
exports.getUserLicense = getUserLicense;
const getUserLicenseByLicenseId = (userLicense) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userLicense.getByLicenseId(input);
});
exports.getUserLicenseByLicenseId = getUserLicenseByLicenseId;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userLicense = yield UserLicenseController_1.default.create(data);
        return {
            getUserLicenses: (0, exports.getUserLicenses)(userLicense),
            create: (0, exports.createUserLicense)(userLicense),
            update: (0, exports.updateLicense)(userLicense),
            updateStatus: (0, exports.updateUserStatus)(userLicense),
            completeGame: (0, exports.completeGame)(userLicense),
            getById: (0, exports.getLicenseById)(userLicense),
            get: (0, exports.getUserLicense)(userLicense),
            getByLicenseId: (0, exports.getUserLicenseByLicenseId)(userLicense),
            delete: (0, exports.deleteUserLicense)(userLicense)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserLicenseHandlers.js.map