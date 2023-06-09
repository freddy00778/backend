/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface UserLicense {
  id: string
  license: string
  user: string
  team: string
  isInvited: boolean
  isStarted: boolean
  completed: boolean
  invitation_message: string
}

export interface Data {
  getUserLicenses: ReturnType<typeof getUserLicenses>
  getById:         ReturnType<typeof getUserLicenseById>
  getByLicenseId:  ReturnType<typeof getUserLicensesByLicenseId>
  get:             ReturnType<typeof getUserLicense>
  create:          ReturnType<typeof createUserLicense>
  update:          ReturnType<typeof updateUserLicense>
  updateStatus:    ReturnType<typeof updateUserStatus>
  completeGame:    ReturnType<typeof completeGame>
  delete:          ReturnType<typeof deleteUserLicense>
}

export interface GetInput {
  id?: string
  license?: string
  user?: string
  team?: string
  isInvited?: boolean
  isStarted?: boolean
  completed?: boolean
  invitation_message?: string
}

export interface GetListInput extends Omit<UserLicense, 'id'> {}

export interface CreateInput extends Omit<UserLicense, 'id'> {}



export const getUserLicenses = (userLicenses: () => QueryBuilder) => async () => {
  return userLicenses().select("UserLicense.*", "License.expiry", "License.user as licenseOwnerUserId", "User.email", "User.id as userId").from('UserLicense')
      .leftJoin("License", "UserLicense.license","License.id")
      .leftJoin("User", "UserLicense.user","User.id")
}

export const createUserLicense = (userLicenses: () => QueryBuilder) => async (input?: GetInput) => {
  return (await userLicenses().insert(input, ['id', 'license', 'user']) as [{ id: string }])[0];
}

export const completeGame = (userLicenses: () => QueryBuilder) => async (input: GetInput) => {
  return (await userLicenses().select().where({license: input.license, user: input.user }).update(input))
}

export const updateUserLicense = (userLicenses: () => QueryBuilder) => async (input: GetInput) => {
  return (await userLicenses().select().where({id: input.id}).update(input))
}

export const updateUserStatus = (userLicenses: () => QueryBuilder) => async (input: GetInput) => {
  return (await userLicenses().select().where({license: input.license})
      .where({user: input.user}).update({isStarted: true, isInvited: true}))
}

export const deleteUserLicense = (userLicenses: () => QueryBuilder) => async (id: String) => {
  return (await userLicenses().where({user: id}).del())
}

export const getUserLicenseById = (userLicenses: () => QueryBuilder) => async (id: String) => {
  return (await userLicenses().select().where({id: id}) as UserLicense[])[0]
}

export const getUserLicense = (userLicenses: () => QueryBuilder) => async (input: GetInput) => {
  return (await userLicenses().select().where(input).first())
}

export const getUserLicensesByLicenseId = (query: () => QueryBuilder) => async (input: GetInput) => {
  const defaultQuery = (query().select('UserLicense.*',
      "User.email","TeamUser.team as team_id", "License.expiry").from('UserLicense')
      .leftJoin('TeamUser', 'UserLicense.user', 'TeamUser.user')
      .leftJoin('User', 'UserLicense.user', 'User.id')
      .leftJoin('License', 'UserLicense.license', 'License.id')
      .where({"UserLicense.license": input.license}))

  if(input.team){
    return defaultQuery.where({"TeamUser.team": input.team})
  }

  return defaultQuery
}

export async function create (data: DataClient): Promise<Data> {
  const licenses = () => data.postgres.withSchema(Database.schema).table('UserLicense')

  return {
    getUserLicenses: getUserLicenses(licenses),
    getByLicenseId:  getUserLicensesByLicenseId(licenses),
    get:             getUserLicense(licenses),
    getById:         getUserLicenseById(licenses),
    create:          createUserLicense(licenses),
    update:          updateUserLicense(licenses),
    updateStatus:    updateUserStatus(licenses),
    completeGame:    completeGame(licenses),
    delete:          deleteUserLicense(licenses),
  }
}

export default {create}