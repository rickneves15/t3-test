import { z } from 'zod'

export const BaseLanguageSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    createdAt: z.date(),
  })
  .strict()

export const LanguageSchema = BaseLanguageSchema

export type Language = z.infer<typeof LanguageSchema>

export const CreateLanguageSchema = LanguageSchema.omit({
  id: true,
  createdAt: true,
})

export type CreateLanguage = z.infer<typeof CreateLanguageSchema>

export const UpdateLanguageSchema = LanguageSchema.omit({
  createdAt: true,
  ProductHasLanguage: true,
})

export type UpdateLanguage = z.infer<typeof UpdateLanguageSchema>

export const OnlyIDLanguageSchema = LanguageSchema.pick({ id: true })
