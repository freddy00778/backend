import {Request} from 'express'

import {DataClient} from '../index'
import QuestionController , {Controller} from './QuestionController'
import {GetInput} from "./QuestionData";

export const getQuestions = (questions: Controller) => async () => {
  return questions.list()
}

export const createQuestion = (questions: Controller) => async (req: Request) => {
  return await questions.create(req)
}

export const getQuestion = (questions: Controller) => async (req: GetInput) => {
  return await questions.get(req)
}

export const updateQuestion = (questions: Controller) => async (req: GetInput) => {
  return await questions.update(req)
}

export async function create (data: DataClient) {
  const questions = await QuestionController.create(data)

  return {
    getList:   getQuestions(questions),
    get:       getQuestion(questions),
    create:    createQuestion(questions),
    update:    updateQuestion(questions),
  }
}

export default {create}
