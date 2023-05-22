import TeamData, {Data, CreateInput, GetInput} from './TeamData'
import {DataClient} from '../index'

export interface Controller {
    getTeams:     ReturnType<typeof getTeams>
    getAll:     ReturnType<typeof getAll>
    getAllById: ReturnType<typeof getAllById>
    getById:    ReturnType<typeof getById>
    getCount:   ReturnType<typeof getCounts>
    create:     ReturnType<typeof createTeam>
    update:     ReturnType<typeof updateTeam>
}

export const getTeams = (team: Data) => async ( input?: GetInput) => {
    return team.getTeams(input)
}

export const getAll = (team: Data) => async (license: String, input?: GetInput) => {
    return team.getList(license, input)
}

export const getAllById = (team: Data) => async (input: CreateInput) => {
    return team.getAllById(input)
}

export const getCounts = (team: Data) => async (input?: CreateInput) => {
    return team.getCount(input)
}

export const getTeamMembers = (team: Data) => async (license: String) => {
    return team.getList(license)
}

export const getById = (team: Data) => async (input: GetInput) => {
    return team.getById(input)
}

export const createTeam = (team: Data) => async (input: GetInput) => {
    return team.create(input)
}

export const updateTeam = (team: Data) => async (input: GetInput) => {
    return team.update(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const team = await TeamData.create(data)

    return {
        getTeams:   getTeams(team),
        getAll:     getAll(team),
        getAllById: getAllById(team),
        getById:    getById(team),
        getCount:   getCounts(team),
        create:     createTeam(team),
        update:     updateTeam(team)
    }
}

export default {create}