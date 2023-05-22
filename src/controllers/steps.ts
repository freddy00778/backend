import {catchErrors} from '../errors'
import DataProvider from "../data/DataProvider"
import StepHandlers from "../data/steps/StepHandlers"
// import omit from  "omit"
import PhaseStepHandlers from "../data/phaseSteps/PhaseStepHandlers";



export const getAll =
    catchErrors(async (req, res) => {

        console.log("req", req)
        const data = await DataProvider.create()
        const steps = await ( await StepHandlers.create(data)).getStepList()

        return res.respond({
            steps
        })
    })

export const getStep =
    catchErrors(async (req, res) => {
        const {id} = req.params
        console.log("req", req)
        const data = await DataProvider.create()
        const step = await ( await StepHandlers.create(data)).get({id})

        return res.respond({
            step
        })
    })

export const getPhaseStep =
    catchErrors(async (req, res) => {
        const {id} = req.params
        // console.log("req", req)
        const data = await DataProvider.create()
        const step = await ( await PhaseStepHandlers.create(data)).get({id})
        console.log("phase step ", step)

        return res.respond({
            step
        })
    })

export const create =
    catchErrors(async (req, res) => {

        const {name, description, game, question, step,column, phase} = req.body
        const data = await DataProvider.create()

        const stepOrder = Number(column) == 1 ? step :  Number(column) === 2 ? Number(step) + 4 : Number(column) === 3 ? Number(step) + 8 : Number(column) === 4
            ? Number(step) + 12 : Number(column) === 5 ? Number(step) + 16 :
                Number(column) === 6 ? Number(step) + 20 :
                Number(column) === 7 ? Number(step) + 24 :
                    Number(column) === 8 ? Number(step) + 28 :
                    Number(column) === 9 ? Number(step) + 32 :
                    Number(column) === 10 ? Number(step) + 36 :
                    Number(column) === 11 ? Number(step) + 40 :
                    Number(column) === 12 ? Number(step) + 44 :
                    Number(column) === 13 ? Number(step) + 48 :
                        null

        const stepObject = await (await StepHandlers.create(data)).get({order: stepOrder})
        // @ts-ignore
        const insertedStep = stepObject ? stepObject :  await ( await StepHandlers.create(data)).create({order: stepOrder, name: stepOrder})

        console.log("Main step", stepOrder)
        console.log("inserted step", insertedStep)

        const body = {
            ...req.body,
            game: game,
            name,
            description,
            column,
            question: question.value,
            step: insertedStep.id,
            phase: phase.value
        }


        // const stepBodyObject = omit(["step"], body)

            //@ts-ignore
         await ( await PhaseStepHandlers.create(data)).create(body)

        res.respond({
            step
        });
    });

export const getByGame =
    catchErrors(async (req, res) => {

        const { id } = req.params
        const data = await DataProvider.create()
        const steps = await ( await StepHandlers.create(data)).getStepsByGameID(id)

        return res.respond({
            steps
        })
    })

export const getByGameAndColumn =
    catchErrors(async (req, res) => {
        const {id, column} = req.query;
        const data = await DataProvider.create()
        // @ts-ignore
        const steps = await ( await StepHandlers.create(data)).getByGameIdAndColumn(id,column)

        return res.respond({
            steps
        })
    })