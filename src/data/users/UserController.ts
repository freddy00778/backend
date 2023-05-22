import UserData, {Data, GetInput, GetListInput, CreateInput} from './UserData'
import {DataClient} from '../index'

export interface Controller {
    getUser: ReturnType<typeof getUserObject>,
    get: ReturnType<typeof getUser>,
    getUserLicense: ReturnType<typeof getUserLicenseByEmail>,
    getUserWithLicense: ReturnType<typeof getUserLicense>,
    getEmail: ReturnType<typeof getUserByEmail>,
    getEmails: ReturnType<typeof getEmailsByLicense>,
    getUsername: ReturnType<typeof getUserByUsername>,
    getTeamUsersByUserId: ReturnType<typeof getTeamUsersByUserId>,
    getList: ReturnType<typeof getUserList>,
    update: ReturnType<typeof updateUser>,
    create: ReturnType<typeof createUser>,
}

export const getUserObject = (users: Data) => async (input: GetInput) => {
    return users.getUser(input)
}

export const getUser = (users: Data) => async (input: GetInput) => {
    return users.get(input)
}

export const getUserByEmail = (users: Data) => async (input: GetInput) => {
    return users.getEmail(input)
}

export const getUserLicenseByEmail = (users: Data) => async (input: GetInput) => {
    return users.getUserLicense(input)
}

export const getUserLicense = (users: Data) => async (input: GetInput) => {
    return users.getUserWithLicense(input)
}

export const getEmailsByLicense = (users: Data) => async (license: String) => {
    return users.getEmails(license)
}

export const getUserByUsername = (users: Data) => async (input: GetInput) => {
    return users.getUsername(input)
}

export const getTeamUsersByUserId = (users: Data) => async (user: String) => {
    return users.getTeamUsersByUserId(user)
}

export const getUserList = (users: Data) => async (input?: GetListInput) => {
    return users.getList(input)
}

export const createUser = (users: Data) => async (input?: CreateInput) => {
    return users.create(input)
}

export const updateUser = (users: Data) => async (input: GetInput) => {
    return users.update(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const users = await UserData.create(data)

    return {
        getUser:              getUserObject(users),
        get:                  getUser(users),
        getEmail:             getUserByEmail(users),
        getEmails:            getEmailsByLicense(users),
        getUserLicense:       getUserLicenseByEmail(users),
        getUserWithLicense:   getUserLicense(users),
        getUsername:          getUserByUsername(users),
        getTeamUsersByUserId: getTeamUsersByUserId(users),
        getList:              getUserList(users),
        update:               updateUser(users),
        create:               createUser(users),
    }
}

export default {create}