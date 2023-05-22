import PhaseStepData, {Data, GetInput, GetListInput, CreateInput} from './PhaseStepData'
import {DataClient} from '../index'

export interface Controller {
  create: ReturnType<typeof createStep>
  list: ReturnType<typeof getStepList>
  getStepById: ReturnType<typeof getStepById>
  get: ReturnType<typeof getPhaseStep>
}


export const getStepById = (steps: Data) => async (input: GetInput) => {
  return steps.getById(input)
}

export const getPhaseStep = (steps: Data) => async (input: GetInput) => {
  return steps.get(input)
}

export const getStepList= (steps: Data) => async (input?: GetListInput) => {
  return steps.list(input)
}

export const createStep = (steps: Data) => async (input?: CreateInput) => {
  return steps.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const steps = await PhaseStepData.create(data)

  return {
    list:                 getStepList(steps),
    create:               createStep(steps),
    getStepById:          getStepById(steps),
    get:                  getPhaseStep(steps),
  }
}

export default {create}
