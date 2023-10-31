'use client'
/* eslint-disable prettier/prettier */
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { CreateProduct, CreateProductSchema, ProductSchema } from '~/schemas/product'
import { useLanguageStore } from '~/store/language-store'
import { useProductStore } from '~/store/product-store'
import { api } from '~/trpc/react'

export function NewProduct() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const productOriginId = searchParams.get('productOriginId');
  const { languages } = useLanguageStore()
  const { createProduct } = useProductStore()


  let defaultValues:CreateProduct = {
    name: '',
    subtitle: '',
    description: '',
    price: 0,
  }
  if (productOriginId) {
    defaultValues = {
      ...defaultValues,
      productOriginId,
      languageId: '',
    }
  }

  const createForm = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { mutate: newProduct } = api.product.create.useMutation({
    onSuccess: (data: CreateProduct) => {
      const product = ProductSchema.parse(data)
      createProduct(product)
      createForm.reset()
    },
  })

  const onCreateSubmit = (product: CreateProduct) => {
    newProduct(product)
    router.push('/dashboard/product')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...createForm}>
          <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-8">
            {productOriginId && (
              <FormField
                control={createForm.control}
                name="languageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.id} value={language.id}>
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={createForm.control}
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
              control={createForm.control}
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
              control={createForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description..." {...field} className='resize-none' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price..." {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              <Button
                className={clsx('w-full', [
                  !createForm.formState.isValid && 'opacity-50 disabled:cursor-not-allowed',
                  createForm.formState.isSubmitting &&
                  'disabled:cursor-wait disabled:bg-primary disabled:opacity-100',
                ])}
                disabled={!createForm.formState.isValid || createForm.formState.isSubmitting}
                type="submit"
              >
                {createForm.formState.isSubmitting && (
                  <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
