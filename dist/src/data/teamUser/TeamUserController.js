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
exports.create = exports.deleteTeamUser = exports.updateTeamUser = exports.createTeamUser = exports.getCounts = exports.getTeamMembers = exports.getTeamUser = exports.getTeams = void 0;
const TeamUserData_1 = __importDefault(require("./TeamUserData"));
const getTeams = (teamUser) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return teamUser.getAll(input);
});
exports.getTeams = getTeams;
const getTeamUser = (teamUser) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return teamUser.getById(id);
});
exports.getTeamUser = getTeamUser;
const getTeamMembers = (teamUser) => (team) => __awaiter(void 0, void 0, void 0, function* () {
    return teamUser.getTeamMembers(team);
});
exports.getTeamMembers = getTeamMembers;
const getCounts = (teamUser) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return teamUser.getCount(input);
});
exports.getCounts = getCounts;
const createTeamUser = (teamUser) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return teamUser.create(input);
});
exports.createTeamUser = createTeamUser;
const updateTeamUser = (teamUser) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return teamUser.update(input);
});
exports.updateTeamUser = updateTeamUser;
const deleteTeamUser = (teamUser) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return teamUser.delete(input);
});
exports.deleteTeamUser = deleteTeamUser;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const teamUsers = yield TeamUserData_1.default.create(data);
        return {
            getAll: (0, exports.getTeams)(teamUsers),
            getTeamMembers: (0, exports.getTeamMembers)(teamUsers),
            getById: (0, exports.getTeamUser)(teamUsers),
            getCount: (0, exports.getCounts)(teamUsers),
            create: (0, exports.createTeamUser)(teamUsers),
            update: (0, exports.updateTeamUser)(teamUsers),
            delete: (0, exports.deleteTeamUser)(teamUsers)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=TeamUserController.js.map