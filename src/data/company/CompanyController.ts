import LicenseData, {Data, CreateInput, GetInput} from './CompanyData'
import {DataClient} from '../index'

export interface Controller {
    create:   ReturnType<typeof createCompany>
    get:      ReturnType<typeof getCompany>
    update:   ReturnType<typeof updateCompany>
}

export const createCompany = (company: Data) => async (input?: GetInput) => {
    return company.create(input)
}

export const getCompany = (company: Data) => async (input: GetInput) => {
    return company.get(input)
}

export const updateCompany = (license: Data) => async (input: CreateInput) => {
    return license.update(input)
}

export async function create (data: DataClient): Promise<Controller> {
    const company = await LicenseData.create(data)

    return {
        create: createCompany(company),
        get:    getCompany(company),
        update: updateCompany(company)
    }
}

export default {create}