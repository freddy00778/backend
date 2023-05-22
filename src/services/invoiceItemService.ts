import DataProvider from "../data/DataProvider";
import * as planService from "./subscriptionPlanService";
import InvoiceItemHandlers from "../data/invoiceItem/InvoiceItemHandlers";
import omit from "omit";

export const invoiceItemService = async(req, items, invoiceObject) => {

    const data = await DataProvider.create()

    await Promise.all(items.map(async (item) => {
        const planObject =  await planService.getById(item,data)
        const subscription_plan = planObject.id
        const unit_price        = planObject.price_per_person
        const quantity          = item.qty
        const description       = planObject.name
        const invoice           = invoiceObject.id
        const body              = { ...req.body, subscription_plan, unit_price, quantity, invoice, description }
        const bodyObject        = omit(["user", "items", "cardCountry", "billingState", "billingZip", "billingCountry","email","emailInvoice","formattedPrice"], body)
        // @ts-ignore
        await (await InvoiceItemHandlers.create(data)).create(bodyObject);
    }))


    return { items }
}
