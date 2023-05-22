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
exports.create = exports.createInvoiceItem = exports.getInvoiceItem = void 0;
const InvoiceItemData_1 = __importDefault(require("./InvoiceItemData"));
const getInvoiceItem = (invoiceItem) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return invoiceItem.getById(input);
});
exports.getInvoiceItem = getInvoiceItem;
const createInvoiceItem = (invoiceItem) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return invoiceItem.create(input);
});
exports.createInvoiceItem = createInvoiceItem;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoiceItems = yield InvoiceItemData_1.default.create(data);
        return {
            getById: (0, exports.getInvoiceItem)(invoiceItems),
            create: (0, exports.createInvoiceItem)(invoiceItems),
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=InvoiceItemController.js.map