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
exports.updateLicense = exports.createLicense = void 0;
const DataProvider_1 = __importDefault(require("../data/DataProvider"));
const LicenseHandlers_1 = __importDefault(require("../data/license/LicenseHandlers"));
const omit_1 = __importDefault(require("omit"));
const dateUtil_1 = require("../utils/dateUtil");
const createLicense = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    const expiry = (0, dateUtil_1.futureDate)(30);
    const body = Object.assign(Object.assign({}, req.body), { expiry });
    const bodyObject = (0, omit_1.default)(["formattedPrice", "emailInvoice", "email", "items", "cardCountry", "billingState", "billingZip", "billingCountry"], body);
    // @ts-ignore
    return yield (yield LicenseHandlers_1.default.create(data)).create(bodyObject);
});
exports.createLicense = createLicense;
const updateLicense = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield DataProvider_1.default.create();
    return yield (yield LicenseHandlers_1.default.create(data)).update(req.body);
});
exports.updateLicense = updateLicense;
//# sourceMappingURL=licenseService.js.map