import {Request} from 'express'

import {DataClient} from '../index'
import CompanyController , {Controller} from './CompanyController'
import {GetInput} from "./CompanyData";


export const createCompany = (company: Controller) => async (input: GetInput) => {
    return await company.create(input)
}

export const getCompany = (company: Controller) => async (input: GetInput) => {
    return await company.get(input)
}

export const updateCompany = (company: Controller) => async (req: Request) => {
    return await company.update(req)
}

export async function create (data: DataClient) {
    const company = await CompanyController.create(data)

    return {
        create: createCompany(company),
        get:    getCompany(company),
        update: updateCompany(company),
    }
}

export default {create}