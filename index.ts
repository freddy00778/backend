import 'dotenv/config';

import express from 'express'
import cors from 'cors';
import {addRespondToResponse} from './src/middleware/response';
import {handleError} from './src/middleware/errors';
import {attachPublicRoutes} from './src/routes/v1/routes';
import bodyParser from "body-parser";
import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"
import * as NodeCron from "node-cron"
import DataProvider from "./src/data/DataProvider";
import {SendEmail} from "./src/services/email/SendEmail";
//@ts-ignore
import {processUserReminderEmail} from "./src/services/email/reminders/processUserReminderEmail";
//@ts-ignore
import {processAllCompletedNotificationsToAdministrator} from "./src/services/email/reminders/processAllCompletedNotificationsToAdministrator";
// import {processCoordinatorReminderEmail} from "./src/services/email/reminders/processCoordinatorReminderEmail";
import crypto from 'crypto';
import cookieParser from "cookie-parser";

const initializeExpress = async () => {
    const app = express();
    app.use(cookieParser())

    // @ts-ignore
    app.use((req, res, next) => {
        // generate CSRF token
        const csrfToken = generateCSRFToken();
        // send token in a cookie and in a custom HTTP header
        res.cookie('XSRF-TOKEN', csrfToken);
        res.locals.csrfToken = csrfToken;
        next();
    });

    // @ts-ignore
    const data = await DataProvider.create()
    // @ts-ignore
    const sendMail = SendEmail()

    // Schedule the task to run every Sunday at 12:00 AM
    NodeCron.schedule('30 09 * * 0', async () => {
        console.log('This task runs every Sunday at 12:00 AM!');
        // await processCoordinatorReminderEmail(data,sendMail)
        // await processUserReminderEmail(data, sendMail)

    });

// Schedule the task to run on the 1st day of every month at 12:00 AM
    NodeCron.schedule('0 0 1 * *', () => {
        console.log('This task runs on the 1st day of every month at 12:00 AM!');
    });

    // Schedule the task to run every day at 12:00 AM
    NodeCron.schedule('0 0 * * *', () => {
        console.log('This task runs every day at 12:00 AM!');
    });

    app.use(cors());
    const allowedOrigins = [
        'changeverveacademy.com',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5001',
        'http://localhost:63342',
        'https://changeverveacademy.com',
        'http://changeverveacademy.com',
        'http://store.changeverveacademy.com',
        'https://store.changeverveacademy.com',
        'https://stores.changeverveacademy.com',
        'store.changeverveacademy.com',
        'https://demo.changeverveacademy.com',
    ];

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // <-- Add this line
    }));

    const path = require('path')
    console.log(path.join(__dirname, 'public'))
    app.use('/static', express.static(path.join(__dirname, 'public')))
    app.use(express.json())
    // app.use(express.urlencoded())
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(addRespondToResponse);

    Sentry.init({
        dsn: "https://0f9b603297a1473188c6584dd1858f0d@o4504661266333696.ingest.sentry.io/4504661284487168",
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({tracing: true}),
            // enable Express.js middleware tracing
            new Tracing.Integrations.Express({app}),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });


    // app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
    app.use(handleError);
    attachPublicRoutes(app);

    app.listen(process.env.PORT || 5001, () => {
        console.log(`Server listening ${process.env.PORT || 5000}`);
    });

}

const initializeApp = async (): Promise<void> => {
    await initializeExpress();
}

initializeApp();


function generateCSRFToken() {
    return crypto.randomBytes(100).toString('hex');
}
