/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'
import omit from "omit"

import {DataClient} from '../index'
import {Database} from '../../config'

export interface UserProgress {
  id: string,
  user: string
  phaseStep: string
  game?: string
  ee_score?: number
  et_score?: number
  budget_score?: number
  actual_ee_score?: number
  actual_et_score?: number
  actual_budget_score?: number
  answered_question_only?: boolean
  kc_tries: number
  kc_answered: boolean
}

export interface Data {
  getList: ReturnType<typeof getProgress>,
  update: ReturnType<typeof updateProgress>
  getSingleProgress: ReturnType<typeof getSingleProgress>,
  create:  ReturnType<typeof createUserProgress>,
}

export interface GetInput {
  id?: string
  user?: string
  phaseStep?: string
  game?: string
  ee_score?: number
  et_score?: number
  budget_score?: number
  actual_ee_score?: number
  actual_et_score?: number
  actual_budget_score?: number
  answered_question_only?: boolean
  kc_tries?: number
  kc_answered?: boolean

}

export interface GetListInput extends Omit<UserProgress, 'id'> {}

export const getSingleProgress = (queryBuilder: () => QueryBuilder) => async (input: GetInput) => {
      const query =  queryBuilder().select('UserProgress.*',"Step.order", "Step.id as stepId",
          "PhaseStep.column", "Video.link", "Question.question", "Phase.name as phase_name", "Video.name as description", "Question.options as questionOptions",
          "Question.id as questionId")
          .from('UserProgress')
          .leftJoin('PhaseStep', 'UserProgress.phaseStep', 'PhaseStep.id')
          .leftJoin('Phase', 'PhaseStep.phase', 'Phase.id')
          .leftJoin('Question', 'PhaseStep.question', 'Question.id')
          .leftJoin('Video', 'Question.video', 'Video.id')
          .leftJoin('Step', 'PhaseStep.step', 'Step.id')
          .orderBy("created_at", "desc")

          if (input && input.game)  {
            query.where({"UserProgress.game": input.game })
          }

          if (input && input.user)  {
            query.where({"UserProgress.user": input.user })
          }

          const withoutGameInput = omit(['game'], input)

          return query.where(withoutGameInput).first()
  }

export const getProgress = (queryBuilder: () => QueryBuilder) => async (input?: GetInput) => {
  const query = queryBuilder().select('UserProgress.*',"PhaseStep.name","PhaseStep.id as phaseStepId","Step.order","Step.id as stepId",
      "Game.id as game_id","Game.name as game_name", "Video.link", "Question.options as questionOptions", "Question.id as questionId")
      .from('UserProgress')
      .leftJoin('PhaseStep', 'UserProgress.phaseStep', 'PhaseStep.id')
      .leftJoin('Question', 'PhaseStep.question', 'Question.id')
      .leftJoin('Video', 'Question.video', 'Video.id')
      .leftJoin('Step', 'PhaseStep.step', 'Step.id')
      .leftJoin('Game', 'PhaseStep.game', 'Game.id')

  if (input && input.game)  {
    query.where({"PhaseStep.game": input.game })
  }

  return (await query.orderBy("created_at", "desc") as UserProgress[])
}

export interface CreateInput extends Omit<UserProgress, 'id'> {}

export const createUserProgress = (progress: () => QueryBuilder) => async (input: CreateInput) => {
  const query = (await progress().select().where(input)) as UserProgress[]
    if (query.length > 0 ){
      return query[0]
    }

  return (await progress().insert(input, ['id', 'user','phaseStep']) as [{ id: string }])[0];
}

export const updateProgress = (users: () => QueryBuilder) => async (input: GetInput) => {
  return (await users().select().where({id: input.id}).update({
    answered_question_only: input.answered_question_only, kc_tries: input.kc_tries, kc_answered: input.kc_answered}))
}

export async function create (data: DataClient): Promise<Data> {
  const progress = () => data.postgres.withSchema(Database.schema).table('UserProgress')

  return {
    getList:  getProgress(progress),
    update: updateProgress(progress),
    getSingleProgress: getSingleProgress(progress),
    create:   createUserProgress(progress),
  }
}

export default {create}
