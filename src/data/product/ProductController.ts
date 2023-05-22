import ProductData , {Data, CreateInput} from './ProductData'
import {DataClient} from '../index'

export interface Controller {
  getById:  ReturnType<typeof getProduct>
  create:   ReturnType<typeof createProduct>
  // update:   ReturnType<typeof updateProduct>
}

export const getProduct = (product: Data) => async (id: String) => {
  return product.getById(id)
}

export const createProduct = (product: Data) => async (input?: CreateInput) => {
  return product.create(input)
}

// export const updateProduct = (product: Data) => async (input?: CreateInput) => {
//   return product.update(input)
// }

export async function create (data: DataClient): Promise<Controller> {
  const products = await ProductData.create(data)

  return {
    getById: getProduct(products),
    create: createProduct(products),
    // update: updateProduct(products)
  }
}

export default {create}
