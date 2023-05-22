import {Request} from 'express'

import {DataClient} from '../index'
import TeamUserController , {Controller} from './TeamUserController'
import {GetInput} from "./TeamUserData";


export const getTeams = (controller: Controller) => async (input: GetInput) => {
    return  controller.getAll(input)
}

export const getTeamMembers = (controller: Controller) => async (team: String) => {
    return  controller.getTeamMembers(team)
}

export const createTeamUser = (controller: Controller) => async (input: GetInput) => {
    return await controller.create(input)
}

export const update = (controller: Controller) => async (req: Request) => {
    return await controller.update(req)
}

export const deleteTeamUser = (controller: Controller) => async (input: GetInput) => {
    return await controller.delete(input)
}

export const getById = (controller: Controller) => async (id: String) => {
    return await controller.getById(id)
}

export const getCounts = (controller: Controller) => async (input?: GetInput) => {
    return  controller.getCount(input)
}

export async function create (data: DataClient) {
    const teamUser = await TeamUserController.create(data)

    return {
        getAll        : getTeams(teamUser),
        getTeamMembers: getTeamMembers(teamUser),
        getCount:       getCounts(teamUser),
        create:         createTeamUser(teamUser),
        update:         update(teamUser),
        getById:        getById(teamUser),
        delete:         deleteTeamUser(teamUser)
    }
}

export default {create}