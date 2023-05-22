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
exports.create = exports.updateUser = exports.createUser = exports.getUserList = exports.getUserById = exports.getUserByUsername = exports.getEmailsByLicense = exports.getTeamUsersByUserId = exports.getUserLicense = exports.getUserLicenseByEmail = exports.getUserByEmail = exports.getUser = void 0;
const config_1 = require("../../config");
const getUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield users().select().where(input).first());
});
exports.getUser = getUser;
const getUserByEmail = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return query().select('User.*', "Subscription.subscription_plan", "SubscriptionPlan.game", "Subscription.expires_at", "Subscription.quantity", "Subscription.invoice", "Invoice.license").from('User')
        .leftJoin('Invoice', 'User.id', 'Invoice.user')
        .leftJoin('Subscription', 'User.id', 'Subscription.user')
        .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
        .where({ email: input.email }).first();
});
exports.getUserByEmail = getUserByEmail;
const getUserLicenseByEmail = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return query().select('User.*', "Subscription.subscription_plan", "SubscriptionPlan.game", "Subscription.expires_at", "Invoice.user as invoice_user", "Invoice.license").from('User')
        .leftJoin("UserLicense", "User.id", "UserLicense.user")
        .leftJoin('Invoice', 'UserLicense.license', 'Invoice.license')
        .leftJoin('Subscription', 'Invoice.id', 'Subscription.invoice')
        .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
        .where({ email: input.email });
});
exports.getUserLicenseByEmail = getUserLicenseByEmail;
const getUserLicense = (query) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return query().select('User.*', "Subscription.subscription_plan", "SubscriptionPlan.game", "Subscription.expires_at", "Invoice.user as invoice_user", "Invoice.license").from('User')
        .leftJoin("UserLicense", "User.id", "UserLicense.user")
        .leftJoin('Invoice', 'UserLicense.license', 'Invoice.license')
        .leftJoin('Subscription', 'Invoice.id', 'Subscription.invoice')
        .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
        .where(input).first();
});
exports.getUserLicense = getUserLicense;
const getTeamUsersByUserId = (users) => (user) => __awaiter(void 0, void 0, void 0, function* () {
    return users().select("User.*", "Invoice.id as invoice_id", "Invoice.license").from('User')
        .leftJoin('Invoice', 'User.id', 'Invoice.user')
        .leftJoin("UserLicense", "Invoice.license", "UserLicense.license")
        .where({ "User.id": user });
});
exports.getTeamUsersByUserId = getTeamUsersByUserId;
// export const getEmailsByLicense = (users: () => QueryBuilder) => async (license: String) => {
//   return users().select("User.*","Invoice.id as invoice_id", "Invoice.license",
//       "UserLicense.isStarted", "UserLicense.isInvited", "UserLicense.completed", "Team.id as team_id", "Team.name as team_name")
//       .from('User')
//       .leftJoin('Invoice', 'User.id', 'Invoice.user')
//       .leftJoin("UserLicense", "Invoice.license","UserLicense.license")
//       .leftJoin('TeamUser', 'User.id', 'TeamUser.user')
//       .leftJoin('Team', 'TeamUser.team', 'Team.id')
//       .where({"UserLicense.license": license})
//       .groupBy('User.id', 'Invoice.id', 'UserLicense.license', 'Team.id');
// }
// @ts-ignore
const getEmailsByLicense = (users) => (license) => __awaiter(void 0, void 0, void 0, function* () {
    return users()
        .select('User.id', 'User.firstName', 'User.lastName', 'User.email', 'Invoice.id as invoice_id', 'Invoice.license', 'UserLicense.isStarted', 'UserLicense.isInvited', 'UserLicense.completed', 'Team.id as team_id', 'Team.name as team_name')
        .from('User')
        .leftJoin('Invoice', 'User.id', 'Invoice.user')
        // .rightJoin('UserLicense', 'Invoice.license', 'UserLicense.license')
        .rightJoin('UserLicense', 'User.id', 'UserLicense.user')
        .leftJoin('TeamUser', 'User.id', 'TeamUser.user')
        .leftJoin('Team', 'TeamUser.team', 'Team.id')
        .where({ 'UserLicense.license': license });
    // .groupBy(
    //     'User.id',
    //     'User.firstName',
    //     'User.lastName',
    //     'User.email',
    //     'Invoice.id',
    //     'Invoice.license',
    //     'UserLicense.isStarted',
    //     'UserLicense.isInvited',
    //     'UserLicense.completed',
    //     'Team.id',
    //     'Team.name'
    // )
});
exports.getEmailsByLicense = getEmailsByLicense;
const getUserByUsername = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield users().select().where({ username: input.username }))[0];
});
exports.getUserByUsername = getUserByUsername;
const getUserById = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield users().select().where({ id: input.id }))[0];
});
exports.getUserById = getUserById;
const getUserList = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = users().select().whereNotNull("firstName");
    if (input)
        query.where(input);
    return yield query.orderBy("created_at", "DESC");
});
exports.getUserList = getUserList;
const createUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield users().insert(input, ['id', 'firstName', 'lastName', 'email', 'username']))[0];
});
exports.createUser = createUser;
const updateUser = (users) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield users().select().where({ id: input.id }).update(input));
});
exports.updateUser = updateUser;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = () => data.postgres.withSchema(config_1.Database.schema).table('User');
        return {
            getUser: (0, exports.getUser)(users),
            getEmail: (0, exports.getUserByEmail)(users),
            getEmails: (0, exports.getEmailsByLicense)(users),
            getUserLicense: (0, exports.getUserLicenseByEmail)(users),
            getUserWithLicense: (0, exports.getUserLicense)(users),
            getUsername: (0, exports.getUserByUsername)(users),
            getTeamUsersByUserId: (0, exports.getTeamUsersByUserId)(users),
            get: (0, exports.getUserById)(users),
            getList: (0, exports.getUserList)(users),
            create: (0, exports.createUser)(users),
            update: (0, exports.updateUser)(users),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=UserData.js.map