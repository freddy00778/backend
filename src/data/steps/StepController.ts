import StepData, {Data, GetInput, GetListInput, CreateInput} from './StepData'
import {DataClient} from '../index'

export interface Controller {
  create: ReturnType<typeof createStep>
  list: ReturnType<typeof getStepList>
  getStepById: ReturnType<typeof getStepById>
  get: ReturnType<typeof getStep>
  getStepsByGameID: ReturnType<typeof getStepsByGameID>
  getByGameIdAndColumn: ReturnType<typeof getByGameIdAndColumn>
}


export const getStepById = (steps: Data) => async (input: GetInput) => {
  return steps.getStepById(input)
}

export const getStep = (steps: Data) => async (input: GetInput) => {
  return steps.get(input)
}

export const getStepList= (steps: Data) => async (input?: GetListInput) => {
  return steps.list(input)
}

export const getStepsByGameID= (steps: Data) => async (game: String) => {
  return steps.getStepsByGameID(game)
}

export const getByGameIdAndColumn= (steps: Data) => async (game: String, column: number) => {
  return steps.getByGameIdAndColumn(game, column)
}

export const createStep = (steps: Data) => async (input: CreateInput) => {
  return steps.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const steps = await StepData.create(data)

  return {
    list:                 getStepList(steps),
    create:               createStep(steps),
    getStepById:          getStepById(steps),
    get:                  getStep(steps),
    getStepsByGameID:     getStepsByGameID(steps),
    getByGameIdAndColumn: getByGameIdAndColumn(steps)
  }
}

export default {create}
