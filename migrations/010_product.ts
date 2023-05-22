/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  // Product
  await knex.schema.withSchema(Database.schema).createTable('Product', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string('name')
        .comment(`Product name.`)

    table.string('description')
        .comment(`Product description.`)

    table.decimal('price')
        .defaultTo(0.00)
        .comment(`Products''s price.`)

    table.string('productNumber')
        .comment(`Product''s number.`)

    table.boolean('isActive')
        .defaultTo(false)
        .comment(`Product''s active status.`)
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
