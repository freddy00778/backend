import {DataClient} from '../index'
import InvoiceItemController, {Controller} from './InvoiceItemController'
import {GetInput} from "./InvoiceItemData";


export const createInvoiceItem = (invoiceItem: Controller) => async (req: GetInput) => {
    return await invoiceItem.create(req)
}


export const getInvoiceItem = (invoiceItem: Controller) => async (input: GetInput) => {
  return await invoiceItem.getById(input)
}

export async function create (data: DataClient) {
  const invoiceItem = await InvoiceItemController.create(data)

  return {
    create: createInvoiceItem(invoiceItem),
    getById: getInvoiceItem(invoiceItem)
  }
}

export default {create}
