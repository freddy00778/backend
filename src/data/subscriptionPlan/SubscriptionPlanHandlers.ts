import {Request} from 'express'

import {DataClient} from '../index'
import SubscriptionPlanController, {Controller} from './SubscriptionPlanController'


export const createSubscriptionPlan = (plan: Controller) => async (req: Request) => {
    return await plan.create(req)
}

export const getAll = (plan: Controller) => async () => {
  return await plan.getAll()
}

export const getSubscriptionPlanById = (plan: Controller) => async (id: String) => {
  return await plan.getById(id)
}

export async function create (data: DataClient) {
  const plans = await SubscriptionPlanController.create(data)

  return {
    getAll: getAll(plans),
    create: createSubscriptionPlan(plans),
    getById: getSubscriptionPlanById(plans)
  }
}

export default {create}
