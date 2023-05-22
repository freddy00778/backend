/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  await knex.schema.withSchema(Database.schema).createTable('Company', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string('name')
        .notNullable()
        .comment(`The Company''s name.`)

      columns
        .foreignUuid('industry', {column: 'id', table: `${Database.schema}.Industry`}, true)
        .comment('industry of the company.')

    columns
        .foreignUuid('function_unit', {column: 'id', table: `${Database.schema}.Function`}, true)
        .comment('industry of the company.')

    table.integer('size')
        .comment(`The Company''s size.`)

    table.string('sizeGroup')
        .comment(`The Company''s size group.`)
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
