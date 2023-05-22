/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Question {
  id: string,
  question: string,
  options: any
  reason: string
  correct_video_url: string
  wrong_video_url: string
  only_media: boolean
  description: string
}

export interface Data {
  getList: ReturnType<typeof getQuestions>,
  get: ReturnType<typeof getQuestion>,
  update: ReturnType<typeof updateQuestion>,
  create: ReturnType<typeof createQuestion>,
}

export interface GetInput {
  id?: string
  question?: string
  options?: any
  reason?: string
  correct_video_url?: string
  wrong_video_url?: string
  only_media?: boolean
  description?: string

}

export interface GetListInput extends Omit<Question, 'id'> {}

export const getQuestions = (questions: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = questions().select("Question.*").from('Question')
      .leftJoin('PhaseStep', 'Question.id', 'PhaseStep.question')
      .leftJoin("Step", "PhaseStep.step","Step.id")
  if (input) query.where(input)

  return (await query.orderBy("Step.order", "asc") as Question[])
}


export const getQuestion = (questions: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = questions().select()
  if (input) query.where(input)

  return (await query.orderBy("created_at", "desc").first() as Question)
}

export interface CreateInput extends Omit<Question, 'id'> {}

export const createQuestion = (questions: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await questions().insert(input, ['id', 'question']) as [{ id: string }])[0];
}

export const updateQuestion = (questions: () => QueryBuilder) => async (input: GetInput) => {
  return (await questions().select().where({id: input.id}).update(input))
}


export async function create (data: DataClient): Promise<Data> {
  const questions = () => data.postgres.withSchema(Database.schema).table('Question')

  return {
    getList:  getQuestions(questions),
    get:      getQuestion(questions),
    update:   updateQuestion(questions),
    create:   createQuestion(questions),
  }
}

export default {create}
