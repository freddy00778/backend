import UserProgressData, {Data, GetListInput, CreateInput, GetInput} from './UserProgressData'
import {DataClient} from '../index'

export interface Controller {
  list:   ReturnType<typeof getProgress>,
  getSingleProgress:   ReturnType<typeof getSingleProgress>,
  update:   ReturnType<typeof updateProgress>,
  create: ReturnType<typeof createProgress>,
}

export const getSingleProgress = (progress: Data) => async (input: GetListInput) => {
  return progress.getSingleProgress(input)
}

export const getProgress = (progress: Data) => async (input?: GetListInput) => {
  return progress.getList(input)
}

export const createProgress = (questions: Data) => async (input: CreateInput) => {
  return questions.create(input)
}

export const updateProgress = (questions: Data) => async (input: GetInput) => {
  return questions.update(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const questions = await UserProgressData.create(data)

  return {
    list:   getProgress(questions),
    getSingleProgress:   getSingleProgress(questions),
    update:   updateProgress(questions),
    create: createProgress(questions),
  }
}

export default {create}
