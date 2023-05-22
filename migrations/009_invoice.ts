/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Invoice
  await knex.schema.withSchema(Database.schema).createTable('Invoice', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('license', {column: 'id', table: `${Database.schema}.License`}, true)
        .comment(`License''s id.`)

    columns
        .foreignUuid('user', {column: 'id', table: `${Database.schema}.User`}, true)
        .comment(`User''s id.`)

    table.string('transaction_number')
        .comment(`Transaction number.`)

    table.string('provider')
        .comment(`Payment provider.`)

    table.decimal('total')
        .defaultTo(0.00)
        .comment(`Invoice total.`)

    table.string('formatted_total')
        .defaultTo(0.00)
        .comment(`Formatted total.`)

    table.decimal('tax')
        .defaultTo(0.00)
        .comment(`Invoice tax.`)

    table.string('cardCountry')
        .comment(`Card country.`)

    table.string('billingState')
        .comment(`Billing state.`)

    table.string('billingZip')
        .comment(`Billing zip.`)

    table.string('billingCountry')
        .comment(`Billing country.`)

    table.boolean('paid')
        .defaultTo(false)
        .comment(`Paid status.`)


    table.text('payment_link')
        .comment(`Paid status.`)

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
