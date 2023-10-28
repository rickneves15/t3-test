import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import {
  CreateLanguageSchema,
  DeleteLanguageSchema,
  FindLanguageSchema,
  LanguageSchema,
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
    .input(FindLanguageSchema)
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
    .input(DeleteLanguageSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.language.delete({
        select: {
          id: true,
          name: true,
        },

        where: {
          id: input.id,
        },
      })
    }),

  update: publicProcedure
    .input(LanguageSchema)
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
