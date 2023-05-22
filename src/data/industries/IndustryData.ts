/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Industry {
  id: string,
  name: string,
}

export interface Data {
  getList: ReturnType<typeof getIndustries>,
  create: ReturnType<typeof createIndustry>,
}

export interface GetInput {
  name?: string,
}

export interface GetListInput extends Omit<Industry, 'id'> {}

export const getIndustries = (industries: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = industries().select()
  if (input) query.where(input)

  return (await query as Industry[])
}

export interface CreateInput extends Omit<Industry, 'id'> {}

export const createIndustry = (industries: () => QueryBuilder) => async (input?: CreateInput) => {

  const result = (await industries().insert(input, ['id','name']) as [{id: string}])[0]
  return result;
}

export async function create (data: DataClient): Promise<Data> {
  const industries = () => data.postgres.withSchema(Database.schema).table('Industry')

  return {
    getList:  getIndustries(industries),
    create:   createIndustry(industries),
  }
}

export default {create}
