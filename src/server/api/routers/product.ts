import {
  CreateProductSchema,
  OnlyIDProductSchema,
  UpdateProductSchema,
} from '~/schemas/product'
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.product.findMany({
        include: {
          productTranslate: true,
          productHasLanguage: {
            include: { language: true, productTranslate: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } catch (error) {
      console.log('error', error)
    }
  }),

  create: publicProcedure
    .input(CreateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          subtitle: input.subtitle,
          description: input.description,
          price: input.price,
        },
      })

      if (input.productOriginId) {
        await ctx.db.productHasLanguage.create({
          data: {
            productId: input.productOriginId,
            productTranslateId: product.id,
            languageId: input!.languageId,
          },
        })
      }

      return product
    }),

  find: publicProcedure
    .input(OnlyIDProductSchema)
    .query(async ({ ctx, input }) => {
      try {
        return ctx.db.product.findFirst({
          where: {
            id: input.id,
          },
        })
      } catch (error) {
        console.log('error', error)
      }
    }),

  delete: publicProcedure
    .input(OnlyIDProductSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.delete({
        where: {
          id: input.id,
        },
      })
    }),

  update: publicProcedure
    .input(UpdateProductSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.update({
        where: {
          id: input.id,
        },

        data: {
          name: input.name,
          subtitle: input.subtitle,
          description: input.description,
          price: input.price,
        },
      })
    }),

  findProductHasLanguage: publicProcedure
    .input(OnlyIDProductSchema)
    .query(async ({ ctx, input }) => {
      try {
        return ctx.db.productHasLanguage.findFirst({
          where: {
            productTranslateId: input.id,
          },
        })
      } catch (error) {
        console.log('error', error)
      }
    }),
})
