import CheckoutData, {Data, GetInput} from './InvoiceData'
import {DataClient} from '../index'

export interface Controller {
  getAll:     ReturnType<typeof getAll>,
  getInvoice: ReturnType<typeof getInvoice>,
  create:     ReturnType<typeof createInvoice>,
  update:     ReturnType<typeof updateInvoice>,
}

export const getAll = (checkout: Data) => async (input?: GetInput) => {
  return checkout.getAll(input)
}

export const getInvoice = (checkout: Data) => async (input: GetInput) => {
  return checkout.getInvoice(input)
}

export const createInvoice = (checkout: Data) => async (input?: GetInput) => {
  return checkout.create(input)
}

export const updateInvoice = (checkout: Data) => async (transaction_number: String, input: GetInput) => {
  return checkout.update(transaction_number, input)
}

export async function create (data: DataClient): Promise<Controller> {
  const invoices = await CheckoutData.create(data)

  return {
    getAll:     getAll(invoices),
    getInvoice: getInvoice(invoices),
    create:     createInvoice(invoices),
    update:     updateInvoice(invoices)
  }
}

export default {create}
