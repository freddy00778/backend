import CompanyHandlers from "../../data/company/CompanyHandlers";
import DataProvider from "../../data/DataProvider";
import TeamHandlers from "../../data/teams/TeamHandlers";
import {GetInput} from "../../data/teams/TeamData";
import {SendEmail} from "../email/SendEmail";
import LicenseHandlers from "../../data/license/LicenseHandlers";
import UserHandlers from "../../data/users/UserHandlers";
import UserLicenseHandlers from "../../data/userLicense/UserLicenseHandlers";
import TeamUserHandlers from "../../data/teamUser/TeamUserHandlers";


export async function TeamProcess() {

    const data = await DataProvider.create()
    const emailService = SendEmail()

    return {
        async createCompany(company_name, company_function, company_size, company_industry) {
            return await (await CompanyHandlers.create(data)).create(
                {
                    name: company_name,
                    industry: company_industry,
                    function_unit: company_function,
                    sizeGroup: company_size
                })
        },

        async createTeam(input: GetInput) {
            const team = await (await TeamHandlers.create(data)).create(input)
            return team
        },

        async addEmailInfo(id, email_message: string, sign_off: string): Promise<void> {
            await (await TeamHandlers.create(data)).update({id, email_message, sign_off})
        },

        async addMembers(memberEmail: string, license:string, team_id: string, expiry_date: string) {
            const userObject    =   await (await UserHandlers.create(data)).getEmail(memberEmail)
            const insertedUser =  userObject ? userObject : await (await UserHandlers.create(data)).create({email: memberEmail})
            await (await UserLicenseHandlers.create(data)).create({license, user: insertedUser.id})
            const teamUser = await (await TeamUserHandlers.create(data)).create({user: insertedUser?.id, team: team_id})
            await (await TeamHandlers.create(data)).update({id: team_id, expiry_date: expiry_date })
            const team = await (await TeamHandlers.create(data)).getById({id: team_id})
            const no_of_members = team?.no_of_members ?  team?.no_of_members+1 : 0;
            const count = await (await TeamHandlers.create(data)).update({id: team_id, no_of_members})

            return {
                license,
                memberEmail,
                count,
                teamUser
            }

        },

        async sendCoordinatorEmail(license: string, contact_email, team_name): Promise<void> {
            const licenseObject = await (await LicenseHandlers.create(data)).getById(license)
            const administratorObject = await (await UserHandlers.create(data)).getUser({id: licenseObject.user})
            emailService.confirmationEmailToCoordinator(contact_email, team_name, licenseObject?.expiry, administratorObject?.email)
        }

    }
}


