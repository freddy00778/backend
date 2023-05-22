/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Phase {
  id: string,
  name: string,
  order?: number,
}

export interface Data {
  create: ReturnType<typeof createPhase>
  list: ReturnType<typeof getList>
}

export interface GetInput {
  id?: string,
  name?: string,
  order?: number
}



export interface GetListInput extends Omit<Phase, 'id'> {}

export const getList = (phases: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = phases().select()
  if (input) query.where(input)

  return (await query as Phase[])
}

export interface CreateInput extends Omit<Phase, 'id'> {}

export const createPhase = (phases: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await phases().insert(input, ['id']) as [{ id: string }])[0];
}

export async function create (data: DataClient): Promise<Data> {
  const phases = () => data.postgres.withSchema(Database.schema).table('Phase')

  return {
    create:           createPhase(phases),
    list:             getList(phases),
  }
}

export default {create}
