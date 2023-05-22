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
exports.create = exports.updateTeam = exports.createTeam = exports.getCounts = exports.getById = exports.getAllById = exports.getAll = exports.getTeams = void 0;
const TeamController_1 = __importDefault(require("./TeamController"));
const getTeams = (team) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return team.getTeams(input);
});
exports.getTeams = getTeams;
const getAll = (team) => (license, input) => __awaiter(void 0, void 0, void 0, function* () {
    return team.getAll(license, input);
});
exports.getAll = getAll;
const getAllById = (team) => (license) => __awaiter(void 0, void 0, void 0, function* () {
    return team.getAll(license);
});
exports.getAllById = getAllById;
const getById = (team) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return team.getById(input);
});
exports.getById = getById;
const getCounts = (team) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return team.getCount(input);
});
exports.getCounts = getCounts;
const createTeam = (team) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield team.create(input);
});
exports.createTeam = createTeam;
const updateTeam = (team) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield team.update(input);
});
exports.updateTeam = updateTeam;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const team = yield TeamController_1.default.create(data);
        return {
            getTeams: (0, exports.getTeams)(team),
            getAll: (0, exports.getAll)(team),
            getAllById: (0, exports.getAllById)(team),
            getById: (0, exports.getById)(team),
            getCount: (0, exports.getCounts)(team),
            create: (0, exports.createTeam)(team),
            update: (0, exports.updateTeam)(team),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=TeamHandlers.js.map