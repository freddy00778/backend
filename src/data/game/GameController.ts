import GameData , {Data, CreateInput} from './GameData'
import {DataClient} from '../index'

export interface Controller {
  list:  ReturnType<typeof getGameList>
  getById:  ReturnType<typeof getGame>
  create:   ReturnType<typeof createGame>
  // update:   ReturnType<typeof updateProduct>
}

export const getGameList = (game: Data) => async () => {
  return game.list()
}

export const getGame = (game: Data) => async (id: String) => {
  return game.getById(id)
}

export const createGame = (game: Data) => async (input?: CreateInput) => {
  return game.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const games = await GameData.create(data)

  return {
    list:    getGameList(games),
    getById: getGame(games),
    create:  createGame(games),
  }
}

export default {create}
