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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.updateInvoice = exports.createInvoice = exports.getInvoice = exports.getAll = void 0;
const InvoiceData_1 = __importDefault(require("./InvoiceData"));
const getAll = (checkout) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return checkout.getAll(input);
});
exports.getAll = getAll;
const getInvoice = (checkout) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return checkout.getInvoice(input);
});
exports.getInvoice = getInvoice;
const createInvoice = (checkout) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return checkout.create(input);
});
exports.createInvoice = createInvoice;
const updateInvoice = (checkout) => (transaction_number, input) => __awaiter(void 0, void 0, void 0, function* () {
    return checkout.update(transaction_number, input);
});
exports.updateInvoice = updateInvoice;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoices = yield InvoiceData_1.default.create(data);
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
//# sourceMappingURL=InvoiceController.js.map