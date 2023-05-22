import {catchErrors} from '../errors'
import DataProvider from "../data/DataProvider";
import SubscriptionPlanHandlers from "../data/subscriptionPlan/SubscriptionPlanHandlers";

export const getAll =
    catchErrors(async (req, res) => {
        console.log("req", req)
        const data = await DataProvider.create()
        const plans = await (await SubscriptionPlanHandlers.create(data)).getAll()

        return res.respond({
            plans
        })
    })

export const getById =
    catchErrors(async (req, res) => {
        const { id } = req.params
        const data = await DataProvider.create()
        const plan = await ( await SubscriptionPlanHandlers.create(data)).getById(id)

        return res.respond({
            ...plan
        })
    })

export const createPlan =
    catchErrors(async (req, res) => {
        const {name, price_per_person,price_per_person_europe, duration_in_days, game, show_on_website} = req.body
        const data = await DataProvider.create()
        const plan_body = {
            ...req.body,
            name,
            price_per_person,
            price_per_person_europe,
            duration_in_days,
            game: game.value,
            show_on_website
        }
        const plan = await ( await SubscriptionPlanHandlers.create(data)).create(plan_body)

        return res.respond({
            ...plan
        })
    })