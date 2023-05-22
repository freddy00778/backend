import DataProvider from "../data/DataProvider";
import omit from "omit";
import SubscriptionHandlers from "../data/subscription/SubscriptionHandlers";
import { futureDate } from "../utils/dateUtil";

export const create = async(req, invoiceObject, license) => {

    const data              = await DataProvider.create()
    const user              = invoiceObject.user
    const invoice           = invoiceObject.id
    const expires_at        = futureDate(30)
    const subscription_plan = req.body.items[0].id
    const quantity          = req.body.items[0].qty
    const body              = {...req.body,user, invoice, subscription_plan, expires_at, quantity, license}
    const bodyObject        = omit([ "formattedPrice","emailInvoice","email",
                                    "name", "items", "cardCountry", "billingState",
                                    "billingZip", "billingCountry"], body)

    // @ts-ignore
    return await (await SubscriptionHandlers.create(data)).create(bodyObject)
}

export const updateSubscription = async() => {

}