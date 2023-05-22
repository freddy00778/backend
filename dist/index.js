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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const response_1 = require("./src/middleware/response");
const errors_1 = require("./src/middleware/errors");
const routes_1 = require("./src/routes/v1/routes");
const body_parser_1 = __importDefault(require("body-parser"));
const Sentry = __importStar(require("@sentry/node"));
const Tracing = __importStar(require("@sentry/tracing"));
const NodeCron = __importStar(require("node-cron"));
const DataProvider_1 = __importDefault(require("./src/data/DataProvider"));
const SendEmail_1 = require("./src/services/email/SendEmail");
//@ts-ignore
const processUserReminderEmail_1 = require("./src/services/email/reminders/processUserReminderEmail");
const processCoordinatorReminderEmail_1 = require("./src/services/email/reminders/processCoordinatorReminderEmail");
const crypto_1 = __importDefault(require("crypto"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const initializeExpress = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    // @ts-ignore
    app.use((req, res, next) => {
        // generate CSRF token
        const csrfToken = generateCSRFToken();
        // send token in a cookie and in a custom HTTP header
        res.cookie('XSRF-TOKEN', csrfToken);
        res.locals.csrfToken = csrfToken;
        next();
    });
    const data = yield DataProvider_1.default.create();
    // @ts-ignore
    const sendMail = (0, SendEmail_1.SendEmail)();
    // Schedule the task to run every Sunday at 12:00 AM
    NodeCron.schedule('30 09 * * 0', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('This task runs every Sunday at 12:00 AM!');
        yield (0, processCoordinatorReminderEmail_1.processCoordinatorReminderEmail)(data, sendMail);
        yield (0, processUserReminderEmail_1.processUserReminderEmail)(data, sendMail);
    }));
    // Schedule the task to run on the 1st day of every month at 12:00 AM
    NodeCron.schedule('0 0 1 * *', () => {
        console.log('This task runs on the 1st day of every month at 12:00 AM!');
    });
    // Schedule the task to run every day at 12:00 AM
    NodeCron.schedule('0 0 * * *', () => {
        console.log('This task runs every day at 12:00 AM!');
    });
    app.use((0, cors_1.default)());
    const allowedOrigins = [
        'changeverveacademy.com',
        'changeverveacademy.com',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5001',
        'http://localhost:63342',
        'https://changeverveacademy.com',
        'https://store.changeverveacademy.com',
        'https://stores.changeverveacademy.com',
        'store.changeverveacademy.com',
        'https://demo.changeverveacademy.com',
    ];
    app.use((0, cors_1.default)({
        origin: function (origin, callback) {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // <-- Add this line
    }));
    const path = require('path');
    console.log(path.join(__dirname, 'public'));
    app.use('/static', express_1.default.static(path.join(__dirname, 'public')));
    app.use(express_1.default.json());
    // app.use(express.urlencoded())
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(response_1.addRespondToResponse);
    Sentry.init({
        dsn: "https://0f9b603297a1473188c6584dd1858f0d@o4504661266333696.ingest.sentry.io/4504661284487168",
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new Tracing.Integrations.Express({ app }),
        ],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
    // app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
    app.use(errors_1.handleError);
    (0, routes_1.attachPublicRoutes)(app);
    app.listen(process.env.PORT || 5001, () => {
        console.log(`Server listening ${process.env.PORT || 5000}`);
    });
});
const initializeApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeExpress();
});
initializeApp();
function generateCSRFToken() {
    return crypto_1.default.randomBytes(100).toString('hex');
}
//# sourceMappingURL=index.js.map