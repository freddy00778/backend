import {catchErrors} from '../errors'
import DataProvider from "../data/DataProvider";
import SubscriptionData, {Subscription} from "../data/subscription/SubscriptionData";
import SubscriptionHandlers from "../data/subscription/SubscriptionHandlers";
import moment from "moment";
// import InvoiceHandlers from "../data/checkout/InvoiceHandlers";

export const getAll =
    catchErrors(async (req, res) => {
        const {user} = req.query
        const data = await DataProvider.create()
        const subscription = await (await SubscriptionHandlers.create(data)).get({
            administrator: user?.toString()
        })

         const subscriptions = user != null ? await (await SubscriptionHandlers.create(data)).getSubscriptionByUser(subscription?.user) :
             await (await SubscriptionData.create(data)).getAll()

        return res.respond({
            subscriptions
        })
    })


export const getSubscriptions =
    catchErrors(async (req, res) => {
        const {order,fromDate, toDate} = req.query
        const data = await DataProvider.create()
        const dateRange = fromDate && toDate ?  {startDate: fromDate ? fromDate.toString(): null, endDate: toDate ? toDate.toString(): null}: null

         // @ts-ignore
        const subscriptions = await (await SubscriptionHandlers.create(data)).getAll(order && order.toString(),dateRange)

        return res.respond({
            subscriptions
        })
    })

export const getSubscription =
    catchErrors(async (req, res) => {
        const {user, subscription_plan} = req.query
        const data = await DataProvider.create()

        // @ts-ignore
        const subscription = await (await SubscriptionHandlers.create(data)).get({user, subscription_plan})

        return res.respond({
            subscription
        })
    })

export const getSingleSubscription =
    catchErrors(async (req, res) => {
        const data = await DataProvider.create()

        // @ts-ignore
        const subscription = await (await SubscriptionHandlers.create(data)).get(req.body)

        return res.respond({
            subscription
        })
    })

export const extendSubscription =
    catchErrors(async (req, res) => {
        const {id, days} = req.body
        const data = await DataProvider.create()

        const subscription:Subscription = await (await SubscriptionHandlers.create(data)).getById(id)
        console.log(subscription)

        if (subscription){
            const  today = (moment(Date.now()).format('YYYY-MM-DDTHH:mm:ssZ'))
            const  diff = (moment(subscription.expires_at)).diff(today)
            console.log("diff", diff)
            const  current_expiry = (moment(subscription.expires_at)).add(Number(days),'days').format('YYYY-MM-DDTHH:mm:ssZ')
            console.log("expiry_date", current_expiry)
            await (await SubscriptionHandlers.create(data)).update({id, expires_at: current_expiry})
        }

        return res.respond({
            subscription
        })
    })
