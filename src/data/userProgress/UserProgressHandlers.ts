import {Request} from 'express'

import {DataClient} from '../index'
import UserProgressController , {Controller} from './UserProgressController'
import {GetInput} from "./UserProgressData";

export const getProgress = (progress: Controller) => async (input?: GetInput) => {
  return progress.list(input)
}

export const getSingleProgress = (progress: Controller) => async (input: GetInput) => {
  return progress.getSingleProgress(input)
}

export const createProgress = (progress: Controller) => async (req: Request) => {
  return await progress.create(req)
}

export const updateProgress = (progress: Controller) => async (input: GetInput) => {
  return await progress.update(input)
}


export async function create (data: DataClient) {
  const progress = await UserProgressController.create(data)

  return {
    getList:   getProgress(progress),
    getSingleProgress:   getSingleProgress(progress),
    create:    createProgress(progress),
    update:    updateProgress(progress),
  }
}

export default {create}
