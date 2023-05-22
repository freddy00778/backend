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
exports.create = exports.updateLicense = exports.createLicense = exports.getLicense = exports.getAll = void 0;
const LicenseData_1 = __importDefault(require("./LicenseData"));
const getAll = (license) => () => __awaiter(void 0, void 0, void 0, function* () {
    return license.getAll();
});
exports.getAll = getAll;
const getLicense = (license) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return license.getById(id);
});
exports.getLicense = getLicense;
const createLicense = (license) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return license.create(input);
});
exports.createLicense = createLicense;
const updateLicense = (license) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return license.update(input);
});
exports.updateLicense = updateLicense;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const licenses = yield LicenseData_1.default.create(data);
        return {
            getAll: (0, exports.getAll)(licenses),
            getById: (0, exports.getLicense)(licenses),
            create: (0, exports.createLicense)(licenses),
            update: (0, exports.updateLicense)(licenses)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=LicenseController.js.map