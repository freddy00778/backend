import {DataProvider} from "../src/data";
import {Database} from "../src/config";
// import {Game} from "../src/data/game/GameData";

exports.seed = async function() {
    const provider          = await DataProvider.create()
    const table             = (table) => provider.postgres.withSchema(Database.schema).table(table)

    const industries        = () => table("Industry")
    const functions         = () => table('Function')
    const subscriptions     = () => table('Subscription')
    const invoiceItems      = () => table('InvoiceItem')
    const subscriptionPlan  = () => table('SubscriptionPlan')
    const games             = () => table('Game')
    const invoices          = () => table('Invoice')
    const company           = () => table('Company')
    const teamUser          = () => table('TeamUser')
    const userLicense       = () => table('UserLicense')
    const team              = () => table('Team')
    const phaseStep         = () => table('PhaseStep')
    const step              = () => table('Step')
    const phase             = () => table('Phase')
    const userProgress      = () => table('UserProgress')

    const licenses          = () => table('License')
    const users             = () => table('User')
    // const questions         = () => table('Question')
    // const videos            = () => table('Video')

    await subscriptions().delete()
    await teamUser().delete()
    await team().delete()
    await company().delete()
    await industries().delete()
    await functions().delete()
    await invoiceItems().delete()
    await subscriptionPlan().delete()
    await userProgress().delete()
    await phaseStep().delete()
    await step().delete()
    await phase().delete()
    await games().delete()
    await invoices().delete()

    await userLicense().delete()
    await licenses().delete()
    await users().delete()

    // await questions().delete()
    // await videos().delete()

};
