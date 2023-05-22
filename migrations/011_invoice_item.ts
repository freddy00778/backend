/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Invoice
  await knex.schema.withSchema(Database.schema).createTable('InvoiceItem', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('invoice', {column: 'id', table: `${Database.schema}.Invoice`}, true)
        .comment(`Invoice''s id.`)

    columns
        .foreignUuid('subscription_plan', {column: 'id', table: `${Database.schema}.SubscriptionPlan`}, true)
        .comment(`Subscription plan `)

    table.string('description')
        .comment(`Item description.`)

    table.integer('quantity')
        .defaultTo(0)
        .comment(`Invoice item quantity.`)

    table.decimal('unit_price')
        .defaultTo(0.00)
        .comment(`Invoice item unit price.`)
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
