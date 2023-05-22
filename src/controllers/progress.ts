
import {catchErrors} from '../errors'
import DataProvider from "../data/DataProvider";
import SubscriptionPlanHandlers from "../data/subscriptionPlan/SubscriptionPlanHandlers";
import UserProgressHandlers from "../data/userProgress/UserProgressHandlers";
import PhaseStepHandlers from "../data/phaseSteps/PhaseStepHandlers";
import omit from "omit"

export const getAll =
    catchErrors(async (req, res) => {
        console.log("req", req)
        const {user} = req.params
        const data = await DataProvider.create()
        console.log("user", user)
        const userProgresses = await (await UserProgressHandlers.create(data)).getList()

        return res.respond({
            userProgresses
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

export const createProgress =
    catchErrors(async (req, res) => {
        const {user, phaseStep, order, game,
            // ee_score, et_score, budget_score,
            actual_ee_score,
            actual_et_score,
            actual_budget_score,
            answered_question_only
        } = req.body

        if (!user || !phaseStep) {
            return res.status(400).send()
        }

        const data = await DataProvider.create()
        const nextOrder = order === undefined ? 1 : Number(order)+1
        const nextPhaseStep = nextOrder === 4 || nextOrder === 8 || nextOrder === 12 || nextOrder === 16 ?
            await (await PhaseStepHandlers.create(data)).get({order: nextOrder}) :
            await (await PhaseStepHandlers.create(data)).get({order: nextOrder})

        const body = {
            ...req.body,
            user,
            game,
            answered_question_only,
            phaseStep: nextPhaseStep.id,
            actual_ee_score,
            actual_et_score,
            actual_budget_score
        }

        const bodyObject = (omit(['order',"column","ee_score", "et_score", "budget_score"], body))

        const progress = await ( await UserProgressHandlers.create(data)).create(bodyObject)

        return res.respond({
            progress
        })
    })

export const updateProgress =
    catchErrors(async (req, res) => {
        const {user,kc_tries, kc_answered} = req.body

        const data = await DataProvider.create()
        const getUserProgress = await (await UserProgressHandlers.create(data)).getSingleProgress({user: user})
        console.log("user id", getUserProgress)
        const progress = await ( await UserProgressHandlers.create(data)).update({
            id: getUserProgress?.id,
            answered_question_only: false,
            kc_tries,
            kc_answered: kc_answered
        })

        return res.respond({
            progress
        })
    })

export const getProgress =
    catchErrors(async (req, res) => {
        // const {user, phaseStep, game} = req.body
        const data = await DataProvider.create()
        const progressData = await ( await UserProgressHandlers.create(data)).getSingleProgress(req.body)
        const progress  = progressData ? progressData : {
                order: 0,
                column: 1
        }

        return res.respond({
            progress
        })
    })

export const getKCTries =
    catchErrors(async (req, res) => {
        const {user} = req.body
        const data = await DataProvider.create()
        const progressData = await ( await UserProgressHandlers.create(data)).getSingleProgress({user})

        return res.respond({
            progress: progressData?.kc_tries
        })
    })

export const getNextStep =
    catchErrors(async (req, res) => {
        const {order} = req.body
        const data = await DataProvider.create()
        const nextOrder = order === undefined ? 1 : Number(order)+1
        // console.log("Order", order)

        const nextPhaseStep = await (await PhaseStepHandlers.create(data)).get({order: nextOrder})
        console.log("next order", nextOrder)
        console.log("next phase step", nextPhaseStep)

        return res.respond({
            nextPhaseStep

        })
    })