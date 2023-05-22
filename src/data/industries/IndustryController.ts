import UserData, {Data, GetListInput, CreateInput} from './IndustryData'
import {DataClient} from '../index'

export interface Controller {
  list: ReturnType<typeof getIndustries>,
  create: ReturnType<typeof createIndustry>,
}


export const getIndustries = (industries: Data) => async (input?: GetListInput) => {
  return industries.getList(input)
}

export const createIndustry = (industries: Data) => async (input?: CreateInput) => {
  return industries.create(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const industries = await UserData.create(data)

  return {
    list:   getIndustries(industries),
    create: createIndustry(industries),
  }
}

export default {create}
