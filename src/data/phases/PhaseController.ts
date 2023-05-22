import PhaseData, {Data, GetListInput, CreateInput} from './PhaseData'
import {DataClient} from '../index'

export interface Controller {
  create: ReturnType<typeof createPhase>
  list: ReturnType<typeof getList>
}



export const getList= (phases: Data) => async (input?: GetListInput) => {
  return phases.list(input)
}

export const createPhase = (steps: Data) => async (input?: CreateInput) => {
  return steps.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const phases = await PhaseData.create(data)

  return {
    list:    getList(phases),
    create:  createPhase(phases),
  }
}

export default {create}
