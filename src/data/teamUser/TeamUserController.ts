import TeamUserData , {Data, CreateInput, GetInput} from './TeamUserData'
import {DataClient} from '../index'

export interface Controller {
    getAll:          ReturnType<typeof getTeams>
    getTeamMembers:  ReturnType<typeof getTeamMembers>
    getById:  ReturnType<typeof getTeamUser>
    getCount:  ReturnType<typeof getCounts>
    create:   ReturnType<typeof createTeamUser>
    update:   ReturnType<typeof updateTeamUser>
    delete:   ReturnType<typeof deleteTeamUser>
}

export const getTeams = (teamUser: Data) => async (input: GetInput) => {
    return teamUser.getAll(input)
}

export const getTeamUser = (teamUser: Data) => async (id: String) => {
    return teamUser.getById(id)
}

export const getTeamMembers = (teamUser: Data) => async (team: String) => {
    return teamUser.getTeamMembers(team)
}

export const getCounts = (teamUser: Data) => async (input?: GetInput) => {
    return teamUser.getCount(input)
}

export const createTeamUser = (teamUser: Data) => async (input?: CreateInput) => {
    return teamUser.create(input)
}

export const updateTeamUser = (teamUser: Data) => async (input: CreateInput) => {
    return teamUser.update(input)
}

export const deleteTeamUser = (teamUser: Data) => async (input: GetInput) => {
    return teamUser.delete(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const teamUsers = await TeamUserData.create(data)

    return {
        getAll        : getTeams(teamUsers),
        getTeamMembers: getTeamMembers(teamUsers),
        getById:        getTeamUser(teamUsers),
        getCount:        getCounts(teamUsers),
        create:         createTeamUser(teamUsers),
        update:         updateTeamUser(teamUsers),
        delete:         deleteTeamUser(teamUsers)
    }
}

export default {create}