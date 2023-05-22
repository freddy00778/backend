import DataProvider from "../data/DataProvider"
import InvoiceHandlers from "../data/checkout/InvoiceHandlers"
import * as planService from "./subscriptionPlanService"
import omit from "omit"
import orderId from "order-id";

export const getAll = async() => {
    const data = await DataProvider.create()
    // console.log("body", body)
    return  (await InvoiceHandlers.create(data)).getAll();
}

export const getInvoice = async(input) => {
    const data = await DataProvider.create()
    // console.log("body", body)
    return  (await InvoiceHandlers.create(data)).getInvoice(input);
}

export const createInvoice = async(req, items, license) => {

    const data = await DataProvider.create()
    const provider = "Payment provider"
    const tax = 0
    let total = 0

    await Promise.all(items.map(async (item) => {
        const plan =  await planService.getById(item,data)
        total += item.qty * plan.price_per_person
    }))

    // const orderId = await customId({
    //     uniqueId: 4563
    // });

    const orderNo = orderId("zertde").generate()
    // console.log("custom id", orderNo)

    // const body = {...req.body,total, tax, provider,license, transaction_number:uuidv4() }
    const body = {...req.body,total, tax, provider,license, transaction_number:orderNo, formatted_total: req.body.formattedPrice}
    const bodyObject = omit(["items","email","emailInvoice","formattedPrice"], body)
    // @ts-ignore
    return await (await InvoiceHandlers.create(data)).create(bodyObject)
    // return await (await InvoiceHandlers.create(data)).update({
    //
    // })
}

export const updateInvoice = async(transactionNumber, input) => {
    const data = await DataProvider.create()
    return await (await InvoiceHandlers.create(data)).update(transactionNumber, input);

}