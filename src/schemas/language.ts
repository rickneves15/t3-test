import { z } from 'zod'

export const DeleteLanguageSchema = z.object({
  id: z.string().uuid(),
})

export const CreateLanguageSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
})

export type CreateLanguageSchemaValues = z.infer<typeof CreateLanguageSchema>

export const FindLanguageSchema = z.object({
  id: z.string().uuid(),
})

export const LanguageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
})

export type LanguageSchemaValues = z.infer<typeof LanguageSchema>

export type Language = {
  id: string
  name: string
  createdAt: Date
}
