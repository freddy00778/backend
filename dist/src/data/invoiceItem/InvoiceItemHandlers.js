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
exports.create = exports.getInvoiceItem = exports.createInvoiceItem = void 0;
const InvoiceItemController_1 = __importDefault(require("./InvoiceItemController"));
const createInvoiceItem = (invoiceItem) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invoiceItem.create(req);
});
exports.createInvoiceItem = createInvoiceItem;
const getInvoiceItem = (invoiceItem) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield invoiceItem.getById(input);
});
exports.getInvoiceItem = getInvoiceItem;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const invoiceItem = yield InvoiceItemController_1.default.create(data);
        return {
            create: (0, exports.createInvoiceItem)(invoiceItem),
            getById: (0, exports.getInvoiceItem)(invoiceItem)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=InvoiceItemHandlers.js.map