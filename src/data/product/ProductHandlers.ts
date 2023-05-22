import {Request} from 'express'

import {DataClient} from '../index'
import ProductController, {Controller} from './ProductController'


export const createProduct = (product: Controller) => async (req: Request) => {
    return await product.create(req)
}

// export const updateProduct = (product: Controller) => async (req: Request) => {
//   return await product.update(req)
// }

export const getProductById = (product: Controller) => async (id: String) => {
  return await product.getById(id)
}

export async function create (data: DataClient) {
  const product = await ProductController.create(data)

  return {
    create: createProduct(product),
    // update: updateProduct(product),
    getById: getProductById(product)
  }
}

export default {create}
