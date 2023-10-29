import { z } from 'zod'

export const LanguageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  createdAt: z.date(),
})

export type Language = z.infer<typeof LanguageSchema>

export const CreateLanguageSchema = LanguageSchema.omit({
  id: true,
  createdAt: true,
})

export type CreateLanguage = z.infer<typeof CreateLanguageSchema>

export const UpdateLanguageSchema = LanguageSchema.omit({ createdAt: true })

export type UpdateLanguage = z.infer<typeof UpdateLanguageSchema>

export const OnlyIDLanguageSchema = LanguageSchema.pick({ id: true })
