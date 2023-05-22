import InvoiceItemData, {Data, GetInput} from './InvoiceItemData'
import {DataClient} from '../index'

export interface Controller {
  getById:  ReturnType<typeof getInvoiceItem>
  create:   ReturnType<typeof createInvoiceItem>
}

export const getInvoiceItem = (invoiceItem: Data) => async (input: GetInput) => {
  return invoiceItem.getById(input)
}

export const createInvoiceItem = (invoiceItem: Data) => async (input?: GetInput) => {
  return invoiceItem.create(input)
}


export async function create (data: DataClient): Promise<Controller> {
  const invoiceItems = await InvoiceItemData.create(data)

  return {
    getById: getInvoiceItem(invoiceItems),
    create: createInvoiceItem(invoiceItems),
  }
}

export default {create}
