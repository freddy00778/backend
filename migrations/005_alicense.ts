/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // License
  await knex.schema.withSchema(Database.schema).createTable('License', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('user', {column: 'id', table: `${Database.schema}.User`}, true)
        .comment(`User''s id.`)

    // columns
    //     .foreignUuid('license', {column: 'id', table: `${Database.schema}.License`}, true)
    //     .comment(`License''s id.`)

    table.dateTime('expiry')
        .comment(`License expiry date.`)

    table.boolean("isActive")
        .defaultTo(false)
        .comment("Status of license")
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
