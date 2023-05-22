import {Request} from 'express'

import {DataClient} from '../index'
import UserLicenseController , {Controller} from './UserLicenseController'
import {GetInput} from "./UserLicenseData";


export const getUserLicenses = (userLicense: Controller) => async () => {
    return await userLicense.getUserLicenses()
}

export const createUserLicense = (userLicense: Controller) => async (input: GetInput) => {
    return await userLicense.create(input)
}

export const updateLicense = (userLicense: Controller) => async (input: GetInput) => {
    return await userLicense.update(input)
}

export const updateUserStatus = (userLicense: Controller) => async (req: Request) => {
    return await userLicense.updateStatus(req)
}

export const completeGame = (userLicense: Controller) => async (input: GetInput) => {
    return await userLicense.completeGame(input)
}

export const deleteUserLicense = (userLicense: Controller) => async (id: String) => {
    return await userLicense.delete(id)
}

export const getLicenseById = (userLicense: Controller) => async (id: String) => {
    return await userLicense.getById(id)
}

export const getUserLicense = (userLicense: Controller) => async (input: GetInput) => {
    return await userLicense.get(input)
}

export const getUserLicenseByLicenseId = (userLicense: Controller) => async (input: GetInput) => {
    return await userLicense.getByLicenseId(input)
}

export async function create (data: DataClient) {
    const userLicense = await UserLicenseController.create(data)

    return {
        getUserLicenses: getUserLicenses(userLicense),
        create: createUserLicense(userLicense),
        update: updateLicense(userLicense),
        updateStatus: updateUserStatus(userLicense),
        completeGame: completeGame(userLicense),
        getById: getLicenseById(userLicense),
        get: getUserLicense(userLicense),
        getByLicenseId: getUserLicenseByLicenseId(userLicense),
        delete: deleteUserLicense(userLicense)
    }
}

export default {create}