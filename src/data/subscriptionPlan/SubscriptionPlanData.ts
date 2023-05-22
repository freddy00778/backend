/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface SubscriptionPlan {
  id: string
  name: string
  price_per_person: number
  price_per_person_europe: number
  duration_in_days: number
}

export interface Data {
  getAll: ReturnType<typeof getAll>
  getById: ReturnType<typeof getSubscriptionPlanById>
  create: ReturnType<typeof createSubscriptionPlan>
  update: ReturnType<typeof UpdateSubscriptionPlan>
}

export interface GetInput {
  id?: string
  name?: string
  price_per_person?: number
  price_per_person_europe?: number
  duration_in_days?: number
}

export interface GetListInput extends Omit<SubscriptionPlan, 'id'> {}


export interface CreateInput extends Omit<SubscriptionPlan, 'id'> {}

export const getAll = (plans: () => QueryBuilder) => async () => {
  const qb = plans().select("SubscriptionPlan.*","Game.id as game_id",
      "Game.name as game_name")
      .from('SubscriptionPlan')
      .leftJoin('Game', 'SubscriptionPlan.game', 'Game.id')
      return qb.orderBy("SubscriptionPlan.created_at","desc")
}

export const createSubscriptionPlan = (qb: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await qb().insert(input, ['id', 'name', 'price_per_person']) as [{ id: string }])[0];
}

export const UpdateSubscriptionPlan = (query: () => QueryBuilder) => async (input: GetInput) => {
  return (await query().select().where({id: input.id}).update(input))
}

export const getSubscriptionPlanById = (plans: () => QueryBuilder) => async (id: String) => {
  return (await plans().select().where({id: id}) as SubscriptionPlan[])[0]
}

export async function create (data: DataClient): Promise<Data> {
  const plans = () => data.postgres.withSchema(Database.schema).table('SubscriptionPlan')

  return {
    getAll:   getAll(plans),
    getById:  getSubscriptionPlanById(plans),
    create:   createSubscriptionPlan(plans),
    update:   UpdateSubscriptionPlan(plans)
  }
}

export default {create}
