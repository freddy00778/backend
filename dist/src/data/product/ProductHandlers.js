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
exports.create = exports.getProductById = exports.createProduct = void 0;
const ProductController_1 = __importDefault(require("./ProductController"));
const createProduct = (product) => (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product.create(req);
});
exports.createProduct = createProduct;
// export const updateProduct = (product: Controller) => async (req: Request) => {
//   return await product.update(req)
// }
const getProductById = (product) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product.getById(id);
});
exports.getProductById = getProductById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield ProductController_1.default.create(data);
        return {
            create: (0, exports.createProduct)(product),
            // update: updateProduct(product),
            getById: (0, exports.getProductById)(product)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ProductHandlers.js.map