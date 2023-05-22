/* tslint:disable await-promise */
import Knex from 'knex'

import {Database} from '../config'

/**
 * Initialize a new Postgres provider
 */
export async function create () {

    const knex = Knex({
        client: 'pg',
        connection: {
            database: process.env.POSTGRES_DB,
            user:     process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host:     process.env.POSTGRES_HOST,
            port:     Number(process.env.POSTGRES_PORT),
        },

        // connection: {
        //   user: "root",
        //   password: "root",
        //   host: "db",
        //   port: 5432,
        //   database: "changeMgDB"
        // },
        pool: {
            min: Database.poolMin,
            max: Database.poolMax,
            idleTimeoutMillis: Database.poolIdle
        },
        acquireConnectionTimeout: 6000
    })

    // Verify the connection before proceeding
    try {
        await knex.raw('SELECT now()')

        return knex
    } catch (error) {
        console.log("connection", error)
        throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection.')
    }
}

export default {create}