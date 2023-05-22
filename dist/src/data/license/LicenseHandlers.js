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
exports.create = exports.getLicenseById = exports.updateLicense = exports.createProduct = exports.getAll = void 0;
const LicenseController_1 = __importDefault(require("./LicenseController"));
const getAll = (license) => () => __awaiter(void 0, void 0, void 0, function* () {
    return yield license.getAll();
});
exports.getAll = getAll;
const createProduct = (license) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield license.create(req);
});
exports.createProduct = createProduct;
const updateLicense = (license) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield license.update(req);
});
exports.updateLicense = updateLicense;
const getLicenseById = (license) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield license.getById(id);
});
exports.getLicenseById = getLicenseById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const license = yield LicenseController_1.default.create(data);
        return {
            getAll: (0, exports.getAll)(license),
            create: (0, exports.createProduct)(license),
            update: (0, exports.updateLicense)(license),
            getById: (0, exports.getLicenseById)(license)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=LicenseHandlers.js.map