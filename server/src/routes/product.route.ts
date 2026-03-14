import {
  createProduct,
  deleteProduct,
  getProductDetail,
  getProductList,
  updateProduct
} from '@/controllers/product.controller'
import { requireLoginedHook } from '@/hooks/auth.hooks'
import { MessageRes, MessageResType } from '@/schemaValidations/common.schema'
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductListRes,
  ProductListResType,
  ProductParams,
  ProductParamsType,
  ProductRes,
  ProductResType,
  UpdateProductBody,
  UpdateProductBodyType
} from '@/schemaValidations/product.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function productRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get<{
    Reply: ProductListResType
  }>(
    '/',
    {
      schema: {
        response: {
          200: ProductListRes
        }
      }
    },
    async (request, reply) => {
      const products = await getProductList()
      reply.send({
        data: products,
        message: 'Get list of product successfully!'
      })
    }
  )

  fastify.get<{
    Params: ProductParamsType
    Reply: ProductResType
  }>(
    '/:id',
    {
      schema: {
        params: ProductParams,
        response: {
          200: ProductRes
        }
      }
    },
    async (request, reply) => {
      const product = await getProductDetail(request.params.id)
      reply.send({
        data: product,
        message: 'Get information of product successfully!'
      })
    }
  )

  fastify.post<{
    Body: CreateProductBodyType
    Reply: ProductResType
  }>(
    '',
    {
      schema: {
        body: CreateProductBody,
        response: {
          200: ProductRes
        }
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const product = await createProduct(request.body)
      reply.send({
        data: product,
        message: 'Create product successfully!'
      })
    }
  )

  fastify.put<{
    Params: ProductParamsType
    Body: UpdateProductBodyType
    Reply: ProductResType
  }>(
    '/:id',
    {
      schema: {
        params: ProductParams,
        body: UpdateProductBody,
        response: {
          200: ProductRes
        }
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const product = await updateProduct(request.params.id, request.body)
      reply.send({
        data: product,
        message: 'Update product successfully!'
      })
    }
  )

  fastify.delete<{
    Params: ProductParamsType
    Reply: MessageResType
  }>(
    '/:id',
    {
      schema: {
        params: ProductParams,
        response: {
          200: MessageRes
        }
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      await deleteProduct(request.params.id)
      reply.send({
        message: 'Delete product successfully!'
      })
    }
  )
}
