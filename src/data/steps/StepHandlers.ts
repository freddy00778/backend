import {Request} from 'express'

import {DataClient} from '../index'
import StepController , {Controller} from './StepController'
import {GetInput} from "./StepData";

export const getStepList = (steps: Controller) => async () => {
  return steps.list()
}

export const getStepById = (steps: Controller) => async (user) => {
  return  steps.getStepById(user)
}

export const getStep = (steps: Controller) => async (input: GetInput) => {
  return  steps.get(input)
}

export const getStepsByGameID = (steps: Controller) => async (step) => {
  return  steps.getStepsByGameID(step)
}

export const getByGameIdAndColumn = (steps: Controller) => async (game:String, column: number ) => {
  return  steps.getByGameIdAndColumn(game, column)
}

export const createStep = (steps: Controller) => async (req: Request) => {
  return await steps.create(req)
}

export async function create (data: DataClient) {
  const steps = await StepController.create(data)

  return {
    create: createStep(steps),
    get: getStep(steps),
    getStepList: getStepList(steps),
    getStepById: getStepById(steps),
    getStepsByGameID: getStepsByGameID(steps),
    getByGameIdAndColumn: getByGameIdAndColumn(steps),
  }
}

export default {create}
