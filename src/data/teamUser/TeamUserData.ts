/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface TeamUser {
    id: string
    team: string
    user: string
    license: string
    email: string
    isStarted: boolean
    isInvited: boolean
    teamName: string
    company_name: string
}

export interface Data {
  getAll:           ReturnType<typeof getTeams>
  getTeamMembers:   ReturnType<typeof getTeamMembers>
  getById:          ReturnType<typeof getTeamUserById>
  getCount:         ReturnType<typeof getCounts>
  create:           ReturnType<typeof createTeamUser>
  update:           ReturnType<typeof updateTeamUser>
  delete:           ReturnType<typeof deleteTeamUser>
}

export interface GetInput {
  id?: string
  team?: string
  user?: string
  license?: string
}

export interface GetListInput extends Omit<TeamUser, 'id'> {}

export interface CreateInput extends Omit<TeamUser, 'id'> {}

export const getTeams = (query: () => QueryBuilder) => async (input?: GetInput) => {
  const qb =  query().select('TeamUser.*','User.email',"UserLicense.isStarted", "UserLicense.isInvited",
      "Team.name as teamName", "Company.name as companyName", "Team.license", "UserLicense.completed",
      "UserProgress.actual_ee_score", "UserProgress.actual_et_score", "UserProgress.actual_budget_score")
      .from('TeamUser')
      .leftJoin('User', 'TeamUser.user', 'User.id')
      .leftJoin('Team', 'TeamUser.team', 'Team.id')
      .leftJoin('UserLicense', 'Team.license','UserLicense.license')
      .leftJoin('UserProgress', 'User.id','UserProgress.user')
      // .leftJoin('PhaseStep', 'UserProgress.phaseStep','PhaseStep.id')
      // .leftJoin('Step', 'PhaseStep.step','Step.id')
      .leftJoin('Company', 'Team.company','Company.id')

      if (input && input.user) {
        qb.where({"User.id": input.user})
      }

    if (input && input.license) {
        qb.where({"UserLicense.license": input.license})
    }

    if (input && !input.user && !input.license) {
        qb.where(input)
    }

  return qb.orderBy("created_at", "desc").distinct("UserLicense.user")
}

export const getTeamMembers = (query: () => QueryBuilder) => async (team_id: String, input?: GetInput) => {
  const qb =  query().select('TeamUser.*','User.email',"UserLicense.isStarted", "Team.contact_email","Company.name as company_name",
      "UserLicense.isInvited", "UserLicense.license as userLicense", "UserLicense.completed", "Step.order",
      "UserProgress.actual_ee_score", "UserProgress.actual_et_score", "UserProgress.actual_budget_score", "SubscriptionPlan.game")
      .from('TeamUser')
      .leftJoin('Team', 'TeamUser.team', 'Team.id')
      .leftJoin('Company', 'Team.company', 'Company.id')
      .leftJoin('User', 'TeamUser.user', 'User.id')
      .leftJoin('UserLicense', 'TeamUser.user','UserLicense.user')
      .leftJoin('UserProgress', 'User.id','UserProgress.user')
      .leftJoin('PhaseStep', 'UserProgress.phaseStep','PhaseStep.id')
      .leftJoin('Step', 'PhaseStep.step','Step.id')
      .leftJoin('Subscription', 'UserLicense.license','Subscription.license')
      .leftJoin('SubscriptionPlan', 'Subscription.subscription_plan','SubscriptionPlan.id')

      if(team_id) {
        qb.where({"TeamUser.team": team_id})
      }

      if (input) {
        qb.where(input)
      }

      return qb.orderBy("created_at", "desc")
}

export const createTeamUser = (query: () => QueryBuilder) => async (input?: GetInput) => {
  return (await query().insert(input, ['id', 'user', 'team']) as [{ id: string }])[0];
}

export const updateTeamUser = (query: () => QueryBuilder) => async (input: GetInput) => {
  return (await query().select().where({id: input.id}))
}

export const deleteTeamUser = (query: () => QueryBuilder) => async (input: GetInput) => {
   return (await query().del().where(input))
}

export const getTeamUserById = (query: () => QueryBuilder) => async (id: String) => {
    return query().select('TeamUser.*', 'User.email', "UserLicense.isStarted", "UserLicense.isInvited").from('TeamUser')
        .leftJoin('User', 'TeamUser.user', 'User.id')
        .leftJoin('UserLicense', 'TeamUser.user', 'UserLicense.user').where({id: id})
        .first();
}

export const getCounts = (query: () => QueryBuilder) => async (input?: GetInput) => {
  const qb =  query().select('TeamUser.*','User.email',"UserLicense.isStarted", "UserLicense.isInvited").from('TeamUser')
      .leftJoin('User', 'TeamUser.user', 'User.id')
      .leftJoin('UserLicense', 'TeamUser.user','UserLicense.user')

      if (input){
        qb.where(input)
      }

      return qb.count()
}

export async function create (data: DataClient): Promise<Data> {
  const teamUsers = () => data.postgres.withSchema(Database.schema).table('TeamUser')

  return {
    getAll        :  getTeams(teamUsers),
    getTeamMembers:  getTeamMembers(teamUsers),
    getById:         getTeamUserById(teamUsers),
    getCount:        getCounts(teamUsers),
    create:          createTeamUser(teamUsers),
    update:          updateTeamUser(teamUsers),
    delete:          deleteTeamUser(teamUsers),
  }
}

export default {create}
