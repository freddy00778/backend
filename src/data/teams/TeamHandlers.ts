
import {DataClient} from '../index'
import TeamController , {Controller} from './TeamController'
import {GetInput} from "./TeamData";

export const getTeams = (team: Controller) => async ( input?: GetInput ) => {
    return team.getTeams( input)
}

export const getAll = (team: Controller) => async (license: String, input?: GetInput ) => {
    return team.getAll(license, input)
}

export const getAllById = (team: Controller) => async (license: String) => {
    return  team.getAll(license)
}

export const getById = (team: Controller) => async (input: GetInput) => {
    return  team.getById(input)
}

export const getCounts = (team: Controller) => async (input?: GetInput) => {
    return  team.getCount(input)
}

export const createTeam = (team: Controller) => async (input: GetInput) => {
    return await team.create(input)
}

export const updateTeam = (team: Controller) => async (input: GetInput) => {
    return await team.update(input)
}


export async function create (data: DataClient) {
    const team = await TeamController.create(data)

    return {
        getTeams: getTeams(team),
        getAll: getAll(team),
        getAllById: getAllById(team),
        getById: getById(team),
        getCount: getCounts(team),
        create: createTeam(team),
        update: updateTeam(team),
    }
}

export default {create}