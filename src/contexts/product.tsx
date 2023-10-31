'use client'

import { createContext, ReactNode, useContext, useEffect } from 'react'

import { Product } from '~/schemas/product'
import { useProductStore } from '~/store/product-store'
import { api } from '~/trpc/react'

interface ProductContextData {
  products: Product[]
  isLoading: boolean
  refetch: () => void
}

const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData,
)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const { products, setProducts } = useProductStore()
  const {
    data: productsData,
    isLoading,
    refetch,
  } = api.product.getAll.useQuery()

  useEffect(() => {
    if (productsData) {
      setProducts(productsData)
    }
  }, [productsData, setProducts])
  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        refetch,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext)
  return context
}
