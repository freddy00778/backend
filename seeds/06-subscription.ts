import {DataProvider} from "../src/data";
import {Database} from "../src/config";
import {User} from "../src/data/users/UserData";
import {futureDate} from "../src/utils/dateUtil";
// import {Industry} from "../src/data/industries/IndustryData";
// import {License} from "../src/data/license/LicenseData";
import {SubscriptionPlan} from "../src/data/subscriptionPlan/SubscriptionPlanData";
// import {Team} from "../src/data/teams/TeamData";
import {Invoice} from "../src/data/checkout/InvoiceData";


exports.seed = async function() {
    const provider = await DataProvider.create()
    // const company = () => provider.postgres.withSchema(Database.schema).table('Company')
    // const industries = () => provider.postgres.withSchema(Database.schema).table('Industry')
    // const functions = () => provider.postgres.withSchema(Database.schema).table('Function')
    // const teams = () => provider.postgres.withSchema(Database.schema).table('Team')
    // const licenses = () => provider.postgres.withSchema(Database.schema).table('License')
    const users = () => provider.postgres.withSchema(Database.schema).table('User')
    const plans = () => provider.postgres.withSchema(Database.schema).table('SubscriptionPlan')
    const subscription = () => provider.postgres.withSchema(Database.schema).table('Subscription')
    const invoices = () => provider.postgres.withSchema(Database.schema).table('Invoice')

        const user           = (await users().select().first() as User)
        // const industry       = (await industries().select().first() as Industry)
        // const license        = (await licenses().select().first() as License)
        // const function_unit  = (await functions().select().first() as FunctionUnit)
        const plan           = (await plans().select().first() as SubscriptionPlan)
        const invoice        = (await invoices().select().first() as Invoice)

    // return company().insert([
    //         {
    //             name: "Demo Company",
    //             function_unit: function_unit.id,
    //             industry: industry.id,
    //             sizeGroup: "100-400"
    //         },
    //     ]).then(async() => {
    //             return teams().insert([
    //                 {
    //                     company      : (await company().select().first()).id,
    //                     license      : license.id,
    //                     name         : "Demo Team",
    //                     contact_email: "fred@gmail.com",
    //                     sizeGroup    : "100-400",
    //                     no_of_members: 0,
    //                     email_format : htmlText,
    //                     email_subject: "Subject of email",
    //                     sign_off     : "Monique",
    //                     system_additional_message: `
    //
    //                     `
    //                 }
    //             ])
    //         }).then(async() => {
                return subscription().insert([
                    {
                        user: user.id,
                        // team: (await teams().select().first() as Team).id,
                        license: invoice.license,
                        subscription_plan: plan.id,
                        invoice: invoice.id,
                        quantity: 10,
                        expires_at: futureDate(30)
                    }
                ])
    // })
};

// const htmlText = `
//     <h1>Team Assessment</h1>
//     <p style="font-weight: 400;">Please do not forward this e-mail.</p>
//     <p style="font-weight: 400;">Hello,</p>
//     <p style="font-weight: 400;">As a member of the team, I'm asking you to complete The Table Group's Online Team Assessment. This team assessment tool is based on the model found in the book, The Five Dysfunctions of a Team.</p>
//     <p style="font-weight: 400;">Before completing, please keep in mind the following:</p>
//     <ol style="font-weight: 400;">
//     <li>Take the team assessment as soon as possible.</li>
//     <li>The assessment is designed to be completed in approximately 15 minutes. Be thoughtful about your responses, but don&rsquo;t agonize over each response. Your initial &ldquo;gut feel&rdquo; is usually best.</li>
//     <li>Be honest. The team needs your candid feedback. To ensure confidentiality, your results will be tabulated by The Table Group and presented in aggregate form.</li>
//     </ol>
//     <p style="font-weight: 400;">Below is the link to your personal team assessment. It should only be used by you to take the assessment. You should not forward this link to other members on your team as each link is customized for each user. Doing so will invalidate the test results:</p>
//     <p style="font-weight: 400;"><a href="https://www.tablegroup.com/rd/?team=76382&amp;person=453286" data-saferedirecturl="https://www.google.com/url?q=https://www.tablegroup.com/rd/?team%3D76382%26person%3D453286&amp;source=gmail&amp;ust=1661357990495000&amp;usg=AOvVaw0ja2zi2DX9xUqe7zio6rS1">https://www.tablegroup.com/rd/?team=76382&amp;person=453286</a></p>
//     <p style="font-weight: 400;">Thanks in advance for your time and effort. Please let me know if you have any questions.</p>
//     <p style="font-weight: 400;">Sincerely,</p>
//     `