import SubscriptionPlanData, {Data, CreateInput} from './SubscriptionPlanData'
import {DataClient} from '../index'

export interface Controller {
  getAll:   ReturnType<typeof getAll>
  getById:  ReturnType<typeof getSubscriptionPlan>
  create:   ReturnType<typeof createSubscriptionPlan>
  // update:   ReturnType<typeof updateProduct>
}

export const getAll = (plan: Data) => async () => {
  return plan.getAll()
}

export const getSubscriptionPlan = (plan: Data) => async (id: String) => {
  return plan.getById(id)
}

export const createSubscriptionPlan = (plan: Data) => async (input?: CreateInput) => {
  return plan.create(input)
}

// export const updateProduct = (product: Data) => async (input?: CreateInput) => {
//   return product.update(input)
// }

export async function create (data: DataClient): Promise<Controller> {
  const plans = await SubscriptionPlanData.create(data)

  return {
    getAll: getAll(plans),
    getById: getSubscriptionPlan(plans),
    create: createSubscriptionPlan(plans),
    // update: updateProduct(products)
  }
}

export default {create}
