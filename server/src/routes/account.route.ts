import { updateMeController } from '@/controllers/account.controller'
import { requireLoginedHook } from '@/hooks/auth.hooks'
import { AccountRes, AccountResType, UpdateMeBodyType } from '@/schemaValidations/account.schema'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function accountRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoginedHook]))
  fastify.get<{ Reply: AccountResType }>(
    '/me',
    {
      schema: {
        response: {
          200: AccountRes
        }
      }
    },
    async (request, reply) => {
      reply.send({
        data: request.account!,
        message: 'Get information successfully.'
      })
    }
  )

  fastify.put<{
    Reply: AccountResType
    Body: UpdateMeBodyType
  }>(
    '/me',
    {
      schema: {
        response: {
          200: AccountRes
        }
      }
    },
    async (request, reply) => {
      const result = await updateMeController(request.account?.id as number, request.body)
      reply.send({
        data: result,
        message: 'Update information successfully.'
      })
    }
  )
}
