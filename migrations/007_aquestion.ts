/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
    const schema = MigrationUtils.schema(knex)

    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    // Step
    await knex.schema.withSchema(Database.schema).createTable('Question', table => {
        const columns = schema(table)
        columns.primaryUuid()

        table.uuid("video").nullable()

        table.timestamps(true, true)
        table.text("question")
            .nullable()
            .comment(`Question`)

        table.json("options").nullable()
            .comment("Question Options")

        table.string("correct_video_url")
            .nullable()
            .comment("Wrong answer video url")

        table.string("wrong_video_url")
            .nullable()
            .comment("Wrong Answer Video url")

        table.string("reason")
            .nullable()
            .comment("Reason")

        table.boolean("only_media")
            .nullable()
            .comment("Only media")
    })
}

export function down (_knex: Knex) {
    throw new Error('Downward migrations are not supported. Restore from backup.')
}
