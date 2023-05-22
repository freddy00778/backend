import SubscriptionPlanHandlers from "../data/subscriptionPlan/SubscriptionPlanHandlers";


export const getById = async(item, data) => {
    return (await SubscriptionPlanHandlers.create(data)).getById(item.id)
}
