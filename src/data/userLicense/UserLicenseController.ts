import UserLicenseData , {Data, GetInput,CreateInput} from './UserLicenseData'
import {DataClient} from '../index'

export interface Controller {
  getUserLicenses:      ReturnType<typeof getUserLicenses>
  get:      ReturnType<typeof getLicense>
  getById:  ReturnType<typeof getUserLicense>
  getByLicenseId:  ReturnType<typeof getUserLicensesByLicenseId>
  create:   ReturnType<typeof createUserLicense>
  update:   ReturnType<typeof updateUserLicense>
  updateStatus:   ReturnType<typeof updateUserStatus>
  completeGame:   ReturnType<typeof updateUserStatus>
  delete:   ReturnType<typeof deleteUserLicense>
}

export const getUserLicenses = (userLicense: Data) => async () => {
  return userLicense.getUserLicenses()
}


export const getUserLicense = (userLicense: Data) => async (id: String) => {
  return userLicense.getById(id)
}

export const getUserLicensesByLicenseId = (userLicense: Data) => async (input: GetInput) => {
  return userLicense.getByLicenseId(input)
}

export const getLicense = (userLicense: Data) => async (input: GetInput) => {
  return userLicense.get(input)
}

export const createUserLicense = (userLicense: Data) => async (input?: GetInput) => {
  return userLicense.create(input)
}

export const updateUserStatus = (userLicense: Data) => async (input: CreateInput) => {
  return userLicense.updateStatus(input)
}

export const completeGame = (userLicense: Data) => async (input: GetInput) => {
  return userLicense.completeGame(input)
}

export const updateUserLicense = (userLicense: Data) => async (input: CreateInput) => {
  return userLicense.update(input)
}

export const deleteUserLicense = (userLicense: Data) => async (id: String) => {
  return userLicense.delete(id)
}

export async function create (data: DataClient): Promise<Controller> {
  const userLicenses = await UserLicenseData.create(data)

  return {
    getUserLicenses: getUserLicenses(userLicenses),
    get: getLicense(userLicenses),
    getById: getUserLicense(userLicenses),
    getByLicenseId: getUserLicensesByLicenseId(userLicenses),
    create: createUserLicense(userLicenses),
    update: updateUserLicense(userLicenses),
    updateStatus: updateUserStatus(userLicenses),
    completeGame: completeGame(userLicenses),
    delete: deleteUserLicense(userLicenses)
  }
}

export default {create}