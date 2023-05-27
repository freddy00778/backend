/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface User {
  id: string
  username: string
  firstName?: string
  lastName?: string
  email: string
  phoneNumber: string
  password: string
  isActive: boolean
  hasWatchedIntro?: boolean
  additionalDetails: any
  completed: boolean
  coordinator: boolean
  isAdmin: boolean
}

export interface Data {
  get: ReturnType<typeof getUserById>,
  getUser: ReturnType<typeof getUser>,
  getEmail: ReturnType<typeof getUserByEmail>,
  getEmails: ReturnType<typeof getEmailsByLicense>,
  getUserLicense: ReturnType<typeof getUserLicenseByEmail>,
  getUserWithLicense: ReturnType<typeof getUserLicense>,
  getUsername: ReturnType<typeof getUserByEmail>,
  getTeamUsersByUserId: ReturnType<typeof getTeamUsersByUserId>,
  getList: ReturnType<typeof getUserList>,
  update: ReturnType<typeof updateUser>,
  create: ReturnType<typeof createUser>,
}

export interface GetInput {
  id?: string
  username?: string
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  password?: string
  isActive?: boolean
  isVerified?: boolean
  hasWatchedIntro?: boolean
  additionalDetails?: any
  completed?: boolean
  verificationToken?: string
  coordinator?: boolean
  isAdmin?: boolean

}

export const getUser = (users: () => QueryBuilder) => async (input: GetInput) => {
  return  users().select().where(input).first()
}

export const getUserByEmail = (query: () => QueryBuilder) => async (input: GetInput) => {

  return query().select('User.*',"Subscription.subscription_plan", "SubscriptionPlan.game",
      "Subscription.expires_at", "Subscription.quantity", "Subscription.invoice","Invoice.license").from('User')
      .leftJoin('Invoice', 'User.id', 'Invoice.user')
      .leftJoin('Subscription', 'User.id','Subscription.user')
      .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan','SubscriptionPlan.id')
      .where({email: input.email}).first()
}

export const getUserLicenseByEmail = (query: () => QueryBuilder) => async (input: GetInput) => {

  return query().select('User.*',"Subscription.subscription_plan", "SubscriptionPlan.game",
      "Subscription.expires_at","Invoice.user as invoice_user", "Invoice.license").from('User')
      .leftJoin("UserLicense","User.id","UserLicense.user")
      .leftJoin('Invoice', 'UserLicense.license', 'Invoice.license')
      .leftJoin('Subscription', 'Invoice.id','Subscription.invoice')
      .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan','SubscriptionPlan.id')
      .where({email: input.email})
}

export const getUserLicense = (query: () => QueryBuilder) => async (input: GetInput) => {

  return query().select('User.*',"Subscription.subscription_plan", "SubscriptionPlan.game",
      "Subscription.expires_at","Invoice.user as invoice_user", "Invoice.license").from('User')
      .leftJoin("UserLicense","User.id","UserLicense.user")
      .leftJoin('Invoice', 'UserLicense.license', 'Invoice.license')
      .leftJoin('Subscription', 'Invoice.id','Subscription.invoice')
      .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan','SubscriptionPlan.id')
      .where(input).first()
}

export const getTeamUsersByUserId = (users: () => QueryBuilder) => async (user: String) => {
  return users().select("User.*","Invoice.id as invoice_id", "Invoice.license").from('User')
      .leftJoin('Invoice', 'User.id', 'Invoice.user')
      .leftJoin("UserLicense", "Invoice.license","UserLicense.license")
      .where({"User.id": user})
}

// export const getEmailsByLicense = (users: () => QueryBuilder) => async (license: String) => {
//   return users().select("User.*","Invoice.id as invoice_id", "Invoice.license",
//       "UserLicense.isStarted", "UserLicense.isInvited", "UserLicense.completed", "Team.id as team_id", "Team.name as team_name")
//       .from('User')
//       .leftJoin('Invoice', 'User.id', 'Invoice.user')
//       .leftJoin("UserLicense", "Invoice.license","UserLicense.license")
//       .leftJoin('TeamUser', 'User.id', 'TeamUser.user')
//       .leftJoin('Team', 'TeamUser.team', 'Team.id')
//       .where({"UserLicense.license": license})
//       .groupBy('User.id', 'Invoice.id', 'UserLicense.license', 'Team.id');
// }

// @ts-ignore
export const getEmailsByLicense = (users: () => QueryBuilder) => async (license: String) => {
  return users()
      .select(
          'User.id',
          'User.firstName',
          'User.lastName',
          'User.email',
          'Invoice.id as invoice_id',
          'Invoice.license',
          'UserLicense.isStarted',
          'UserLicense.isInvited',
          'UserLicense.completed',
          'Team.id as team_id',
          'Team.name as team_name'
      )
      .from('User')
      .leftJoin('Invoice', 'User.id', 'Invoice.user')
      // .rightJoin('UserLicense', 'Invoice.license', 'UserLicense.license')
      .rightJoin('UserLicense', 'User.id', 'UserLicense.user')
      .leftJoin('TeamUser', 'User.id', 'TeamUser.user')
      .leftJoin('Team', 'TeamUser.team', 'Team.id')
      .where({ 'UserLicense.license': license })
      // .groupBy(
      //     'User.id',
      //     'User.firstName',
      //     'User.lastName',
      //     'User.email',
      //     'Invoice.id',
      //     'Invoice.license',
      //     'UserLicense.isStarted',
      //     'UserLicense.isInvited',
      //     'UserLicense.completed',
      //     'Team.id',
      //     'Team.name'
      // )
};


export const getUserByUsername = (users: () => QueryBuilder) => async (input: GetInput) => {
  return (await users().select().where({username: input.username}) as User[])[0]
}

export const getUserById = (users: () => QueryBuilder) => async (input: GetInput) => {
  return (await users().select().where({id: input.id}) as User[])[0]
}

export interface GetListInput extends Omit<User, 'id'> {}

export const getUserList = (users: () => QueryBuilder) => async (input?: GetListInput) => {
  const query = users().select().whereNotNull("firstName")
  if (input) query.where(input)

  return (await query.orderBy("created_at", "DESC") as User[])
}

export interface CreateInput extends Omit<User, 'id'> {}

export const createUser = (users: () => QueryBuilder) => async (input?: CreateInput) => {
  return (await users().insert(input, ['id', 'firstName', 'lastName', 'email', 'username']) as [{ id: string }])[0];
}

export const updateUser = (users: () => QueryBuilder) => async (input: GetInput) => {
  return (await users().select().where({id: input.id}).update(input))
}

export async function create (data: DataClient): Promise<Data> {
  const users = () => data.postgres.withSchema(Database.schema).table('User')

  return {
    getUser:              getUser(users),
    getEmail:             getUserByEmail(users),
    getEmails:            getEmailsByLicense(users),
    getUserLicense:       getUserLicenseByEmail(users),
    getUserWithLicense: getUserLicense(users),
    getUsername:          getUserByUsername(users),
    getTeamUsersByUserId: getTeamUsersByUserId(users),
    get:                  getUserById(users),
    getList:              getUserList(users),
    create:               createUser(users),
    update:               updateUser(users),
  }
}

export default {create}