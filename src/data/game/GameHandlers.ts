import {Request} from 'express'

import {DataClient} from '../index'
import ProductController, {Controller} from './GameController'



export const listGames = (game: Controller) => async () => {
  return await game.list()
}

export const createGame = (game: Controller) => async (req: Request) => {
    return await game.create(req)
}

// export const updateProduct = (product: Controller) => async (req: Request) => {
//   return await product.update(req)
// }

export const getGameById = (game: Controller) => async (id: String) => {
  return await game.getById(id)
}

export async function create (data: DataClient) {
  const game = await ProductController.create(data)

  return {
    list:   listGames(game),
    create: createGame(game),
    // update: updateProduct(product),
    getById: getGameById(game)
  }
}

export default {create}
