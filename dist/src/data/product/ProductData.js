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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getProductById = exports.updateProduct = exports.createProduct = void 0;
const config_1 = require("../../config");
const createProduct = (products) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield products().insert(input, ['id', 'name', 'price']))[0];
});
exports.createProduct = createProduct;
const updateProduct = (products) => (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield products().select().where({ id: input.id }).update(input));
});
exports.updateProduct = updateProduct;
const getProductById = (products) => (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield products().select().where({ id: id }))[0];
});
exports.getProductById = getProductById;
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = () => data.postgres.withSchema(config_1.Database.schema).table('Product');
        return {
            getById: (0, exports.getProductById)(products),
            create: (0, exports.createProduct)(products),
            update: (0, exports.updateProduct)(products)
        };
    });
}
exports.create = create;
exports.default = { create };
//# sourceMappingURL=ProductData.js.map