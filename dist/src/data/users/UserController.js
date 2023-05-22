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
exports.create = exports.updateUser = exports.createUser = exports.getUserList = exports.getTeamUsersByUserId = exports.getUserByUsername = exports.getEmailsByLicense = exports.getUserLicense = exports.getUserLicenseByEmail = exports.getUserByEmail = exports.getUser = exports.getUserObject = void 0;
const UserData_1 = __importDefault(require("./UserData"));
const getUserObject = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getUser(input);
});
exports.getUserObject = getUserObject;
const getUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.get(input);
});
exports.getUser = getUser;
const getUserByEmail = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getEmail(input);
});
exports.getUserByEmail = getUserByEmail;
const getUserLicenseByEmail = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getUserLicense(input);
});
exports.getUserLicenseByEmail = getUserLicenseByEmail;
const getUserLicense = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getUserWithLicense(input);
});
exports.getUserLicense = getUserLicense;
const getEmailsByLicense = (users) => (license) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getEmails(license);
});
exports.getEmailsByLicense = getEmailsByLicense;
const getUserByUsername = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getUsername(input);
});
exports.getUserByUsername = getUserByUsername;
const getTeamUsersByUserId = (users) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getTeamUsersByUserId(user);
});
exports.getTeamUsersByUserId = getTeamUsersByUserId;
const getUserList = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getList(input);
});
exports.getUserList = getUserList;
const createUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.create(input);
});
exports.createUser = createUser;
const updateUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.update(input);
});
exports.updateUser = updateUser;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserData_1.default.create(data);
        return {
            getUser: (0, exports.getUserObject)(users),
            get: (0, exports.getUser)(users),
            getEmail: (0, exports.getUserByEmail)(users),
            getEmails: (0, exports.getEmailsByLicense)(users),
            getUserLicense: (0, exports.getUserLicenseByEmail)(users),
            getUserWithLicense: (0, exports.getUserLicense)(users),
            getUsername: (0, exports.getUserByUsername)(users),
            getTeamUsersByUserId: (0, exports.getTeamUsersByUserId)(users),
            getList: (0, exports.getUserList)(users),
            update: (0, exports.updateUser)(users),
            create: (0, exports.createUser)(users),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserController.js.map