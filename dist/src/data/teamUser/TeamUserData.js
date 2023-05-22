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
exports.create = exports.getCounts = exports.getTeamUserById = exports.deleteTeamUser = exports.updateTeamUser = exports.createTeamUser = exports.getTeamMembers = exports.getTeams = void 0;
const config_1 = require("../../config");
const getTeams = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = query().select('TeamUser.*', 'User.email', "UserLicense.isStarted", "UserLicense.isInvited", "Team.name as teamName", "Company.name as companyName", "Team.license", "UserLicense.completed", "UserProgress.actual_ee_score", "UserProgress.actual_et_score", "UserProgress.actual_budget_score")
        .from('TeamUser')
        .leftJoin('User', 'TeamUser.user', 'User.id')
        .leftJoin('Team', 'TeamUser.team', 'Team.id')
        .leftJoin('UserLicense', 'Team.license', 'UserLicense.license')
        .leftJoin('UserProgress', 'User.id', 'UserProgress.user')
        // .leftJoin('PhaseStep', 'UserProgress.phaseStep','PhaseStep.id')
        // .leftJoin('Step', 'PhaseStep.step','Step.id')
        .leftJoin('Company', 'Team.company', 'Company.id');
    if (input && input.user) {
        qb.where({ "User.id": input.user });
    }
    if (input && input.license) {
        qb.where({ "UserLicense.license": input.license });
    }
    if (input && !input.user && !input.license) {
        qb.where(input);
    }
    return qb.orderBy("created_at", "desc").distinct("UserLicense.user");
});
exports.getTeams = getTeams;
const getTeamMembers = (query) => (team_id, input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = query().select('TeamUser.*', 'User.email', "UserLicense.isStarted", "Team.contact_email", "Company.name as company_name", "UserLicense.isInvited", "UserLicense.license as userLicense", "UserLicense.completed", "Step.order", "UserProgress.actual_ee_score", "UserProgress.actual_et_score", "UserProgress.actual_budget_score", "SubscriptionPlan.game")
        .from('TeamUser')
        .leftJoin('Team', 'TeamUser.team', 'Team.id')
        .leftJoin('Company', 'Team.company', 'Company.id')
        .leftJoin('User', 'TeamUser.user', 'User.id')
        .leftJoin('UserLicense', 'TeamUser.user', 'UserLicense.user')
        .leftJoin('UserProgress', 'User.id', 'UserProgress.user')
        .leftJoin('PhaseStep', 'UserProgress.phaseStep', 'PhaseStep.id')
        .leftJoin('Step', 'PhaseStep.step', 'Step.id')
        .leftJoin('Subscription', 'UserLicense.license', 'Subscription.license')
        .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id');
    if (team_id) {
        qb.where({ "TeamUser.team": team_id });
    }
    if (input) {
        qb.where(input);
    }
    return qb.orderBy("created_at", "desc");
});
exports.getTeamMembers = getTeamMembers;
const createTeamUser = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield query().insert(input, ['id', 'user', 'team']))[0];
});
exports.createTeamUser = createTeamUser;
const updateTeamUser = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield query().select().where({ id: input.id }));
});
exports.updateTeamUser = updateTeamUser;
const deleteTeamUser = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield query().del().where(input));
});
exports.deleteTeamUser = deleteTeamUser;
const getTeamUserById = (query) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return query().select('TeamUser.*', 'User.email', "UserLicense.isStarted", "UserLicense.isInvited").from('TeamUser')
        .leftJoin('User', 'TeamUser.user', 'User.id')
        .leftJoin('UserLicense', 'TeamUser.user', 'UserLicense.user').where({ id: id })
        .first();
});
exports.getTeamUserById = getTeamUserById;
const getCounts = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const qb = query().select('TeamUser.*', 'User.email', "UserLicense.isStarted", "UserLicense.isInvited").from('TeamUser')
        .leftJoin('User', 'TeamUser.user', 'User.id')
        .leftJoin('UserLicense', 'TeamUser.user', 'UserLicense.user');
    if (input) {
        qb.where(input);
    }
    return qb.count();
});
exports.getCounts = getCounts;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const teamUsers = () => data.postgres.withSchema(config_1.Database.schema).table('TeamUser');
        return {
            getAll: (0, exports.getTeams)(teamUsers),
            getTeamMembers: (0, exports.getTeamMembers)(teamUsers),
            getById: (0, exports.getTeamUserById)(teamUsers),
            getCount: (0, exports.getCounts)(teamUsers),
            create: (0, exports.createTeamUser)(teamUsers),
            update: (0, exports.updateTeamUser)(teamUsers),
            delete: (0, exports.deleteTeamUser)(teamUsers),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=TeamUserData.js.map