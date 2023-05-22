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
exports.getAll = void 0;
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const InvoiceHandlers_1 = __importDefault(require("../data/checkout/InvoiceHandlers"));
const omit_1 = __importDefault(require("omit"));
const getAll = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const body = Object.assign({}, req.body);
    const bodyObject = (0, omit_1.default)(["items"], body);
    // @ts-ignore
    const members = yield (yield InvoiceHandlers_1.default.create(data)).create(bodyObject);
    // const teams =  await (await InvoiceHandlers.create(data)).create(bodyObject)
    return members;
});
exports.getAll = getAll;
//# sourceMappingURL=dashboardService.js.map