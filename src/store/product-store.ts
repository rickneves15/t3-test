import { create } from 'zustand'

import { Product } from '~/schemas/product'

interface ProductState {
  products: Product[]
}

interface ProductActions {
  createProduct: (newProduct: Product) => void
  setProducts: (products: Product[]) => void
  deleteProduct: (productId: string) => void
  editProduct: (productId: string, product: Product) => void
}

export const useProductStore = create<ProductState & ProductActions>()(
  (set) => ({
    products: [],
    createProduct: (newProduct) =>
      set((state) => ({ products: [...state.products, newProduct] })),
    setProducts: (products) => set(() => ({ products })),
    deleteProduct: (productId) =>
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      })),
    editProduct: (productId, newLanguage) =>
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? { ...product, newLanguage } : product,
        ),
      })),
  }),
)
