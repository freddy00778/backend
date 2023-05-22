"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.handleForeignUuid = exports.handlePrimaryUuid = void 0;
const handlePrimaryUuid = (knex, table) => (column) => table
    .uuid(column || 'id')
    .primary()
    .notNullable()
    .unique()
    .defaultTo(knex.raw('uuid_generate_v4()'));
exports.handlePrimaryUuid = handlePrimaryUuid;
const handleForeignUuid = (table) => ((column, reference, required) => {
    const col = table.uuid(column);
    if (required)
        col.notNullable();
    table.foreign(column).references(reference.column).inTable(reference.table);
    return col;
});
exports.handleForeignUuid = handleForeignUuid;
const schema = (knex) => {
    return function columns(table) {
        return {
            primaryUuid: (0, exports.handlePrimaryUuid)(knex, table),
            foreignUuid: (0, exports.handleForeignUuid)(table),
        };
    };
};
exports.schema = schema;
exports.default = { handlePrimaryUuid: exports.handlePrimaryUuid, handleForeignUuid: exports.handleForeignUuid, schema: exports.schema };
//# sourceMappingURL=MigrationUtils.js.map