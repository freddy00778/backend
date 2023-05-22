"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getById = exports.updateInvoiceItem = exports.createInvoiceItem = void 0;
const config_1 = require("../../config");
const createInvoiceItem = (invoiceItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield invoiceItems().insert(input, ['id', 'invoice', 'subscription_plan', 'description', 'quantity']))[0];
});
exports.createInvoiceItem = createInvoiceItem;
const updateInvoiceItem = (invoiceItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield invoiceItems().select().where({ id: input.id }).update(input));
});
exports.updateInvoiceItem = updateInvoiceItem;
const getById = (invoiceItems) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return invoiceItems().select("InvoiceItem.*").from('InvoiceItem')
        .leftJoin('Subscription', 'InvoiceItem.invoice', 'Subscription.invoice')
        .where(input)[0];
    // return (await invoiceItems().select().where({id: id}) as InvoiceItem[])[0]
});
exports.getById = getById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoiceItems = () => data.postgres.withSchema(config_1.Database.schema).table('InvoiceItem');
        return {
            getById: (0, exports.getById)(invoiceItems),
            create: (0, exports.createInvoiceItem)(invoiceItems),
            update: (0, exports.updateInvoiceItem)(invoiceItems)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=InvoiceItemData.js.map