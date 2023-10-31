'use client'

import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { Product } from '~/schemas/product'
import { useLanguageStore } from '~/store/language-store'
import { api } from '~/trpc/react'

import { ProductItem } from './product-item'

export function ListProduct() {
  const { languageSelected } = useLanguageStore()
  const { data: products, isLoading } = api.product.getAllByLanguageId.useQuery(
    { languageId: languageSelected || '' },
  )

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
      {products &&
        products.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  )
}
