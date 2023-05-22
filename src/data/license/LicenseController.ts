import LicenseData, {Data, CreateInput, GetInput} from './LicenseData'
import {DataClient} from '../index'

export interface Controller {
  getAll:   ReturnType<typeof getAll>
  getById:  ReturnType<typeof getLicense>
  create:   ReturnType<typeof createLicense>
  update:   ReturnType<typeof updateLicense>
}

export const getAll = (license: Data) => async () => {
  return license.getAll()
}

export const getLicense = (license: Data) => async (id: String) => {
  return license.getById(id)
}

export const createLicense = (license: Data) => async (input?: GetInput) => {
  return license.create(input)
}

export const updateLicense = (license: Data) => async (input: CreateInput) => {
  return license.update(input)
}

export async function create (data: DataClient): Promise<Controller> {
  const licenses = await LicenseData.create(data)

  return {
    getAll: getAll(licenses),
    getById: getLicense(licenses),
    create: createLicense(licenses),
    update: updateLicense(licenses)
  }
}

export default {create}