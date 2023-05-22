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
exports.create = exports.updateUser = exports.createUser = exports.getEmailsByLicense = exports.getTeamUsersByUserId = exports.getUserByUsername = exports.getUserLicense = exports.getUserLicenseByEmail = exports.getUserByEmail = exports.getSingleUser = exports.getUserList = exports.getUser = void 0;
const UserController_1 = __importDefault(require("./UserController"));
const getUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getUser(input);
});
exports.getUser = getUser;
const getUserList = (users) => () => __awaiter(void 0, void 0, void 0, function* () {
    return users.getList();
});
exports.getUserList = getUserList;
const getSingleUser = (users) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    return id && users.get({ id });
});
exports.getSingleUser = getSingleUser;
const getUserByEmail = (users) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    return email && users.getEmail({ email });
});
exports.getUserByEmail = getUserByEmail;
const getUserLicenseByEmail = (users) => (email) => __awaiter(void 0, void 0, void 0, function* () {
    return email && users.getUserLicense({ email });
});
exports.getUserLicenseByEmail = getUserLicenseByEmail;
const getUserLicense = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getUserWithLicense(input);
});
exports.getUserLicense = getUserLicense;
const getUserByUsername = (users) => (username) => __awaiter(void 0, void 0, void 0, function* () {
    return username && users.getUsername({ username });
});
exports.getUserByUsername = getUserByUsername;
const getTeamUsersByUserId = (users) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getTeamUsersByUserId(user);
});
exports.getTeamUsersByUserId = getTeamUsersByUserId;
const getEmailsByLicense = (users) => (license) => __awaiter(void 0, void 0, void 0, function* () {
    return users.getEmails(license);
});
exports.getEmailsByLicense = getEmailsByLicense;
const createUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users.create(input);
});
exports.createUser = createUser;
const updateUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users.update(input);
});
exports.updateUser = updateUser;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield UserController_1.default.create(data);
        return {
            getUserList: (0, exports.getUserList)(users),
            getSingleUser: (0, exports.getSingleUser)(users),
            get: (0, exports.getSingleUser)(users),
            getUser: (0, exports.getUser)(users),
            getEmail: (0, exports.getUserByEmail)(users),
            getEmails: (0, exports.getEmailsByLicense)(users),
            getUserLicense: (0, exports.getUserLicenseByEmail)(users),
            getUserWithLicense: (0, exports.getUserLicense)(users),
            getUsername: (0, exports.getUserByUsername)(users),
            getTeamUsersByUserId: (0, exports.getTeamUsersByUserId)(users),
            update: (0, exports.updateUser)(users),
            create: (0, exports.createUser)(users),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserHandlers.js.map