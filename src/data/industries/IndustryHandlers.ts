import {Request} from 'express'

import {DataClient} from '../index'
import IndustryController , {Controller} from './IndustryController'

export const getIndustries = (industries: Controller) => async () => {
  return industries.list()
}


export const createIndustry = (industries: Controller) => async (req: Request) => {
  return await industries.create(req)
}

export async function create (data: DataClient) {
  const industries = await IndustryController.create(data)

  return {
    getList:   getIndustries(industries),
    create:    createIndustry(industries),
  }
}

export default {create}
