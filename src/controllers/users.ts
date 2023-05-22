import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
import UserHandlers from "../data/users/UserHandlers";
import * as bcrypt from "bcrypt";
import {generateToken} from "../utils/auth";
import * as randtoken from "rand-token"
import omit from  "omit"
import UserLicenseData from "../data/userLicense/UserLicenseData";
// import UserLicenseHandlers from "../data/userLicense/UserLicenseHandlers";
// import * as resultsEmailService from "../services/email/ResultsEmailService";
// import * as resetEmailService from "../services/email/resetEmailService";
import {SendEmail} from "../services/email/SendEmail";
import TeamHandlers from "../data/teams/TeamHandlers";
import InvoiceHandlers from "../data/checkout/InvoiceHandlers";
import SubscriptionHandlers from "../data/subscription/SubscriptionHandlers";
// import * as resultsEmailPdfService from "../services/email/ResultsEmailPdfService";

// import omit from  "omit"
//  import * as nodemailer from 'nodemailer';
//  import * as crypto from 'crypto';

export const getUser =
    catchErrors(async (req, res) => {

        let jwt = req.headers.authorization
        const jwtKey = jwt && jwt.slice('bearer'.length).trim()
        const parsed = parseJwt(jwtKey)
        return res.respond({
            payload: parsed.payloadObject
        })
    })

export const getSingleUser =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const user =  await (await UserHandlers.create(data)).getSingleUser(req)
        res.respond({
            data: user
        });
    });


export const getUsers =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const users =  await (await UserHandlers.create(data)).getUserList()

        res.respond({
            body: req.body,
            data: users
        });
    });

export const createUser =
    catchErrors(async (req, res) => {

        const data = await DataProvider.create()
        const { firstName, lastName, email, phoneNumber, password, invoiceDetails } = req.body;
        if (!(email && password && firstName && lastName && phoneNumber)) {
            res.status(400).send("All inputs are required!");
        }

        const emailExists    =   await (await UserHandlers.create(data)).getEmail(email)
        if (emailExists) {
            return res.status(400).send()
        }

        const additionalDetails = {
            invoice_name : invoiceDetails?.name,
            invoice_email : invoiceDetails?.email,
            invoice_address : invoiceDetails?.address,
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const body = {
            ...req.body,
            password: hashedPassword,
            additionalDetails: additionalDetails
        }
        console.log("body", body)

        const usersBodyObject = omit(["invoiceDetails","confirm_password"], body)

        const insertedUser =  await (await UserHandlers.create(data)).create(usersBodyObject)

        // let [firstInvoiceName, ...lastNameParts] = additionalDetails.invoice_name?.split(' ');
        // let lastInvoiceName = lastNameParts.join(' ');

        console.log("body again", body)

        const invoiceUser =   await (await UserHandlers.create(data)).create({
            email: body?.invoiceDetails?.invoice_email,
        })

        await (await  InvoiceHandlers.create(data)).create({
            user: invoiceUser.id
        })

        const token = generateToken(insertedUser)
        const payload = { ...insertedUser, token };

        res.respond({
            data: payload
        });
    })


export const updateUser =
    catchErrors(async (req, res) => {
        const {id} = req.params
        const data = await DataProvider.create()
        const body = {
            ...req.body,
            id
        }
        const usersBodyObject = omit(["confirm_password"], body)

         const response = await (await UserHandlers.create(data)).update(usersBodyObject)

        res.respond({
            data: response
        })
    })

export const update =
    catchErrors(async (req, res) => {
        const {id,password} = req.body
        const data = await DataProvider.create()
        const passwordHash = await bcrypt.hash(password, 10)
        const body = {
            ...req.body,
            id,
            password: passwordHash
        }

        console.log("body", body)
        console.log("password hash", passwordHash)

        const response = await (await UserHandlers.create(data)).update(body)

        res.respond({
            data: response
        })
    })

export const completeGame =
    catchErrors(async (req, res) => {

        // @ts-ignore
        const {user, license, game_id, email_only, team_id} = req.body
        const data = await DataProvider.create()
        let response;

        const userObject = await (await UserHandlers.create(data)).getUser({id: user})
        const teamObject       = await (await TeamHandlers.create(data)).getById({id: team_id})
        const fullName =       `${userObject?.firstName} ${userObject.lastName}`
        const email =       userObject?.email

        if (email_only){
            const emailService = SendEmail()
            try {
                await emailService.sendCompletedResults(userObject.email, user, game_id, license)
            }catch (e) {
                console.log("Send completed results", e)
            }

            try {
                await emailService.sendCompletedEmailToCoordinator(teamObject?.contact_email, fullName, email, "", teamObject?.name)
            }catch (e) {
                console.log("Coordinator results", e)

            }

            // resultsEmailService.queueEmail({to: userObject.email, subject: "Results Email", user_id: user, game_id, license_id: license})
            // const html = `<p> This is a test!</p>`
            // var html = '<html><body>Hello World</body></html>';
            // resultsEmailPdfService.queueEmailWithPDF({to: userObject.email, subject: "Results Email", html: html})
        }else {
            response = await (await UserLicenseData.create(data)).completeGame({user, license, completed: true})
        }

        res.respond({
            data: response
        })
    })

export const login =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { email, password } = req.body;

        if (!(email && password )) {
            res.status(400).send("Email and password are required!");
        }

        const emailExists    =   await (await UserHandlers.create(data)).getEmail(email)

        if (!emailExists ){
            return res.status(401).send()
        }
        const userObject = emailExists
        const passwordMatch = emailExists && await bcrypt.compare(password, userObject.password)

        if (userObject && passwordMatch) {
            const subscription = await (await SubscriptionHandlers.create(data)).get({administrator: userObject?.id})
            const currentDate = Date.now();
            const expiresAt = new Date(subscription.expires_at).getTime()
            const token = generateToken(userObject)
            const jsonInfo = {
                ...userObject,
                token
            }

            if (userObject.coordinator){
                return res.respond({
                    ...jsonInfo
                });
            }

            // if ( userObject.subscription_plan == null || userObject.expires_at == null || expiresAt < currentDate ){
            //     return res.status(403).send("License has expired");
            // }

            if ( subscription.subscription_plan == null || subscription.expires_at == null || expiresAt < currentDate ){
                return res.status(403).send("License has expired");
            }

            return res.respond({
                ...jsonInfo
            });
        }

        return res.status(401).send({text: "username or password incorrect!"});
    })

export const adminLogin =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { email, password } = req.body;

        if (!(email && password )) {
            res.status(400).send("Email and password are required!");
        }

        const emailExists    =   await (await UserHandlers.create(data)).getEmail(email)

        console.log("email exists", emailExists)

        if (!emailExists ){
            return res.status(401).send()
        }
        const userObject = emailExists;
        const passwordMatch = emailExists && await bcrypt.compare(password, userObject.password);

        if (userObject && passwordMatch) {

            console.log('user object', userObject)
            if (!userObject.isAdmin){
                return res.status(401).send();
            }

            const token = generateToken(userObject)
            const jsonInfo = {
                ...userObject,
                token
            }
            return res.respond({
                ...jsonInfo
            });
        }

        return res.status(401).send({text: "username or password incorrect!"});
    });

export const assessmentLogin =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { email } = req.body;

        if (!(email )) {
            res.status(400).send("Email is required!");
        }

        const emailExists    =   await (await UserHandlers.create(data)).getUserLicense(email?.toLowerCase())

        if (emailExists.length == 0 ){
            return res.status(401).send()
        }

        const userObject = emailExists ? emailExists[0] : emailExists
        if ( userObject ) {
            const currentDate = Date.now();
            const expiresAt = new Date(userObject.expires_at).getTime()

            if ( userObject.subscription_plan == null || userObject.expires_at == null || expiresAt < currentDate ){
                return res.status(403).send("License has expired");
            }

            const token = generateToken(userObject)
            const jsonInfo = {
                ...userObject,
                token
            }
            return res.respond({
                ...jsonInfo
            });
        }

        return res.status(401).send({text: "email not correct!"});
    });

export const resetPassword = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required!');
    }

    const userHandlers = await UserHandlers.create(data);
    const emailExists = await userHandlers.getUserLicense(email);

    if (emailExists.length === 0) {
        return res.status(401).send({ text: 'Email not found!' });
    }

    const userObject = emailExists[0];

    const token = randtoken.generate(20);
    await userHandlers.update({ id: userObject.id, verificationToken: token });

    const resetUrl = `https://changeverveacademy.com/change-password?token=${token}&email=${email}`;

    const emailSent = await sendEmail(email, resetUrl);

    if (!emailSent) {
        return res.status(500).send({ text: 'Error sending email!' });
    }

    res.respond({
        data: {}
    })
});

export const changePassword = catchErrors(async (req, res) => {
    const data = await DataProvider.create();
    const {  token, password } = req.body;

    // if (!email) {
    //     return res.status(400).send('Email is required!');
    // }

    const userHandlers = await UserHandlers.create(data);
    const emailExists = await userHandlers.getUser({verificationToken: token});

    // if (!emailExists ) {
    //     return res.status(401).send({ text: 'Email not found!' });
    // }

    const hashedPassword = bcrypt.hashSync(password, 10)
    await userHandlers.update({ id: emailExists.id, password: hashedPassword })

    return res.respond({
        data: emailExists
    })
});

export const teamUsersChartData = catchErrors(async (req, res) => {
    const {license} = req.query

    const data = await DataProvider.create()

    // @ts-ignore
    const chartsData = await (await UserHandlers.create(data)).getEmails(license);

    const groupedCounts = chartsData.reduce((accumulator, user) => {
        const teamId = user.team_id || 'no_team'

        if (!accumulator[teamId]) {
            accumulator[teamId] = {
                teamName: user.team_name,
                isStartedTrueCount: 0,
                isStartedFalseCount: 0,
                isCompletedTrueCount: 0
            }
        }

        accumulator[teamId].isStartedTrueCount += user.isStarted ? 1 : 0;
        accumulator[teamId].isStartedFalseCount += !user.isStarted ? 1 : 0;
        accumulator[teamId].isCompletedTrueCount += user.completed ? 1 : 0;

        return accumulator;
    }, {});

    console.log('Grouped counts by team_id:', groupedCounts);


    res.respond({
        groupedCounts
    })

})

async function sendEmail(email, resetUrl) {
    const message = {
        to: email,
        subject: 'Reset Password',
        text: `Click the following link to reset your password: ${resetUrl}`,
        html: `Click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`,
    };
    try {
        const sendMail = SendEmail()
        sendMail.sendResetEmail(message.to, message.html)
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}