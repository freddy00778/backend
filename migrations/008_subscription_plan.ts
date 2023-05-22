/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Invoice
  await knex.schema.withSchema(Database.schema).createTable('SubscriptionPlan', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string("name")
        .nullable()
        .comment("Name of plan")

    table.decimal('price_per_person')
        .defaultTo(0)
        .comment(`Price per person.`)

    table.decimal('price_per_person_europe')
        .defaultTo(0)
        .comment(`Europe''s price.`)

    table.integer("duration_in_days")
        .defaultTo(0)
        .comment("Duration of plan")

    table.boolean("show_on_website")
        .defaultTo(false)

    columns
        .foreignUuid('game', {column: 'id', table: `${Database.schema}.Game`}, true)
        .comment(`Game''s id.`)

  })

}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
