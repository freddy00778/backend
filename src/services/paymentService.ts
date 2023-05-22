import {updateInvoice} from "./invoiceService";
import * as subscriptionService from "./subscriptionService"
import {randomUUID} from "crypto";


const paymentService = async (req,invoice, license) => {
    const transactionNumber = randomUUID().toString()
    const invoiceObject = { ...invoice, transactionNumber }
    // const queryString = new URLSearchParams(invoiceObject).toString()

    // check if payment is successful from payment provider

    // if successful, create a subscription
    await subscriptionService.create(req, invoiceObject, license)

    // if successful, update invoice
     await updateInvoice(transactionNumber, {paid: true})
}

export default paymentService