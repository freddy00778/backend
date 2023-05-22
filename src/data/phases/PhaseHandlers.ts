import {Request} from 'express'

import {DataClient} from '../index'
import PhaseController , {Controller} from './PhaseController'

export const getList = (phases: Controller) => async () => {
  return phases.list()
}

export const createPhase = (phases: Controller) => async (req: Request) => {
  return await phases.create(req)
}

export async function create (data: DataClient) {
  const phases = await PhaseController.create(data)

  return {
    create:  createPhase(phases),
    getList: getList(phases),
  }
}

export default {create}
