import {Request} from 'express'

import {DataClient} from '../index'
import LicenseController, {Controller} from './LicenseController'
import {GetInput} from "./LicenseData";


export const getAll = (license: Controller) => async () => {
  return await license.getAll()
}

export const createProduct = (license: Controller) => async (req: GetInput) => {
  return await license.create(req)
}

export const updateLicense = (license: Controller) => async (req: Request) => {
  return await license.update(req)
}

export const getLicenseById = (license: Controller) => async (id: String) => {
  return await license.getById(id)
}

export async function create (data: DataClient) {
  const license = await LicenseController.create(data)

  return {
    getAll: getAll(license),
    create: createProduct(license),
    update: updateLicense(license),
    getById: getLicenseById(license)
  }
}

export default {create}