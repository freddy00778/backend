/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Invoice {
  id: string
  license: string
  user?: string
  provider?: string
  total: number
  tax: number
  cardCountry: string
  billingState: string
  billingZip: string
  billingCountry: string
  transaction_number: string
  payment_link: string
  admin_setup: boolean
  paid: boolean
  formatted_total: string
  created_at: string
  updated_at: string
}

export interface Data {
  getAll: ReturnType<typeof getAll>,
  getInvoice: ReturnType<typeof getInvoice>,
  create: ReturnType<typeof createInvoice>,
  update: ReturnType<typeof updateInvoice>,
}

export interface GetInput {
  id?: string,
  license?: string
  user?: string
  transaction_number?: string
  total?: number
  formatted_total?: string
  provider?: string
  payment_link?: string
  paid?: boolean
  admin_setup?: boolean
  created_at?: string
  updated_at?: string
}


export interface GetListInput extends Omit<Invoice, 'id'> {}

export interface CreateInput extends Omit<Invoice, 'id'> {}

export const getAll = (invoices: () => QueryBuilder) => async (input?: GetInput) => {

  const query = invoices().select("Invoice.*","User.firstName", "User.lastName","User.email", "InvoiceItem.quantity").from('Invoice')
      .leftJoin('User', 'User.id', 'Invoice.user')
      .leftJoin('InvoiceItem', 'Invoice.id', 'InvoiceItem.invoice')
     if (input) query.where(input)

  return query.orderBy("created_at","desc");
}

export const getInvoice = (invoices: () => QueryBuilder) => async (input: GetInput) => {

  return invoices().select("Invoice.*","User.firstName", "User.lastName","User.email", "InvoiceItem.quantity").from('Invoice')
      .leftJoin('User', 'User.id', 'Invoice.user')
      .leftJoin('InvoiceItem', 'Invoice.id', 'InvoiceItem.invoice')
      .where(input).first();
}

export const createInvoice = (invoices: () => QueryBuilder) => async (input?: GetInput) => {

  return (await invoices().insert(input, ['id', 'license', 'user', 'provider', 'total','formatted_total',
    'tax', 'cardCountry', 'billingState', 'paid', 'payment_link', 'transaction_number']))[0];
}

export const updateInvoice = (invoices: () => QueryBuilder) => async (transactionNumber: String, input: GetInput) => {
  return (await invoices().select().where({transaction_number: transactionNumber})
      .update(input))
}

export async function create (data: DataClient): Promise<Data> {
  const invoices = () => data.postgres.withSchema(Database.schema).table('Invoice')

  return {
    getAll:     getAll(invoices),
    getInvoice: getInvoice(invoices),
    create:     createInvoice(invoices),
    update:     updateInvoice(invoices)
  }
}

export default {create}
