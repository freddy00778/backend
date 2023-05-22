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
exports.create = exports.updateTeam = exports.createTeam = exports.getTeamById = exports.getAllById = exports.getTeams = exports.getCounts = exports.getAllTeams = void 0;
const config_1 = require("../../config");
const getAllTeams = (teams) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = teams().select('Team.*', 'Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name")
        .leftJoin("Company", "Team.company", "Company.id")
        .leftJoin("Industry", "Company.industry", "Industry.id");
    if (input) {
        query.where(input);
    }
    return query.orderBy('created_at', 'desc');
});
exports.getAllTeams = getAllTeams;
const getCounts = (teams) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = yield teams().select();
    if (input) {
        qb.where(input);
    }
    return qb.count();
});
exports.getCounts = getCounts;
const getTeams = (teams) => (license, input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = teams().select('Team.*', 'Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name")
        .leftJoin("Company", "Team.company", "Company.id")
        .leftJoin("Industry", "Company.industry", "Industry.id");
    if (license) {
        query.where({ license: license });
    }
    if (input) {
        query.where(input);
    }
    return query.orderBy('created_at', 'desc');
});
exports.getTeams = getTeams;
const getAllById = (teams) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = teams().select('Team.*', 'Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name")
        .leftJoin("Company", "Team.company", "Company.id")
        .leftJoin("Industry", "Company.industry", "Industry.id")
        .where({ id: id })
        .orderBy('created_at', 'desc');
    return yield query;
});
exports.getAllById = getAllById;
const getTeamById = (teams) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = teams().select('Team.*', 'Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name")
        .leftJoin("Company", "Team.company", "Company.id")
        .leftJoin("Industry", "Company.industry", "Industry.id");
    if (input.id) {
        query.where({ "Team.id": input.id });
    }
    if (input && !input.id) {
        query.where(input);
    }
    return query.first();
    // return (await teams().select().where({license: id }) as Team[])[0]
});
exports.getTeamById = getTeamById;
const createTeam = (team) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield team().insert(input, ['id']))[0];
});
exports.createTeam = createTeam;
const updateTeam = (team) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield team().select().where({ id: input.id }).update(input));
});
exports.updateTeam = updateTeam;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const team = () => data.postgres.withSchema(config_1.Database.schema).table('Team');
        return {
            getTeams: (0, exports.getAllTeams)(team),
            getList: (0, exports.getTeams)(team),
            getAllById: (0, exports.getAllById)(team),
            getById: (0, exports.getTeamById)(team),
            getCount: (0, exports.getCounts)(team),
            create: (0, exports.createTeam)(team),
            update: (0, exports.updateTeam)(team)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=TeamData.js.map