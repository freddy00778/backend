/* tslint:disable await-promise */
import {QueryBuilder} from 'knex'
import {Omit} from 'ramda'

import {DataClient} from '../index'
import {Database} from '../../config'

export interface License {
    id: string
    name: string
    price: number
    expiry: string,
    user: string
}

export interface Data {
    getAll: ReturnType<typeof getAll>
    getById: ReturnType<typeof getLicenseById>
    create:  ReturnType<typeof createLicense>
    update:  ReturnType<typeof updateLicense>
}

export interface GetInput {
    id?: string
    name?: string
    price?: number
    expiry?: string
    user?: string
}

export interface GetListInput extends Omit<License, 'id'> {}

export interface CreateInput extends Omit<License, 'id'> {}

export const getAll = (licenses: () => QueryBuilder) => async () => {
    const query =  licenses().select('License.*' ).from("License")
    return query.orderBy('created_at', 'desc')
}

export const createLicense = (licenses: () => QueryBuilder) => async (input?: GetInput) => {
    return (await licenses().insert(input, ['id', 'user']) as [{ id: string }])[0];
}

export const updateLicense = (licenses: () => QueryBuilder) => async (input: GetInput) => {
    return (await licenses().select().where({id: input.id}).update({isActive: true}))
}

export const getLicenseById = (licenses: () => QueryBuilder) => async (id: String) => {
    return (await licenses().select().where({id: id}) as License[])[0]
    //  return licenses().select("License.*", "User.email").from("License")
    //      .leftJoin("User", "License.user", "User.id")
    //      .where({id: id}).first()
}

export async function create (data: DataClient): Promise<Data> {
    const licenses = () => data.postgres.withSchema(Database.schema).table('License')

    return {
        getAll:   getAll(licenses),
        getById:  getLicenseById(licenses),
        create:   createLicense(licenses),
        update:   updateLicense(licenses)
    }
}

export default {create}