import ProductHandlers from "../data/product/ProductHandlers";


export const productService = async(item, data) => {
    return (await ProductHandlers.create(data)).getById(item.id)
}