import {Request} from 'express'

import {DataClient} from '../index'
import UserController, {Controller} from './UserController'
import {GetInput} from "./UserData";


export const getUser = (users: Controller) => async (input: GetInput) => {
    return users.getUser(input)
}

export const getUserList = (users: Controller) => async () => {
    return users.getList()
}

export const getSingleUser = (users: Controller) => async (req: Request) => {
    const id =  req.params.id
    return id && users.get({id})
}

export const getUserByEmail = (users: Controller) => async (email) => {
    return email && users.getEmail({email})
}

export const getUserLicenseByEmail = (users: Controller) => async (email) => {
    return email && users.getUserLicense({email})
}


export const getUserLicense = (users: Controller) => async (input: GetInput) => {
    return  users.getUserWithLicense(input)
}

export const getUserByUsername = (users: Controller) => async (username) => {
    return username && users.getUsername({username})
}

export const getTeamUsersByUserId = (users: Controller) => async (user) => {
    return  users.getTeamUsersByUserId(user)
}

export const getEmailsByLicense = (users: Controller) => async (license: string) => {
    return  users.getEmails(license)
}

export const createUser = (users: Controller) => async (input: GetInput) => {
    return await users.create(input)
}

export const updateUser = (users: Controller) => async (input: GetInput) => {
    return await users.update(input)
}

export async function create (data: DataClient) {
    const users = await UserController.create(data)

    return {
        getUserList:    getUserList(users),
        getSingleUser:  getSingleUser(users),
        get:            getSingleUser(users),
        getUser:        getUser(users),
        getEmail:       getUserByEmail(users),
        getEmails:      getEmailsByLicense(users),
        getUserLicense: getUserLicenseByEmail(users),
        getUserWithLicense: getUserLicense(users),
        getUsername:    getUserByUsername(users),
        getTeamUsersByUserId:    getTeamUsersByUserId(users),
        update:         updateUser(users),
        create:         createUser(users),
    }
}

export default {create}