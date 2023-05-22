import FunctionData, {Data, GetListInput, CreateInput} from './FunctionData'
import {DataClient} from '../index'

export interface Controller {
  list: ReturnType<typeof getFunctions>,
  create: ReturnType<typeof createFunction>,
}

export const getFunctions = (industries: Data) => async (input?: GetListInput) => {
  return industries.getList(input)
}

export const createFunction = (functions: Data) => async (input?: CreateInput) => {
  return functions.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const functions = await FunctionData.create(data)

  return {
    list:   getFunctions(functions),
    create: createFunction(functions),
  }
}

export default {create}
