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
exports.create = exports.updateInvoice = exports.createInvoice = exports.getInvoice = exports.getAll = void 0;
const config_1 = require("../../config");
const getAll = (invoices) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    const query = invoices().select("Invoice.*", "User.firstName", "User.lastName", "User.email", "InvoiceItem.quantity").from('Invoice')
        .leftJoin('User', 'User.id', 'Invoice.user')
        .leftJoin('InvoiceItem', 'Invoice.id', 'InvoiceItem.invoice');
    if (input)
        query.where(input);
    return query.orderBy("created_at", "desc");
});
exports.getAll = getAll;
const getInvoice = (invoices) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return invoices().select("Invoice.*", "User.firstName", "User.lastName", "User.email", "InvoiceItem.quantity").from('Invoice')
        .leftJoin('User', 'User.id', 'Invoice.user')
        .leftJoin('InvoiceItem', 'Invoice.id', 'InvoiceItem.invoice')
        .where(input).first();
});
exports.getInvoice = getInvoice;
const createInvoice = (invoices) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield invoices().insert(input, ['id', 'license', 'user', 'provider', 'total', 'formatted_total',
        'tax', 'cardCountry', 'billingState', 'paid', 'payment_link', 'transaction_number']))[0];
});
exports.createInvoice = createInvoice;
const updateInvoice = (invoices) => (transactionNumber, input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield invoices().select().where({ transaction_number: transactionNumber })
        .update(input));
});
exports.updateInvoice = updateInvoice;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = () => data.postgres.withSchema(config_1.Database.schema).table('Invoice');
        return {
            getAll: (0, exports.getAll)(invoices),
            getInvoice: (0, exports.getInvoice)(invoices),
            create: (0, exports.createInvoice)(invoices),
            update: (0, exports.updateInvoice)(invoices)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=InvoiceData.js.map