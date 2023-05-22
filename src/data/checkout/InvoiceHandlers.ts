
import {DataClient} from '../index'
import InvoiceController, {Controller} from './InvoiceController'
import {GetInput} from "./InvoiceData";


export const getAll = (invoice: Controller) => async (input?: GetInput) => {
  return  invoice.getAll(input)
}

export const getInvoice = (invoice: Controller) => async (input: GetInput) => {
  return  invoice.getInvoice(input)
}

export const createInvoice = (invoice: Controller) => async (req: GetInput) => {
    return await invoice.create(req)
}

export const updateInvoice = (checkout: Controller) => async (transactionNumber: String, input: GetInput) => {
  return await checkout.update(transactionNumber, input)
}

export async function create (data: DataClient) {
  const invoice = await InvoiceController.create(data)

  return {
    getAll: getAll(invoice),
    getInvoice: getInvoice(invoice),
    create: createInvoice(invoice),
    update: updateInvoice(invoice),
  }
}

export default {create}
