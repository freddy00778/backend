import SubscriptionData, {Data, CreateInput, GetInput, DateRange} from './SubscriptionData'
import {DataClient} from '../index'

export interface Controller {
  getAll:  ReturnType<typeof getAll>
  get:  ReturnType<typeof getSingleSubscription>
  getById:  ReturnType<typeof getSubscription>
  getSubscriptionByUser:  ReturnType<typeof getSubscriptionByUser>
  create:   ReturnType<typeof createSubscription>
  update:   ReturnType<typeof updateSubscription>
}

export const getAll = (subscription: Data) => async (order: string,dateRange?:DateRange, input?: GetInput) => {
  return subscription.getAll(order,dateRange,input)
}

export const getSingleSubscription = (subscription: Data) => async (input: GetInput) => {
  return subscription.get(input)
}

export const getSubscription = (subscription: Data) => async (id: String) => {
  return subscription.getById(id)
}

export const createSubscription = (subscription: Data) => async (input: CreateInput) => {
  return subscription.create(input)
}

export const getSubscriptionByUser = (subscription: Data) => async (user: String) => {
  return subscription.getSubscriptionByUser(user)
}

export const updateSubscription = (subscription: Data) => async (input: GetInput) => {
  return subscription.update(input)
}


export async function create (data: DataClient): Promise<Controller> {
  const subscriptions = await SubscriptionData.create(data)

  return {
    getAll:  getAll(subscriptions),
    get:     getSingleSubscription(subscriptions),
    getById: getSubscription(subscriptions),
    create:  createSubscription(subscriptions),
    getSubscriptionByUser: getSubscriptionByUser(subscriptions),
    update: updateSubscription(subscriptions)
  }
}

export default {create}
