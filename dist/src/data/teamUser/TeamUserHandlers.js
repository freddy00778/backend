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
exports.create = exports.getCounts = exports.getById = exports.deleteTeamUser = exports.update = exports.createTeamUser = exports.getTeamMembers = exports.getTeams = void 0;
const TeamUserController_1 = __importDefault(require("./TeamUserController"));
const getTeams = (controller) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.getAll(input);
});
exports.getTeams = getTeams;
const getTeamMembers = (controller) => (team) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.getTeamMembers(team);
});
exports.getTeamMembers = getTeamMembers;
const createTeamUser = (controller) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield controller.create(input);
});
exports.createTeamUser = createTeamUser;
const update = (controller) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield controller.update(req);
});
exports.update = update;
const deleteTeamUser = (controller) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield controller.delete(input);
});
exports.deleteTeamUser = deleteTeamUser;
const getById = (controller) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield controller.getById(id);
});
exports.getById = getById;
const getCounts = (controller) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return controller.getCount(input);
});
exports.getCounts = getCounts;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const teamUser = yield TeamUserController_1.default.create(data);
        return {
            getAll: (0, exports.getTeams)(teamUser),
            getTeamMembers: (0, exports.getTeamMembers)(teamUser),
            getCount: (0, exports.getCounts)(teamUser),
            create: (0, exports.createTeamUser)(teamUser),
            update: (0, exports.update)(teamUser),
            getById: (0, exports.getById)(teamUser),
            delete: (0, exports.deleteTeamUser)(teamUser)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=TeamUserHandlers.js.map