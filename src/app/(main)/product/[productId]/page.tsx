'use client'

import { DetailProduct } from '~/components/pages/main/product/detail-product'
import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { api } from '~/trpc/react'

export default function Main({
  params: { productId },
}: {
  params: { productId: string }
}) {
  const { data: product, isLoading } = api.product.find.useQuery({
    id: productId,
  })

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <>
      {!product && 'Product was not found'}
      {product && <DetailProduct product={product} />}
    </>
  )
}
