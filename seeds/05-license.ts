import {DataProvider} from "../src/data";
import {Database} from "../src/config";
import {User} from "../src/data/users/UserData";
import {futureDate} from "../src/utils/dateUtil";

exports.seed = async function() {
    const provider = await DataProvider.create()
    const licenses = () => provider.postgres.withSchema(Database.schema).table('License')
    const users = () => provider.postgres.withSchema(Database.schema).table('User')
    const invoices = () => provider.postgres.withSchema(Database.schema).table('Invoice')

        const user = (await users().select().first() as User)
        return licenses().insert([
            {
                user: user.id,
                expiry: futureDate(30),
                isActive: true
            },
        ]).then(async() => {
                return invoices().insert([
                    {
                        license: (await licenses().select().first()).id,
                        user: user.id,
                        transaction_number: "12345678965",
                        provider: "Provider",
                        total: 100,
                        formatted_total : "ZAR 100",
                        tax: 0,
                        cardCountry: "Ghana",
                        billingState: "Greater Accra",
                        billingZip: "00233",
                        billingCountry: "Ghana",
                        paid: true
                    }
                ])
            })
};
