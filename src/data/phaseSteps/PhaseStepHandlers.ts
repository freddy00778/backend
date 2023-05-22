import {Request} from 'express'

import {DataClient} from '../index'
import PhaseStepController , {Controller} from './PhaseStepController'
import {GetInput} from "./PhaseStepData";

export const getStepList = (steps: Controller) => async () => {
  return steps.list()
}

export const getById = (steps: Controller) => async (user) => {
  return  steps.getStepById(user)
}

export const getPhaseStep = (steps: Controller) => async (input: GetInput) => {
  return  steps.get(input)
}

export const createStep = (steps: Controller) => async (req: Request) => {
  return await steps.create(req)
}

export async function create (data: DataClient) {
  const steps = await PhaseStepController.create(data)

  return {
    create: createStep(steps),
    getStepList: getStepList(steps),
    get: getPhaseStep(steps),

  }
}

export default {create}
