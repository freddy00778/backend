/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Game {
  id: string
  name: string
  description: string
  instruction: string
  no_of_phases?: number
  no_of_rows?: number
  no_of_columns?: number

}

export interface Data {
  list:    ReturnType<typeof getGameList>
  getById: ReturnType<typeof getGameById>,
  create: ReturnType<typeof  createGame>,
  update: ReturnType<typeof updateGame>,
}

export interface GetInput {
  id?: string
  name?: string
  description?: string
  instruction?: string
  no_of_phases?: number
  no_of_rows?: number
  no_of_columns?: number
}

export interface GetListInput extends Omit<Game, 'id'> {}

export interface CreateInput extends Omit<Game, 'id'> {}

export const getGameList = (games: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = games().select()
  if (input) query.where(input)

  return (await query as Game[])
}

export const createGame = (games: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await games().insert(input, ['id', 'name', 'description']) as [{ id: string }])[0];
}

export const updateGame = (games: () => QueryBuilder) => async (input: GetInput) => {
  return (await games().select().where({id: input.id}).update(input))
}

export const getGameById = (games: () => QueryBuilder) => async (id: String) => {
  return (await games().select().where({id: id}) as Game[])[0]
}

export async function create (data: DataClient): Promise<Data> {
  const games = () => data.postgres.withSchema(Database.schema).table('Game')

  return {
    list:    getGameList(games),
    getById: getGameById(games),
    create:  createGame(games),
    update:  updateGame(games)
  }
}

export default {create}
