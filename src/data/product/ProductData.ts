/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Product {
  id: string
  name: string
  price: number
}

export interface Data {
  getById: ReturnType<typeof getProductById>,
  create: ReturnType<typeof createProduct>,
  update: ReturnType<typeof updateProduct>,
}

export interface GetInput {
  id?: string
  name?: string
  price: number
}

export interface GetListInput extends Omit<Product, 'id'> {}

export interface CreateInput extends Omit<Product, 'id'> {}

export const createProduct = (products: () => QueryBuilder) => async (input?: CreateInput) => {

  return (await products().insert(input, ['id', 'name', 'price']) as [{ id: string }])[0];
}

export const updateProduct = (products: () => QueryBuilder) => async (input: GetInput) => {
  return (await products().select().where({id: input.id}).update(input))
}

export const getProductById = (products: () => QueryBuilder) => async (id: String) => {
  return (await products().select().where({id: id}) as Product[])[0]
}

export async function create (data: DataClient): Promise<Data> {
  const products = () => data.postgres.withSchema(Database.schema).table('Product')

  return {
    getById: getProductById(products),
    create:   createProduct(products),
    update:   updateProduct(products)
  }
}

export default {create}
