import QuestionData, {Data, GetListInput, CreateInput, GetInput} from './QuestionData'
import {DataClient} from '../index'

export interface Controller {
  list:   ReturnType<typeof getQuestions>,
  get:    ReturnType<typeof getQuestion>,
  update: ReturnType<typeof updateQuestion>,
  create: ReturnType<typeof createQuestion>,
}

export const getQuestions = (questions: Data) => async (input?: GetListInput) => {
  return questions.getList(input)
}

export const getQuestion = (questions: Data) => async (input?: GetInput) => {
  return questions.get(input)
}

export const updateQuestion = (questions: Data) => async (input: GetInput) => {
  return questions.update(input)
}

export const createQuestion = (questions: Data) => async (input?: CreateInput) => {
  return questions.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const questions = await QuestionData.create(data)

  return {
    list:   getQuestions(questions),
    get:    getQuestion(questions),
    update:   updateQuestion(questions),
    create: createQuestion(questions),
  }
}

export default {create}
