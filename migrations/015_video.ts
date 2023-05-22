/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Video
  await knex.schema.withSchema(Database.schema).createTable('Video', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string("name")
        .nullable()

    table.string("description")
        .nullable()

    table.string("link")
        .nullable()

    table.string("mime_type")
        .nullable()

    table.integer("size")
        .nullable()

    table.string("storage")
        .nullable()

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
