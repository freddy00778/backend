/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface Company {
    id?: string
    name?: string
    industry?: string
    function_unit: string
    sizeGroup: string
}

export interface Data {
    create: ReturnType<typeof createCompany>
    get: ReturnType<typeof getCompany>
    update: ReturnType<typeof updateCompany>
}

export interface GetInput {
    id?: string
    name?: string
    industry?: string
    function_unit?: string
    sizeGroup?: string
}

export interface GetListInput extends Omit<Company, 'id'> {}

export interface CreateInput extends Omit<Company, 'id'> {}

export const createCompany = (company: () => QueryBuilder) => async (input?: GetInput) => {
    return (await company().insert(input, ['id', 'name']) as [{ id: string }])[0];
}

// export const createCompany = (company: () => QueryBuilder) => async (input?: CreateInput) => {
//     return (await company().insert(input, ['id', 'name']) as [{ id: string }])[0];
// }

export const getCompany = (company: () => QueryBuilder) => async (input: CreateInput) => {
    return (await company().select().where(input).first());
}

export const updateCompany = (company: () => QueryBuilder) => async (input: GetInput) => {
    return (await company().select().where({id: input.id}).update(input))
}

export async function create (data: DataClient): Promise<Data> {
    const company = () => data.postgres.withSchema(Database.schema).table('Company')

    return {
        create:          createCompany(company),
        get:             getCompany(company),
        update:          updateCompany(company)
    }
}

export default {create}