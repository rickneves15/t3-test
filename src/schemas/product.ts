import { z } from 'zod'

import { ProductHasLanguageSchema } from './product-has-language'

export const BaseProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  subtitle: z.string().min(3, {
    message: 'Subtitle must be at least 3 characters.',
  }),
  description: z.string().min(3, {
    message: 'Description must be at least 3 characters.',
  }),
  price: z.coerce.number(),
  createdAt: z.date(),
})

export const ProductSchema = BaseProductSchema.extend({
  productHasLanguage: z
    .array(
      ProductHasLanguageSchema.omit({
        id: true,
        product: true,
        languageId: true,
        createdAt: true,
      }),
    )
    .optional(),
})

export const ListProductSchema = z.array(ProductSchema)

export type Product = z.infer<typeof ProductSchema>

export const CreateProductSchema = BaseProductSchema.omit({
  id: true,
  createdAt: true,
}).extend({
  productOriginId: z.string().uuid().optional(),
  languageId: z.string().uuid().optional(),
})

export type CreateProduct = z.infer<typeof CreateProductSchema>

export const UpdateProductSchema = BaseProductSchema.omit({
  createdAt: true,
})

export type UpdateProduct = z.infer<typeof UpdateProductSchema>

export const OnlyIDProductSchema = BaseProductSchema.pick({ id: true })

export const getAllByLanguageIdProductSchema = z.object({
  languageId: z.string().optional(),
})
