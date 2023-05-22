/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Subscription
  await knex.schema.withSchema(Database.schema).createTable('SubGame', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('question', {column: 'id', table: `${Database.schema}.Question`}, true)
        .comment(`Primary Question''s id.`)

       table.json("options").nullable()

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
