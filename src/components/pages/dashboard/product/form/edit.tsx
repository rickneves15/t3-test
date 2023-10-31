'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { Button } from '~/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { useProduct } from '~/contexts/product'
import { Product, UpdateProduct, UpdateProductSchema } from '~/schemas/product'
import { useProductStore } from '~/store/product-store'
import { api } from '~/trpc/react'

interface EditProduct {
  product: Product
}

export function EditProduct({ product }: EditProduct) {
  const router = useRouter()
  const { refetch } = useProduct()
  const { editProduct } = useProductStore()

  const editForm = useForm<UpdateProduct>({
    resolver: zodResolver(UpdateProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      description: product.description,
      price: product.price,
    },
    mode: 'onChange',
  })

  const { mutate: updateProduct } = api.product.update.useMutation({
    onSuccess: (data: Product) => {
      editProduct(product.id, data)
      refetch()
      editForm.reset()
    },
  })

  const onSubmit = (product: UpdateProduct) => {
    updateProduct(product)
    router.push('/dashboard/product')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={editForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editForm.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Subtitle..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description..."
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price..."
                      {...field}
                      type="number"
                      min="1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              <Button className="w-full" type="submit">
                {editForm.formState.isSubmitting && (
                  <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Edit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
