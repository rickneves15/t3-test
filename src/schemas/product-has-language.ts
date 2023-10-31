import { z } from 'zod'

import { BaseProductSchema } from './product'
import { BaseLanguageSchema } from './language'

export const ProductHasLanguageSchema = z.object({
  id: z.string().uuid(),

  productId: z.string().uuid(),
  product: z.lazy(() => BaseProductSchema),

  productTranslateId: z.string().uuid(),
  productTranslate: z.lazy(() => BaseProductSchema),

  languageId: z.string().uuid(),
  language: z.lazy(() => BaseLanguageSchema),

  createdAt: z.date(),
})
