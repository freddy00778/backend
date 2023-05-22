/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Team {
  id: string
  name: string
  company_function: string
  company: string
  company_size: string
  industry: string
  email_message: string
  email_subject: string
  no_of_members: number
  sign_off: string
  license: string
  reminder_interval: string
  time_zone: string
  contact_email: string
  completed: boolean
  expiry_date: string
  sizeGroup?: string
  coordinator_id?: string

}

export interface Data {
  getTeams: ReturnType<typeof getAllTeams>
  getList: ReturnType<typeof getTeams>
  getById: ReturnType<typeof getTeamById>
  getAllById: ReturnType<typeof getAllById>
  getCount: ReturnType<typeof getCounts>
  create: ReturnType<typeof createTeam>
  update: ReturnType<typeof updateTeam>
}

export interface GetInput {
  id?: string
  name?: string
  company?: string
  company_size?: string
  industry?: string
  email_message?: string
  email_subject?: string
  sign_off?: string
  license?: string
  time_zone?: string
  contact_email?: string
  completed?: boolean
  expiry_date?: string
  no_of_members?: number
  sizeGroup?: string
  coordinator_id?: string
}

export interface GetListInput extends Omit<Team, 'id'> {}

export interface CreateInput extends Omit<Team, 'id'> {}


export const getAllTeams = (teams: () => QueryBuilder) => async ( input?: GetInput) => {
  const query =  teams().select('Team.*','Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name" )
      .leftJoin("Company", "Team.company", "Company.id")
      .leftJoin("Industry", "Company.industry", "Industry.id")

  if (input) {
    query.where(input)
  }

  return query.orderBy('created_at', 'desc')

}

export const getCounts = (teams: () => QueryBuilder) => async (input?: GetInput) => {
  const qb = await teams().select()

  if (input){
    qb.where(input)
  }

  return qb.count()
}

export const getTeams = (teams: () => QueryBuilder) => async (license?: String, input?: GetInput) => {
  const query =  teams().select('Team.*','Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name" )
      .leftJoin("Company", "Team.company", "Company.id")
      .leftJoin("Industry", "Company.industry", "Industry.id")

      if (license){
          query.where({license: license})
      }

      if (input) {
        query.where(input)
      }

      return query.orderBy('created_at', 'desc')

}

export const getAllById = (teams: () => QueryBuilder) => async (id) => {
  const query = teams().select('Team.*','Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name" )
      .leftJoin("Company", "Team.company", "Company.id")
      .leftJoin("Industry", "Company.industry", "Industry.id")
      .where({id: id})
      .orderBy('created_at', 'desc')

  return (await query as Team[])
}


export const getTeamById = (teams: () => QueryBuilder) => async (input: GetInput) => {
  const query = teams().select('Team.*','Company.name as company_name', "Company.id as company_id", "Industry.name as industry_name" )
      .leftJoin("Company", "Team.company", "Company.id")
      .leftJoin("Industry", "Company.industry", "Industry.id")

      if (input.id){
        query.where({"Team.id": input.id})
      }

    if (input  && !input.id){
      query.where(input)
    }

      return query.first()

  // return (await teams().select().where({license: id }) as Team[])[0]
}


export const createTeam = (team: () => QueryBuilder) => async (input: GetInput) => {
  return (await team().insert(input, ['id']) as [{ id: string }])[0];
}

export const updateTeam = (team: () => QueryBuilder) => async (input: GetInput) => {
  return (await team().select().where({id: input.id}).update(input))
}

export async function create (data: DataClient): Promise<Data> {
  const team = () => data.postgres.withSchema(Database.schema).table('Team')

  return {
    getTeams:    getAllTeams(team),
    getList:     getTeams(team),
    getAllById:  getAllById(team),
    getById:     getTeamById(team),
    getCount:    getCounts(team),
    create:      createTeam(team),
    update:      updateTeam(team)
  }
}

export default {create}
