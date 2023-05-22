import * as users from '../../controllers/users';
import * as checkout from '../../controllers/checkout';
import * as industry from '../../controllers/industries';
import * as question from '../../controllers/questions'
import * as subgame from '../../controllers/subgames'
import * as FunctionController from '../../controllers/functions';
import * as company  from '../../controllers/company'
import * as team  from '../../controllers/teams'
import * as license  from '../../controllers/licenses'
import * as game  from '../../controllers/games'
import * as step  from '../../controllers/steps'
import * as phase  from '../../controllers/phases'
import * as plans  from '../../controllers/plans'
import * as subscriptions  from '../../controllers/subscriptions'
import * as progress  from '../../controllers/progress'
import * as videos  from '../../controllers/videos'
import * as Auth from '../../middleware/auth';
import {DataProvider} from "../../data";
import {Database} from "../../config";
import UserLicenseHandlers from "../../data/userLicense/UserLicenseHandlers";
import * as bcrypt from "bcrypt";
import UserHandlers from "../../data/users/UserHandlers";
export const attachPublicRoutes = (app: any): void => {

  app.post('/api/v1/auth/login', users.login)
  app.post('/api/v1/auth/admin-login', users.adminLogin)
  app.post('/api/v1/auth/assessment-login', users.assessmentLogin)
  app.get('/api/v1/user',Auth.authorize(), users.getUser)
  app.post('/api/v1/users', users.createUser)
  app.post('/api/v1/users/:id', users.updateUser)
  app.patch('/api/v1/users/', users.update)
  app.post('/api/v1/complete-game/', users.completeGame)
  app.get('/api/v1/users',Auth.authorize(), users.getUsers)
  app.get('/api/v1/users/:id', Auth.authorize(), users.getSingleUser)

  app.post('/api/v1/add-administrator/', checkout.addAdministrator)

  // app.post('/api/v1/checkout', Auth.authorize(), checkout.create)
  app.post('/api/v1/checkout', Auth.authorize(), checkout.sendPaymentLink)
  app.post('/notify', checkout.paymentNotification)
  app.get('/process-payment/:token', checkout.processPayment)
  app.get('/admin-setup/:token', checkout.validateAndRedirectToSetup)
  app.get('/api/v1/sales/check/:transaction_id', checkout.checkTransactionStatus)
  app.get('/api/v1/sales/test/:transaction_id', checkout.testTransactionStatus)

  app.get('/api/v1/sales', Auth.authorize(), checkout.getAll)
  app.get('/api/v1/sales/details/:token', Auth.authorize(), checkout.getSaleDetails)
  app.post('/api/v1/sales/details/regenerate-link/:transaction_number', Auth.authorize(), checkout.regenerateLink)
  app.get('/api/v1/sales/:id', Auth.authorize(), checkout.getSale)
  app.post('/api/v1/sales/:id', Auth.authorize(), checkout.getSale)
  app.post('/api/v1/sales/form/process',  checkout.processPaymentForm)

  app.get("/api/v1/plans", Auth.authorize(), plans.getAll)
  app.post("/api/v1/plans", Auth.authorize(), plans.createPlan)
  app.get("/api/v1/plans/:id", Auth.authorize(), plans.getById)

  app.get("/api/v1/subscriptions", Auth.authorize(), subscriptions.getAll)
  app.get("/api/v1/all-subscriptions", Auth.authorize(), subscriptions.getSubscriptions)
  app.get("/api/v1/subscriptions/:id", Auth.authorize(), subscriptions.getSubscription)
  app.post("/api/v1/subscriptions", Auth.authorize(), subscriptions.getSingleSubscription)

  // app.post("/api/v1/extend-subscription", Auth.authorize(), subscriptions.extendSubscription)
  app.post("/api/v1/extend-subscription", subscriptions.extendSubscription)

  //functions
  app.get('/api/v1/functions', Auth.authorize(), FunctionController.getFunctions)
  app.post('/api/v1/functions', Auth.authorize(), FunctionController.getFunctions)

  //industries
  app.get('/api/v1/industries', Auth.authorize(), industry.getIndustries)
  app.post('/api/v1/industries', Auth.authorize(), industry.createIndustry)

  //questions
  app.get('/api/v1/questions', Auth.authorize(), question.getQuestions)
  app.get('/api/v1/questions/:id', Auth.authorize(), question.getQuestion)
  app.post('/api/v1/questions', Auth.authorize(), question.createQuestion)
  app.patch('/api/v1/questions', Auth.authorize(), question.updateQuestion)

  //sub games
  app.get('/api/v1/sub-games', Auth.authorize(), subgame.getSubGames)
  app.get('/api/v1/sub-games/:id', Auth.authorize(), subgame.getSubGame)
  app.post('/api/v1/sub-games', Auth.authorize(), subgame.createSubGame)


  //company
  // app.get('/api/companies', Auth.authorize(), company.create)
  app.post('/api/v1/companies', Auth.authorize(), company.create)

  //Teams
  app.post('/api/v1/teams', Auth.authorize(), team.create)
  // app.get('/api/v1/teams', Auth.authorize(), team.create)
  app.get('/api/v1/teams/:license', Auth.authorize(), team.getAll)
  app.get('/api/v1/teams/single/:license', Auth.authorize(), team.getTeam)
  app.get('/api/v1/teams/list/:user_id', team.getTeams)


  app.get('/api/v1/teams/charts/data', users.teamUsersChartData)

  //Team Members
  app.get('/api/v1/teams/members/:id', team.getTeamMembers)
  app.get('/api/v1/teams/members/counts/:id', team.getCount)
  app.post('/api/v1/teams/send-invites/:id', team.sendEmails)
  app.post('/api/v1/teams/resend-email', team.resendEmail)

  //Emails
  app.post('/api/v1/add-members', Auth.authorize(), team.addMembers)
  app.post('/api/v1/emails', Auth.authorize(), team.addMember)
  app.delete('/api/v1/emails', Auth.authorize(), team.removeMember)

  //Licenses
  app.post('/api/v1/licenses', Auth.authorize(), license.getUserLicenses)
  app.post('/api/v1/update-user-licenses', Auth.authorize(), license.updateUserLicenseStatus)


  app.get("/api/v1/games", Auth.authorize(), game.getAll)
  app.get("/api/v1/games/:id", Auth.authorize(), game.getGame)
  // app.get("/api/v1/games", game.getAll)
  // app.post("/api/v1/games", Auth.authorize(), game.create)
  app.post("/api/v1/games", game.create)


  // phases
  app.get("/api/v1/phases", Auth.authorize(), phase.getAll)
  app.post("/api/v1/phases", Auth.authorize(), phase.create)

  // progress
  app.get("/api/v1/progress", Auth.authorize(), progress.getAll)
  app.post("/api/v1/progress", Auth.authorize(), progress.createProgress)
  app.get("/api/v1/progress/:id", Auth.authorize(), progress.getProgress)
  app.post("/api/v1/progress/:id", Auth.authorize(), progress.getProgress)
  app.patch("/api/v1/progress/update/user", Auth.authorize(), progress.updateProgress)
  // app.post("/api/v1/progress/next-step/:order", progress.getNextStep)
  app.post("/api/v1/progress/next-step/:order", Auth.authorize(), progress.getNextStep)
  app.post("/api/v1/progress/kc-tries/:user", Auth.authorize(), progress.getKCTries)

  // videos
  app.get("/api/v1/videos", Auth.authorize(), videos.getAll)
  // app.post("/api/v1/videos", Auth.authorize(), videos.createVideo)
  app.post("/api/v1/videos", videos.createVideo)
  app.get("/api/v1/videos/:id", Auth.authorize(), videos.getById)

  // steps
  app.get("/api/v1/steps", Auth.authorize(), step.getAll)
  app.get("/api/v1/steps/:id", Auth.authorize(), step.getStep)
  app.post("/api/v1/steps", Auth.authorize(), step.create)
  app.get("/api/v1/steps/game/:id", step.getByGame)

  app.get("/api/v1/phase-steps/:id", Auth.authorize(), step.getPhaseStep)

  // app.get("/api/v1/steps/game", step.getByGame)

  // @ts-ignore
  app.get("/add-phases",async function(req, res){

    // console.log(req)

    const data = await DataProvider.create()
    const users = await (await UserLicenseHandlers.create(data)).getUserLicenses()

    return res.send(users)

    return res.end()
  })

  app.post('/api/v1/reset-password-email', users.resetPassword)

  app.post('/api/v1/change-password', users.changePassword)

  app.get('/api/v1/download-results', team.downloadResults)

  app.post("/api/v1/clear-progress", async(req, res) => {
      const {user} = req.body
      const provider = await DataProvider.create()
      const userProgress = () => provider.postgres.withSchema(Database.schema).table('UserProgress')
      await userProgress().select().where({user: user}).delete()
      return res.send("OK")
  })

  app.get("/api/v1/reset-database", async(req, res) => {
    console.log("Body", req.body)
      const provider = await DataProvider.create()
      const table             = (table) => provider.postgres.withSchema(Database.schema).table(table)

    // const industries        = () => table("Industry")
    // const functions         = () => table('Function')
    const subscriptions     = () => table('Subscription')
    const invoiceItems      = () => table('InvoiceItem')
    const invoices          = () => table('Invoice')
    const company           = () => table('Company')
    const teamUser          = () => table('TeamUser')
    const userLicense       = () => table('UserLicense')
    const team              = () => table('Team')
    const licenses          = () => table('License')
    const userProgress      = () => table('UserProgress')
    const users             = () => table('User')

   try {
         await subscriptions().delete()
         await teamUser().delete()
         await team().delete()
         await company().delete()
         // await industries().delete()
         // await functions().delete()
         await invoiceItems().delete()
         await invoices().delete()
         await userLicense().delete()
         await licenses().delete()
         await userProgress().delete()
         await users().delete()

         await createAdmin()

   }catch (e) {
     return res.send("error")
   }

    res.send("OK")

  })

}


const createAdmin = async () => {
  const hashedPassword = bcrypt.hashSync("TOPman88$$", 10);
  const data = await DataProvider.create();
  const userHandlers = await UserHandlers.create(data);

    await userHandlers.create({
      email: "frederickankamah988@gmail.com",
      firstName: "Frederick",
      lastName: "Ankamah",
      password: hashedPassword,
      isAdmin: true
    });
};


