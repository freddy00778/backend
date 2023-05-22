import DataProvider from "../data/DataProvider";
import LicenseHandlers from "../data/license/LicenseHandlers";
import omit from "omit";
import {futureDate} from "../utils/dateUtil";


export const createLicense = async (req) => {
    const data = await DataProvider.create()
    const expiry = futureDate(30)
    const body =  {...req.body, expiry}
    const bodyObject        = omit(["formattedPrice", "emailInvoice","email","items", "cardCountry", "billingState", "billingZip", "billingCountry"], body)
    // @ts-ignore
    return await (await LicenseHandlers.create(data)).create(bodyObject);
}

export const updateLicense = async (req) => {
    const data = await DataProvider.create()
    return await (await LicenseHandlers.create(data)).update(req.body);
}