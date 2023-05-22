import DataProvider from "../data/DataProvider";
import InvoiceHandlers from "../data/checkout/InvoiceHandlers";
import omit from "omit";

export const getAll = async(req) => {

    const data = await DataProvider.create()

    const body = {...req.body}
    const bodyObject = omit(["items"], body)
    // @ts-ignore
    const members =  await (await InvoiceHandlers.create(data)).create(bodyObject)
    // const teams =  await (await InvoiceHandlers.create(data)).create(bodyObject)
    
    return members
}
