/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface InvoiceItem {
  id: string
  subscription_plan: string
  quantity: number
  invoice: string
  description: string
}

export interface Data {
  getById: ReturnType<typeof getById>
  create: ReturnType<typeof createInvoiceItem>
  update: ReturnType<typeof updateInvoiceItem>
}

export interface GetInput {
  id: string
  subscription_plan: string
  unit_price: number
  quantity: number
  invoice: string
  description: string
}

export interface GetListInput extends Omit<InvoiceItem, 'id'> {}

export interface CreateInput extends Omit<InvoiceItem, 'id'> {}

export const createInvoiceItem = (invoiceItems: () => QueryBuilder) => async (input?: GetInput) => {

  return (await invoiceItems().insert(input, ['id', 'invoice', 'subscription_plan', 'description', 'quantity']) as [{ id: string }])[0];
}

export const updateInvoiceItem = (invoiceItems: () => QueryBuilder) => async (input: GetInput) => {
  return (await invoiceItems().select().where({id: input.id}).update(input))
}

export const getById = (invoiceItems: () => QueryBuilder) => async (input: GetInput) => {

  return invoiceItems().select("InvoiceItem.*").from('InvoiceItem')
      .leftJoin('Subscription', 'InvoiceItem.invoice', 'Subscription.invoice')
      .where(input)[0]

  // return (await invoiceItems().select().where({id: id}) as InvoiceItem[])[0]
}

export async function create (data: DataClient): Promise<Data> {
  const invoiceItems = () => data.postgres.withSchema(Database.schema).table('InvoiceItem')

  return {
    getById:  getById(invoiceItems),
    create:   createInvoiceItem(invoiceItems),
    update:   updateInvoiceItem(invoiceItems)
  }
}

export default {create}
