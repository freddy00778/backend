import {Request} from 'express'

import {DataClient} from '../index'
import SubGameController , {Controller} from './SubGameController'
import {GetInput} from "./SubGameData";

export const getSubGames = (subgames: Controller) => async () => {
  return subgames.list()
}

export const createSubGame = (subgames: Controller) => async (req: Request) => {
  return await subgames.create(req)
}

export const getSubGame = (subgames: Controller) => async (req: GetInput) => {
  return await subgames.get(req)
}

export const updateSubGame = (subgames: Controller) => async (req: GetInput) => {
  return await subgames.update(req)
}

export async function create (data: DataClient) {
  const subgames = await SubGameController.create(data)

  return {
    getList:   getSubGames(subgames),
    get:       getSubGame(subgames),
    create:    createSubGame(subgames),
    update:    updateSubGame(subgames),
  }
}

export default {create}
