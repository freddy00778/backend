import {Request} from 'express'

import {DataClient} from '../index'
import SubscriptionController, {Controller} from './SubscriptionController'
import {DateRange, GetInput} from "./SubscriptionData";


export const getAll = (subscription: Controller) => async (order: string,dateRange:DateRange, input?: GetInput) => {
  return  subscription.getAll(order,dateRange,input)
}

export const getSubscription = (subscription: Controller) => async (input: GetInput) => {
  return await subscription.get(input)
}

export const createSubscriptionPlan = (subscription: Controller) => async (req: Request) => {
    return await subscription.create(req)
}

export const updateSubscription = (subscription: Controller) => async (input: GetInput) => {
  return await subscription.update(input)
}

export const getSubscriptionPlanById = (subscription: Controller) => async (id: String) => {
  return await subscription.getById(id)
}


export const getSubscriptionByUser = (subscription: Controller) => async (user: String) => {
  return  subscription.getSubscriptionByUser(user)
}

export async function create (data: DataClient) {
  const subscription = await SubscriptionController.create(data)

  return {
    getAll:  getAll(subscription),
    get:     getSubscription(subscription),
    create:  createSubscriptionPlan(subscription),
    update:  updateSubscription(subscription),
    getById: getSubscriptionPlanById(subscription),
    getSubscriptionByUser: getSubscriptionByUser(subscription)
  }
}

export default {create}
