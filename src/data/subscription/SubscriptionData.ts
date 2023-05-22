/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'
import {futureDate} from "../../utils/dateUtil";
import moment from "moment";

export interface Subscription {
  id: string
  user: string
  team: number
  subscription_plan: string
  invoice: string
  quantity: number
  expires_at: string
  license: string
  administrator: string
}


export interface Data {
  getAll: ReturnType<typeof getAll>
  get: ReturnType<typeof getSingleSubscription>
  getById: ReturnType<typeof getSubscription>
  getSubscriptionByUser: ReturnType<typeof getSubscriptionByUser>
  create: ReturnType<typeof  createSubscription>
  update: ReturnType<typeof  updateSubscription>
}

export interface GetInput {
  id?: string
  user?: string
  team?: string
  subscription_plan?: string
  invoice?: string
  quantity?:number
  expires_at?: string
  license?: string
  administrator?: string

}

export interface DateRange {
  startDate: string
  endDate: string
}

export interface GetListInput extends Omit<Subscription, 'id'> {}

export interface CreateInput extends Omit<Subscription, 'id'> {}

export const createSubscription = (subscriptions: () => QueryBuilder) => async (input: CreateInput) => {

  // @ts-ignore
  const queryBuilder = await subscriptions().select().where({subscription_plan: input.subscription_plan, user: input.user}).first()

  if (queryBuilder){
    // @ts-ignore
    const quantity = queryBuilder.quantity
    // @ts-ignore
    const newQuantity = quantity + input.quantity
    // @ts-ignore
        await subscriptions().select().where({subscription_plan: input.subscription_plan, user: input.user, license: input.license})
            .update({quantity: newQuantity, expires_at: futureDate(30)})
    return
  }

  return (await subscriptions().insert(input, ['id','user','subscription_plan', 'invoice']) as [{ id: string }])[0];
}

export const updateSubscription = (subscriptions: () => QueryBuilder) => async (input: GetInput) => {
  return (await subscriptions().select().where({id: input.id}).update(input))
}

export const getSubscription = (subscriptions: () => QueryBuilder) => async (id: String) => {
  return (await subscriptions().select().where({id: id}) as Subscription[])[0]
}

export const getSingleSubscription = (subscriptions: () => QueryBuilder) => async (input: GetInput) => {
  const qb = subscriptions().select("Subscription.*","Invoice.id", "Invoice.license","SubscriptionPlan.name")
      .from('Subscription')
      .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
      .leftJoin('Invoice', 'Subscription.invoice', 'Invoice.id')

      if (input && input.license){
        qb.where({"Subscription.license": input.license})
      }

      if (input && input.user){
        qb.where({"Subscription.user": input.user})
      }

      if (input && !input.license && !input.user){
        qb.where(input)
      }
      return qb.first()
}

export const getSubscriptionByUser = (subscriptions: () => QueryBuilder) => async (user: String) => {
  return subscriptions().select("Subscription.*","Invoice.id", "Invoice.license","SubscriptionPlan.name")
      .from('Subscription')
      .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
      .leftJoin('Invoice', 'Subscription.invoice', 'Invoice.id')
      .where({"Subscription.user": user})
}

export const getAll = (subscriptions: () => QueryBuilder) => async (order?: string, dateRange?: DateRange, input?: GetInput) => {
  const qb = subscriptions().select("Subscription.*", "Subscription.id as sub_id","Invoice.id", "Invoice.license","SubscriptionPlan.name", "User.email")
      .from('Subscription')
      .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan', 'SubscriptionPlan.id')
      .leftJoin('Invoice', 'Subscription.invoice', 'Invoice.id')
      .leftJoin('User', 'Subscription.user', 'User.id')

      if(input){
            qb.where(input)
      }

      if (dateRange && dateRange.startDate != 'undefined'  && dateRange.endDate != 'undefined'){
        const startDate = moment(dateRange?.startDate).format('YYYY-MM-DDTHH:mm:ssZ')
        const  endDate =  moment(dateRange?.endDate).format('YYYY-MM-DDTHH:mm:ssZ')

         qb.where('Subscription.created_at', '>=', startDate.toString())
              .where('Subscription.created_at', '<', endDate.toString())

        }

      if (order){
        if (order === "asc" || order === "desc"){
          return qb.orderBy("created_at", order)
        }

        if (order === "expired"){
          const currentDate = Date.now();
          const todaysDate = moment(currentDate).format('YYYY-MM-DDTHH:mm:ssZ');
          return qb.where('expires_at','<', todaysDate );
        }

        if (order === "not-expired"){
          const currentDate = Date.now();
          const todaysDate = moment(currentDate).format('YYYY-MM-DDTHH:mm:ssZ');
          return qb.where('expires_at','>', todaysDate );
        }
      }

      return qb.orderBy("created_at", "DESC")
}

export async function create (data: DataClient): Promise<Data> {
  const subscriptions = () => data.postgres.withSchema(Database.schema).table('Subscription')

  return {
    getAll:   getAll(subscriptions),
    getById:  getSubscription(subscriptions),
    get:      getSingleSubscription(subscriptions),
    getSubscriptionByUser: getSubscriptionByUser(subscriptions),
    create:   createSubscription(subscriptions),
    update:   updateSubscription(subscriptions)
  }
}

export default {create}
