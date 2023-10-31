import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import {
  CreateLanguageSchema,
  OnlyIDLanguageSchema,
  UpdateLanguageSchema,
} from '~/schemas/language'

export const languageRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.language.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
    } catch (error) {
      console.log('error', error)
    }
  }),

  create: publicProcedure
    .input(CreateLanguageSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.language.create({
        data: {
          name: input.name,
        },
      })
    }),

  find: publicProcedure
    .input(OnlyIDLanguageSchema)
    .query(async ({ ctx, input }) => {
      try {
        return ctx.db.language.findFirst({
          where: {
            id: input.id,
          },
        })
      } catch (error) {
        console.log('error', error)
      }
    }),

  delete: publicProcedure
    .input(OnlyIDLanguageSchema)
    .mutation(async ({ ctx, input }) => {
      const productHasLanguage = await ctx.db.productHasLanguage.findMany({
        where: {
          languageId: input.id,
        },
      })

      const productIds = productHasLanguage.map(
        (productHasLanguage) => productHasLanguage.productId,
      )

      await ctx.db.productHasLanguage.deleteMany({
        where: {
          languageId: input.id,
        },
      })

      if (productIds) {
        await ctx.db.product.deleteMany({
          where: {
            id: { in: productIds },
          },
        })
      }

      return await ctx.db.language.delete({
        where: {
          id: input.id,
        },
      })
    }),

  update: publicProcedure
    .input(UpdateLanguageSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.language.update({
        where: {
          id: input.id,
        },

        data: {
          name: input.name,
        },
      })
    }),
})
