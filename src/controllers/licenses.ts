import {catchErrors} from '../errors';
import DataProvider from "../data/DataProvider";
// import UserHandlers from "../data/users/UserHandlers";
import UserLicenseHandlers from "../data/userLicense/UserLicenseHandlers";

export const getUserLicenses =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { license,team } = req.body
        const licenseBody = {
            license,
            team
        }
        const userLicenses =  await (await UserLicenseHandlers.create(data)).getByLicenseId(licenseBody)
        const licenses = Array.from(new Set(userLicenses.map(obj => obj.id))).map(id => {
            return userLicenses.find(obj => obj.id === id);
        })

        res.respond({
            body: req.body,
            data: licenses
        })
    })

export const updateUserLicenseStatus =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()
        const { license, user } = req.body

        const licenseBody = {
            ...req.body,
            license,
            user
        }

        const userLicenses =  await (await UserLicenseHandlers.create(data)).updateStatus(licenseBody)

        res.respond({
            body: req.body,
            data: userLicenses
        })
    })
