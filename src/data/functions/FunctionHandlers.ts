import {Request} from 'express'

import {DataClient} from '../index'
import FunctionController , {Controller} from './FunctionController'

export const getFunctions = (functions: Controller) => async () => {
  return functions.list()
}

export const createFunction = (functions: Controller) => async (req: Request) => {
  return await functions.create(req)
}

export async function create (data: DataClient) {
  const functions = await FunctionController.create(data)

  return {
    getList:   getFunctions(functions),
    create:    createFunction(functions),
  }
}

export default {create}
