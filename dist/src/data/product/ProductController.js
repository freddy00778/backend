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
exports.create = exports.createProduct = exports.getProduct = void 0;
const ProductData_1 = __importDefault(require("./ProductData"));
const getProduct = (product) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return product.getById(id);
});
exports.getProduct = getProduct;
const createProduct = (product) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return product.create(input);
});
exports.createProduct = createProduct;
// export const updateProduct = (product: Data) => async (input?: CreateInput) => {
//   return product.update(input)
// }
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield ProductData_1.default.create(data);
        return {
            getById: (0, exports.getProduct)(products),
            create: (0, exports.createProduct)(products),
            // update: updateProduct(products)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ProductController.js.map