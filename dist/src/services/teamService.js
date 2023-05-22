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
exports.decrementMemberCount = exports.incrementMemberCount = exports.updateTeam = exports.createTeam = void 0;
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const TeamHandlers_1 = __importDefault(require("../data/teams/TeamHandlers"));
const omit_1 = __importDefault(require("omit"));
const TeamUserHandlers_1 = __importDefault(require("../data/teamUser/TeamUserHandlers"));
const createTeam = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    return yield (yield TeamHandlers_1.default.create(data)).create(req);
});
exports.createTeam = createTeam;
const updateTeam = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    return yield (yield TeamHandlers_1.default.create(data)).update(body);
});
exports.updateTeam = updateTeam;
const incrementMemberCount = (data, license, company) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield (yield TeamHandlers_1.default.create(data)).getById({ license, company });
    const no_of_members = (team === null || team === void 0 ? void 0 : team.no_of_members) ? (team === null || team === void 0 ? void 0 : team.no_of_members) + 1 : 0;
    const body = Object.assign(Object.assign({}, team), { no_of_members });
    console.log("Team service", body);
    console.log("Team service object", team);
    //@ts-ignore
    const bodyObject = (0, omit_1.default)(["company_name", "industry_name", "company_id"], body);
    // @ts-ignore
    yield (yield TeamHandlers_1.default.create(data)).update({ id: team === null || team === void 0 ? void 0 : team.id, no_of_members });
});
exports.incrementMemberCount = incrementMemberCount;
const decrementMemberCount = (data, license, company, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("data license company", company);
    const team = yield (yield TeamHandlers_1.default.create(data)).getById({ license, company });
    console.log("user and team", user);
    yield (yield TeamUserHandlers_1.default.create(data)).delete({ user: user.id, team: team.id });
    // await (await TeamUserHandlers.create(data)).delete({user: user.id})
    const no_of_members = team && team.no_of_members != 0 ? team.no_of_members - 1 : 0;
    const body = Object.assign(Object.assign({}, team), { no_of_members });
    const bodyObject = (0, omit_1.default)(["company_name", "industry_name", "company", "company_id"], body);
    // @ts-ignore
    yield (yield TeamHandlers_1.default.create(data)).update(bodyObject);
});
exports.decrementMemberCount = decrementMemberCount;
//# sourceMappingURL=teamService.js.map