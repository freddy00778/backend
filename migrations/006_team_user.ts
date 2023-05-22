/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // TeamUser
  await knex.schema.withSchema(Database.schema).createTable('TeamUser', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('team', {column: 'id', table: `${Database.schema}.Team`}, true)
        .comment(`Team''s id.`)

    columns
        .foreignUuid('company', {column: 'id', table: `${Database.schema}.Company`}, false)
        .comment(`Company''s id.`)

    columns
        .foreignUuid('user', {column: 'id', table: `${Database.schema}.User`}, true)
        .comment(`User''s id.`)
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
