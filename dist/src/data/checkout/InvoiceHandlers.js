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
const InvoiceController_1 = __importDefault(require("./InvoiceController"));
const getAll = (invoice) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return invoice.getAll(input);
});
exports.getAll = getAll;
const getInvoice = (invoice) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return invoice.getInvoice(input);
});
exports.getInvoice = getInvoice;
const createInvoice = (invoice) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invoice.create(req);
});
exports.createInvoice = createInvoice;
const updateInvoice = (checkout) => (transactionNumber, input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield checkout.update(transactionNumber, input);
});
exports.updateInvoice = updateInvoice;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoice = yield InvoiceController_1.default.create(data);
        return {
            getAll: (0, exports.getAll)(invoice),
            getInvoice: (0, exports.getInvoice)(invoice),
            create: (0, exports.createInvoice)(invoice),
            update: (0, exports.updateInvoice)(invoice),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=InvoiceHandlers.js.map