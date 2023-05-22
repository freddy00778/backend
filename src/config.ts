// import * as parseDbUrl from 'parse-database-url'
import parseDbUrl from 'parse-database-url'
import 'dotenv/config';


export namespace Database {
    export const schema = 'api'
    export const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/changeMgDB'

    export const config = parseDbUrl(url)
    export const {database, user, name, username, password, hostname, host, port} = config
    export const poolMin = Number(process.env.DATABASE_POOL_MIN || '0')
    export const poolMax = Number(process.env.DATABASE_POOL_MAX || '50')
    export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000')
}

export namespace Server {
    export const port = Number(process.env.PORT || '8000')
    export const bodyLimit = '100kb'
    export const corsHeaders = ['Link']
    export const isDev = process.env.NODE_ENV === 'development'
}

export namespace Knex {
    export const config = {
        client: 'postgresql',
        connection: {
            host: process.env.POSTGRES_HOST || Database.host,
            database: process.env.POSTGRES_DB || Database.database,
            user: process.env.POSTGRES_USER || Database.user,
            password: process.env.POSTGRES_PASSWORD || Database.password,
            port: process.env.POSTGRES_PORT || Database.port,
        },
        pool: {
            min: process.env.DATABASE_POOL_MIN,
            max: process.env.DATABASE_POOL_MAX,
            idle: process.env.DATABASE_POOL_IDLE,
        },
        migrations: {
            tableName: 'KnexMigrations',
        },
        // development: {
        seeds: {
            directory: './seeds'
        }
        // }

    }
}

export namespace Redis {
    // export const url = process.env.REDIS_URL
    export const url = "redis://127.0.0.1:6379"
}

export default {Database, Server, Knex, Redis}