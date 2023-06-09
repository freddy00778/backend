import {catchErrors} from '../errors'
import * as TeamService from "../services/teamService"
// import {createCompany} from "../services/company"
import omit from  "omit"
import DataProvider from "../data/DataProvider";
import UserHandlers from "../data/users/UserHandlers";
import UserLicenseHandlers from "../data/userLicense/UserLicenseHandlers";
import TeamHandlers from "../data/teams/TeamHandlers";
import TeamUserHandlers from "../data/teamUser/TeamUserHandlers";
// import * as EmailService from "../services/email/emailService"
import {Team} from "../data/teams/TeamData";
import LicenseHandlers from "../data/license/LicenseHandlers";
// import * as resultsEmailService from "../services/email/ResultsEmailService";
import {resultsTemplate} from "../services/email/templates/resultsEmail";
import {SendEmail} from "../services/email/SendEmail";
import {TeamProcess} from "../services/teams/TeamProcess";
// import {TeamProcess} from "../services/teams/TeamProcess";

export const create =
    catchErrors(async (req, res) => {
        const dataProvider = await DataProvider.create()

        //@ts-ignore
        const { companyObject, team_name, contact_email, team_size, teamObject, email_message, license } = req.body
        const teamProcess = await TeamProcess()

        const company = await teamProcess.createCompany(companyObject.company_name, companyObject.company_function.value, companyObject.company_size, companyObject.industry)
        const userHandler = await (await  UserHandlers.create(dataProvider))
        const userExist = await userHandler.getEmail(contact_email)
        const user = userExist ? userExist : await  userHandler.create({email: contact_email, coordinator: true})

        //@ts-ignore
        const team    = await teamProcess.createTeam({
            name: team_name,
            contact_email: contact_email,
            sizeGroup: team_size,
            company: company?.id, license,
            coordinator_id: user?.id})


        if (user){
            const sendEmail = SendEmail()
            await sendEmail.coordinatorRegistrationEmail(user?.email, team_name, "", user?.id)
        }

        res.respond({
            companyObject,
            teamObj: team
        });
    });

export const update =
    catchErrors(async (req, res) => {
        const team = await TeamService.updateTeam(req.body)

        res.respond({
            data: team
        })
    })


export const addMember =
    catchErrors(async (req, res) => {

        const { memberEmail, license, team_id, company, expiry_date } = req.body

            const data = await DataProvider.create()
            const userBody = {
                    ...req.body,
                    email: memberEmail
                }

                const bodyObject = omit(["memberEmail", "license","team_id","company", "expiry_date"], userBody)
                const emailExists    =   await (await UserHandlers.create(data)).getEmail(memberEmail)

                // @ts-ignore
                const insertedUser =  emailExists ? emailExists : await (await UserHandlers.create(data)).create(bodyObject)
                const userLicenseBody = {...req.body, license, user: insertedUser.id}

                const userLicenseBodyObject = omit(["memberEmail","team_id", "company", "expiry_date"], userLicenseBody)
                // @ts-ignore
                await (await UserLicenseHandlers.create(data)).create(userLicenseBodyObject)
                console.log("UserLicense Body Object", userLicenseBodyObject)

                const teamUserBody = {
                    ...req.body,
                    user: insertedUser.id,
                    team: team_id
                }

                 console.log("team body", teamUserBody)
                const teamUserBodyObject = omit(["memberEmail", "license","team_id", "company", "id", "expiry_date"], teamUserBody)
                const teamUser = await (await TeamUserHandlers.create(data)).create(teamUserBodyObject)

                if (team_id){
                    await (await TeamHandlers.create(data)).update({id: team_id, expiry_date: expiry_date })
                }

                console.log("Company license", `${license} - ${company}`)
                const count = await TeamService.incrementMemberCount(data, license, company)

                res.respond({
                    license,
                    memberEmail,
                    count,
                    teamUser
                });
    })

export const addMembers =
    catchErrors(async (req, res) => {

        const { emails, team_id, content } = req.body

        const data = await DataProvider.create()
        const team  = await (await TeamHandlers.create(data)).getById({id : team_id})
        const licenseObject = await (await LicenseHandlers.create(data)).getById(team?.license)
        const userHandler   = await UserHandlers.create(data)
        const userLicenseHandler   = await UserLicenseHandlers.create(data)
        const emailService = SendEmail()
        for(const email of emails){
            const emailExists    =   await userHandler.getEmail(email)
            const insertedUser =  emailExists ? emailExists : await (await UserHandlers.create(data)).create({
                email
            })

            const userLicenseExist = await userLicenseHandler.get({license: team?.license, user: insertedUser?.id})

            const userLicenseBody = { license: team?.license, user: insertedUser.id}
            const userLicenseObject = userLicenseExist ? userLicenseExist :  await userLicenseHandler.create(userLicenseBody)

            const teamUserBody = {
                user: insertedUser.id,
                team: team_id
            }
            // console.log("team body", teamUserBody)
            const teamUserExists = await (await  TeamUserHandlers.create(data)).getAll(teamUserBody)
            if (teamUserExists?.length < 1){
                await (await TeamUserHandlers.create(data)).create(teamUserBody)
            }

            if(userLicenseExist && !userLicenseExist.isInvited ){
                await emailService.sendWelcomeEmail(
                    email,
                    content,
                    "",
                    licenseObject?.expiry,
                    insertedUser.id,
                    team?.license,
                    userLicenseObject.id)
            }

            await userLicenseHandler.update({id: userLicenseObject?.id, isInvited: true, invitationMessage: content})
        }

        res.respond({
        });
    })

export const removeMember = catchErrors(async(req, res) => {
    const { email, license, company } = req.body
    const data = await DataProvider.create();
    const user = await (await UserHandlers.create(data)).getEmail(email)
    const userObject = user && await (await UserLicenseHandlers.create(data)).delete(user?.id)
    console.log("user from teams", user)
    await TeamService.decrementMemberCount(data, license,company,user)


    return res.respond({
        user,
        userObject,
        email
    })
})

export const getAll =
    catchErrors(async (req, res) => {
        const {license} = req.params
        const data = await DataProvider.create()
        const teams = await (await TeamHandlers.create(data)).getAll(license)

        res.respond({
            teams
        });

    })

export const getTeam =
    catchErrors(async (req, res) => {
        const {license} = req.params
        const {type}    = req.query
        const data = await DataProvider.create()

        const team = type && type === "id" ? await (await TeamHandlers.create(data)).getById({id: license}) :
            await (await TeamHandlers.create(data)).getById({license})


        res.respond({
            team
        })
    })

export const getTeamMembers =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const teams = await (await TeamUserHandlers.create(data)).getTeamMembers(req.params.id)
        const uniqueMembers = Array.from(new Set(teams.map((a) => a.id))).map((id) => {
            return teams?.find((a) => a.id === id);
        })

        res.respond({
            data: uniqueMembers
        })
    })

export const getTeams =
    catchErrors(async (req, res) => {
        const {user_id} = req.params
        const {coordinator} = req.query
        console.log("Req id", user_id)
        const data = await DataProvider.create()
        const teamUserHandler = (await TeamUserHandlers.create(data))
        const teamHandler = await TeamHandlers.create(data)
        const teams = coordinator ? await teamHandler.getTeams({coordinator_id: user_id}) :  await teamUserHandler.getAll({user: user_id})

        res.respond({
             teams
        })
    })

export const getTeamsChartData =
    catchErrors(async (req, res) => {
        const {license} = req.query
        console.log("Req id", license)
        const data = await DataProvider.create()
        const teamUserHandler = (await TeamUserHandlers.create(data))

        const teams = await teamUserHandler.getAll({license: license?.toString()});

        const groupedCounts = teams.reduce((accumulator, team) => {
            if (!accumulator[team.team]) {
                accumulator[team.team] = {
                    isStartedTrueCount: 0,
                    isStartedFalseCount: 0,
                    isCompletedTrueCount: 0,
                    uniqueUsers: new Set()
                };
            }

            // Skip if user is already counted
            if (accumulator[team.team].uniqueUsers.has(team.user)) {
                return accumulator;
            }
            accumulator[team.team].uniqueUsers.add(team.user);

            accumulator[team.team].isStartedTrueCount += team.isStarted ? 1 : 0;
            accumulator[team.team].isStartedFalseCount += !team.isStarted ? 1 : 0;
            accumulator[team.team].isCompletedTrueCount += team.completed ? 1 : 0;

            return accumulator;
        }, {});

// Remove uniqueUsers sets and prepare the final groupedCounts object
        const finalGroupedCounts = {};
        for (const teamId in groupedCounts) {
            const { uniqueUsers, ...teamCounts } = groupedCounts[teamId];
            finalGroupedCounts[teamId] = teamCounts;
        }

        console.log('Individual counts by team with unique users:', finalGroupedCounts);

        res.respond({
            teams,
            groupedCounts
        })
    })

export const getTeamsByUser =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const teams = await (await TeamUserHandlers.create(data)).getTeamMembers(req.params.id)

        res.respond({
            data: teams
        })
    })

export const sendEmails = catchErrors(async (req, res) =>{
    const {license, scheduled, scheduled_at} = req.body
    console.log("scheduled scheduled_at", `${scheduled} ${scheduled_at}`)

    const data = await DataProvider.create()
    const users = await (await UserLicenseHandlers.create(data)).getByLicenseId({license})
    const licenseObject = await (await LicenseHandlers.create(data)).getById(license)
    const team: Team = await  (await TeamHandlers.create(data)).getById({license})

    const emailService = SendEmail();

    console.log("Email users", users)
    for (const value of users) {
        if (value.isInvited  != null) continue
        const to = value.email
        // const subject = team.email_subject
        const email_content = team?.email_message
        const sign_off = team.sign_off
        const user_license_id = value.id

        emailService.sendWelcomeEmail(to, email_content, sign_off, licenseObject?.expiry, value.user, license, user_license_id)

        //  EmailService.queueEmail(
        //     {
        //         to,
        //         subject,
        //         email_content,
        //         sign_off,
        //         scheduled,
        //         scheduled_at,
        //         user_license_id,
        //         interval: team.reminder_interval,
        //         expiry: licenseObject?.expiry,
        //         user: value.user,
        //         license
        //     })
        // console.log(value)

        await (await UserLicenseHandlers.create(data)).update({id:value.id,isInvited: true})
    }

    res.respond({
         users
    })
})

export const resendEmail = catchErrors(async (req, res) =>{
    const {user_id, team_id, license_id} = req.body

    const data = await DataProvider.create()
    const user  = await (await UserHandlers.create(data)).getUser({id: user_id})
    const userLicense = await (await UserLicenseHandlers.create(data)).get({license: license_id, user: user_id})
    const licenseObject = await (await LicenseHandlers.create(data)).getById(license_id)
    const team: Team = await  (await TeamHandlers.create(data)).getById({id: team_id})
    const to = user?.email
    // const subject = ""
    const email_content = userLicense?.invitationMessage
    const sign_off = team?.sign_off
    // const scheduled = null
    // const scheduled_at = null
    const user_license_id = userLicense?.id
    const emailService = SendEmail()

    emailService.sendWelcomeEmail(to, email_content, sign_off, licenseObject?.expiry, user_id, license_id, user_license_id)

    res.respond({
         user
    })
})

export const downloadResults = catchErrors(async (req, res) =>{
    // const {user_id, game_id, license_id} = req.body
    const pdf = require('html-pdf');
    const {user_id, game_id, license_id} = req.query

    // const data = await DataProvider.create()
    // const user  = await (await UserHandlers.create(data)).getUser({id: user_id})
    // resultsEmailService.queueEmail({to: user.email, subject: "Results Email", user_id: user, game_id, license_id})

    const resultsHtml = await resultsTemplate({user_id, game_id, license_id})

    const options = { format: 'Letter'}

    // pdf.create(resultsHtml, options).toFile('./test.pdf', function(err, res) {
    //     if (err) return console.log(err);
    //     console.log(res);
    // });

    pdf.create(resultsHtml, options).toBuffer(function(err, buffer) {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while generating the PDF');
            return;
        }

        // Send the PDF as a file attachment in the HTTP response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${user_id}.pdf`);
        res.send(buffer);

    })

})

export const getCount =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const license_id = req.params.id
        const body  = {
            license: license_id
        }
        const count = await (await TeamUserHandlers.create(data)).getCount(body)
        res.respond({
            data: count
        })
    })