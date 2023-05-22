/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Team
  await knex.schema.withSchema(Database.schema).createTable('Team', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('company', {column: 'id', table: `${Database.schema}.Company`}, true)
        .nullable()
        .comment(`Team''s company.`)

    columns
        .foreignUuid('license', {column: 'id', table: `${Database.schema}.License`}, true)
        .nullable()
        .comment(`Team''s License.`)

    table.string('name')
        .notNullable()
        .comment(`The Team''s name.`)

    table.string('contact_email')
        .comment(`The Team''s contact email.`)

    table.integer('size')
        .defaultTo(0)
        .comment(`The Team''s size.`)

    table.string('sizeGroup')
        .defaultTo(0)
        .comment(`The Team''s size.`)

    table.integer('no_of_members')
        .defaultTo(0)
        .comment(`The Team''s number of members.`)

    table.text('email_format')
        .comment(`The Team''s email format.`)

    table.string('email_subject')
        .comment(`The Team''s email subject.`)

    table.text('email_message')
        .comment(`The Team''s email message.`)

    table.string('system_additional_message')
        .comment(`The System''s additional message.`)

    table.string('sign_off')
        .comment(`The Team''s email sign off.`)

    table.boolean('scheduled')
        .comment(`The Team''s email scheduled.`)

    table.dateTime('scheduled_at')
        .comment(`The Team''s schedule.`)

    table.string('time_zone')
        .nullable()
        .comment(`The Schedule At Time Zone.`)

    table.string('reminder_interval')
        .comment(` Reminder interval.`)
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
