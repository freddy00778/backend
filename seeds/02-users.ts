import {DataProvider} from "../src/data";
import {Database} from "../src/config";
import * as bcrypt from "bcrypt";

exports.seed = async function() {
    const provider = await DataProvider.create()
    const users = () => provider.postgres.withSchema(Database.schema).table('User')
        return users().insert([
                {
                    email: 'frederickankamah988@gmail.com',
                    username: 'freddy008',
                    password: bcrypt.hashSync("password", 10),
                    firstName: "Frederick",
                    lastName: "Ankamah",
                    phoneNumber: "233242953673",
                    isVerified: true,
                    isActive: true,
                    isAdmin: true,
                },
                {
                    email: 'monique@changeverve.co.za',
                    username: 'monique',
                    password: bcrypt.hashSync("password", 10),
                    firstName: "Monique",
                    lastName: "",
                    phoneNumber: "",
                    isVerified: true,
                    isActive: true,
                    isAdmin: true,
                }
                ])
};
