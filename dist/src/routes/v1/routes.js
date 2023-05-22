"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.attachPublicRoutes = void 0;
const users = __importStar(require("../../controllers/users"));
const checkout = __importStar(require("../../controllers/checkout"));
const industry = __importStar(require("../../controllers/industries"));
const question = __importStar(require("../../controllers/questions"));
const subgame = __importStar(require("../../controllers/subgames"));
const FunctionController = __importStar(require("../../controllers/functions"));
const company = __importStar(require("../../controllers/company"));
const team = __importStar(require("../../controllers/teams"));
const license = __importStar(require("../../controllers/licenses"));
const game = __importStar(require("../../controllers/games"));
const step = __importStar(require("../../controllers/steps"));
const phase = __importStar(require("../../controllers/phases"));
const plans = __importStar(require("../../controllers/plans"));
const subscriptions = __importStar(require("../../controllers/subscriptions"));
const progress = __importStar(require("../../controllers/progress"));
const videos = __importStar(require("../../controllers/videos"));
const Auth = __importStar(require("../../middleware/auth"));
const data_1 = require("../../data");
const config_1 = require("../../config");
const UserLicenseHandlers_1 = __importDefault(require("../../data/userLicense/UserLicenseHandlers"));
const bcrypt = __importStar(require("bcrypt"));
const UserHandlers_1 = __importDefault(require("../../data/users/UserHandlers"));
const attachPublicRoutes = (app) => {
    app.post('/api/v1/auth/login', users.login);
    app.post('/api/v1/auth/admin-login', users.adminLogin);
    app.post('/api/v1/auth/assessment-login', users.assessmentLogin);
    app.get('/api/v1/user', Auth.authorize(), users.getUser);
    app.post('/api/v1/users', users.createUser);
    app.post('/api/v1/users/:id', users.updateUser);
    app.patch('/api/v1/users/', users.update);
    app.post('/api/v1/complete-game/', users.completeGame);
    app.get('/api/v1/users', Auth.authorize(), users.getUsers);
    app.get('/api/v1/users/:id', Auth.authorize(), users.getSingleUser);
    app.post('/api/v1/add-administrator/', checkout.addAdministrator);
    // app.post('/api/v1/checkout', Auth.authorize(), checkout.create)
    app.post('/api/v1/checkout', Auth.authorize(), checkout.sendPaymentLink);
    app.post('/notify', checkout.paymentNotification);
    app.get('/process-payment/:token', checkout.processPayment);
    app.get('/admin-setup/:token', checkout.validateAndRedirectToSetup);
    app.get('/api/v1/sales/check/:transaction_id', checkout.checkTransactionStatus);
    app.get('/api/v1/sales/test/:transaction_id', checkout.testTransactionStatus);
    app.get('/api/v1/sales', Auth.authorize(), checkout.getAll);
    app.get('/api/v1/sales/details/:token', Auth.authorize(), checkout.getSaleDetails);
    app.post('/api/v1/sales/details/regenerate-link/:transaction_number', Auth.authorize(), checkout.regenerateLink);
    app.get('/api/v1/sales/:id', Auth.authorize(), checkout.getSale);
    app.post('/api/v1/sales/:id', Auth.authorize(), checkout.getSale);
    app.post('/api/v1/sales/form/process', checkout.processPaymentForm);
    app.get("/api/v1/plans", Auth.authorize(), plans.getAll);
    app.post("/api/v1/plans", Auth.authorize(), plans.createPlan);
    app.get("/api/v1/plans/:id", Auth.authorize(), plans.getById);
    app.get("/api/v1/subscriptions", Auth.authorize(), subscriptions.getAll);
    app.get("/api/v1/all-subscriptions", Auth.authorize(), subscriptions.getSubscriptions);
    app.get("/api/v1/subscriptions/:id", Auth.authorize(), subscriptions.getSubscription);
    app.post("/api/v1/subscriptions", Auth.authorize(), subscriptions.getSingleSubscription);
    // app.post("/api/v1/extend-subscription", Auth.authorize(), subscriptions.extendSubscription)
    app.post("/api/v1/extend-subscription", subscriptions.extendSubscription);
    //functions
    app.get('/api/v1/functions', Auth.authorize(), FunctionController.getFunctions);
    app.post('/api/v1/functions', Auth.authorize(), FunctionController.getFunctions);
    //industries
    app.get('/api/v1/industries', Auth.authorize(), industry.getIndustries);
    app.post('/api/v1/industries', Auth.authorize(), industry.createIndustry);
    //questions
    app.get('/api/v1/questions', Auth.authorize(), question.getQuestions);
    app.get('/api/v1/questions/:id', Auth.authorize(), question.getQuestion);
    app.post('/api/v1/questions', Auth.authorize(), question.createQuestion);
    app.patch('/api/v1/questions', Auth.authorize(), question.updateQuestion);
    //sub games
    app.get('/api/v1/sub-games', Auth.authorize(), subgame.getSubGames);
    app.get('/api/v1/sub-games/:id', Auth.authorize(), subgame.getSubGame);
    app.post('/api/v1/sub-games', Auth.authorize(), subgame.createSubGame);
    //company
    // app.get('/api/companies', Auth.authorize(), company.create)
    app.post('/api/v1/companies', Auth.authorize(), company.create);
    //Teams
    app.post('/api/v1/teams', Auth.authorize(), team.create);
    // app.get('/api/v1/teams', Auth.authorize(), team.create)
    app.get('/api/v1/teams/:license', Auth.authorize(), team.getAll);
    app.get('/api/v1/teams/single/:license', Auth.authorize(), team.getTeam);
    app.get('/api/v1/teams/list/:user_id', team.getTeams);
    app.get('/api/v1/teams/charts/data', users.teamUsersChartData);
    //Team Members
    app.get('/api/v1/teams/members/:id', team.getTeamMembers);
    app.get('/api/v1/teams/members/counts/:id', team.getCount);
    app.post('/api/v1/teams/send-invites/:id', team.sendEmails);
    app.post('/api/v1/teams/resend-email', team.resendEmail);
    //Emails
    app.post('/api/v1/add-members', Auth.authorize(), team.addMembers);
    app.post('/api/v1/emails', Auth.authorize(), team.addMember);
    app.delete('/api/v1/emails', Auth.authorize(), team.removeMember);
    //Licenses
    app.post('/api/v1/licenses', Auth.authorize(), license.getUserLicenses);
    app.post('/api/v1/update-user-licenses', Auth.authorize(), license.updateUserLicenseStatus);
    app.get("/api/v1/games", Auth.authorize(), game.getAll);
    app.get("/api/v1/games/:id", Auth.authorize(), game.getGame);
    // app.get("/api/v1/games", game.getAll)
    // app.post("/api/v1/games", Auth.authorize(), game.create)
    app.post("/api/v1/games", game.create);
    // phases
    app.get("/api/v1/phases", Auth.authorize(), phase.getAll);
    app.post("/api/v1/phases", Auth.authorize(), phase.create);
    // progress
    app.get("/api/v1/progress", Auth.authorize(), progress.getAll);
    app.post("/api/v1/progress", Auth.authorize(), progress.createProgress);
    app.get("/api/v1/progress/:id", Auth.authorize(), progress.getProgress);
    app.post("/api/v1/progress/:id", Auth.authorize(), progress.getProgress);
    app.patch("/api/v1/progress/update/user", Auth.authorize(), progress.updateProgress);
    // app.post("/api/v1/progress/next-step/:order", progress.getNextStep)
    app.post("/api/v1/progress/next-step/:order", Auth.authorize(), progress.getNextStep);
    app.post("/api/v1/progress/kc-tries/:user", Auth.authorize(), progress.getKCTries);
    // videos
    app.get("/api/v1/videos", Auth.authorize(), videos.getAll);
    // app.post("/api/v1/videos", Auth.authorize(), videos.createVideo)
    app.post("/api/v1/videos", videos.createVideo);
    app.get("/api/v1/videos/:id", Auth.authorize(), videos.getById);
    // steps
    app.get("/api/v1/steps", Auth.authorize(), step.getAll);
    app.get("/api/v1/steps/:id", Auth.authorize(), step.getStep);
    app.post("/api/v1/steps", Auth.authorize(), step.create);
    app.get("/api/v1/steps/game/:id", step.getByGame);
    app.get("/api/v1/phase-steps/:id", Auth.authorize(), step.getPhaseStep);
    // app.get("/api/v1/steps/game", step.getByGame)
    // @ts-ignore
    app.get("/add-phases", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req)
            const data = yield data_1.DataProvider.create();
            const users = yield (yield UserLicenseHandlers_1.default.create(data)).getUserLicenses();
            return res.send(users);
            return res.end();
        });
    });
    app.post('/api/v1/reset-password-email', users.resetPassword);
    app.post('/api/v1/change-password', users.changePassword);
    app.get('/api/v1/download-results', team.downloadResults);
    app.post("/api/v1/clear-progress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { user } = req.body;
        const provider = yield data_1.DataProvider.create();
        const userProgress = () => provider.postgres.withSchema(config_1.Database.schema).table('UserProgress');
        yield userProgress().select().where({ user: user }).delete();
        return res.send("OK");
    }));
    app.get("/api/v1/reset-database", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Body", req.body);
        const provider = yield data_1.DataProvider.create();
        const table = (table) => provider.postgres.withSchema(config_1.Database.schema).table(table);
        // const industries        = () => table("Industry")
        // const functions         = () => table('Function')
        const subscriptions = () => table('Subscription');
        const invoiceItems = () => table('InvoiceItem');
        const invoices = () => table('Invoice');
        const company = () => table('Company');
        const teamUser = () => table('TeamUser');
        const userLicense = () => table('UserLicense');
        const team = () => table('Team');
        const licenses = () => table('License');
        const userProgress = () => table('UserProgress');
        const users = () => table('User');
        try {
            yield subscriptions().delete();
            yield teamUser().delete();
            yield team().delete();
            yield company().delete();
            // await industries().delete()
            // await functions().delete()
            yield invoiceItems().delete();
            yield invoices().delete();
            yield userLicense().delete();
            yield licenses().delete();
            yield userProgress().delete();
            yield users().delete();
            yield createAdmin();
        }
        catch (e) {
            return res.send("error");
        }
        res.send("OK");
    }));
};
exports.attachPublicRoutes = attachPublicRoutes;
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = bcrypt.hashSync("TOPman88$$", 10);
    const data = yield data_1.DataProvider.create();
    const userHandlers = yield UserHandlers_1.default.create(data);
    yield userHandlers.create({
        email: "frederickankamah988@gmail.com",
        firstName: "Frederick",
        lastName: "Ankamah",
        password: hashedPassword,
        isAdmin: true
    });
});
//# sourceMappingURL=routes.js.map