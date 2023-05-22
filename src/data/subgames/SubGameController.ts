import SubGameData, {Data, GetListInput, CreateInput, GetInput} from './SubGameData'
import {DataClient} from '../index'

export interface Controller {
  list:   ReturnType<typeof getSubGames>,
  get:    ReturnType<typeof getSubGame>,
  update: ReturnType<typeof updateSubGame>,
  create: ReturnType<typeof createSubGame>,
}

export const getSubGames = (subgames: Data) => async (input?: GetListInput) => {
  return subgames.getList(input)
}

export const getSubGame = (subgames: Data) => async (input?: GetInput) => {
  return subgames.get(input)
}

export const updateSubGame = (subgames: Data) => async (input: GetInput) => {
  return subgames.update(input)
}

export const createSubGame = (subgames: Data) => async (input?: CreateInput) => {
  return subgames.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const subgames = await SubGameData.create(data)

  return {
    list:     getSubGames(subgames),
    get:      getSubGame(subgames),
    update:   updateSubGame(subgames),
    create:   createSubGame(subgames),
  }
}

export default {create}
