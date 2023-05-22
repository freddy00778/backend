/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Functions {
  id: string,
  name: string,
}

export interface Data {
  getList: ReturnType<typeof getFunctions>,
  create: ReturnType<typeof createFunction>,
}

export interface GetInput {
  name?: string,
}

export interface GetListInput extends Omit<Functions, 'id'> {}

export const getFunctions = (functions: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = functions().select()
  if (input) query.where(input)

  return (await query as Functions[])
}

export interface CreateInput extends Omit<Functions, 'id'> {}

export const createFunction = (functions: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await functions().insert(input, ['id', 'name']) as [{ id: string }])[0];
}

export async function create (data: DataClient): Promise<Data> {
  const functions = () => data.postgres.withSchema(Database.schema).table('Function')

  return {
    getList:  getFunctions(functions),
    create:   createFunction(functions),
  }
}

export default {create}
