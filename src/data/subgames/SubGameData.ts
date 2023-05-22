/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface SubGame {
  id: string,
  question: string,
  options: any
}

export interface Data {
  getList: ReturnType<typeof getSubGames>,
  get: ReturnType<typeof getSubGame>,
  update: ReturnType<typeof updateSubGame>,
  create: ReturnType<typeof createSubGame>,
}

export interface GetInput {
  id?: string
  question?: string
  options?: any
}

export interface GetListInput extends Omit<SubGame, 'id'> {}

export const getSubGames = (subgames: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = subgames().select("SubGame.*").from('SubGame')
      .leftJoin('Question', 'SubGame.question', 'Question.id')

  if (input) query.where(input)

  return (await query.orderBy("SubGame.created_at", "desc") as SubGame[])
}


export const getSubGame = (subgames: () => QueryBuilder) => async (input?: GetInput) => {
  const query = subgames().select("SubGame.*").from('SubGame')
      .leftJoin('Question', 'SubGame.question', 'Question.id')
  if (input?.question){
    query.where("SubGame.question", input.question)
  }
  if (input && !input?.question) query.where(input)

  return (await query.first() as SubGame)
}

export interface CreateInput extends Omit<SubGame, 'id'> {}

export const createSubGame = (subgames: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await subgames().insert(input, ['id', 'question', 'options']) as [{ id: string }])[0];
}

export const updateSubGame = (subgames: () => QueryBuilder) => async (input: GetInput) => {
  return (await subgames().select().where({question: input.question}).update(input))
}


export async function create (data: DataClient): Promise<Data> {
  const subgames = () => data.postgres.withSchema(Database.schema).table('SubGame')

  return {
    getList:  getSubGames(subgames),
    get:      getSubGame(subgames),
    update:   updateSubGame(subgames),
    create:   createSubGame(subgames),
  }
}

export default {create}
