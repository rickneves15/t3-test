'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu'
import { Button } from '~/components/ui/button'
import { ProductSchema } from '~/schemas/product'
import { useProductStore } from '~/store/product-store'
import { api } from '~/trpc/react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function Actions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const product = ProductSchema.parse(row.original)
  const { deleteProduct } = useProductStore()

  const { mutate: removeProduct } = api.product.delete.useMutation({
    onSuccess(data) {
      deleteProduct(data.id)
    },
  })

  const { data: productOrigin } = api.product.findProductHasLanguage.useQuery({
    id: product.id,
  })

  const handleTranslation = () => {
    router.push(`/dashboard/product/create?productOriginId=${product.id}`)
  }

  const handleEdit = () => {
    router.push(`/dashboard/product/${product.id}`)
  }

  const handleDelete = () => {
    removeProduct({ id: product.id })
  }

  const checkAddTranslation = () => {
    if (productOrigin) {
      return false
    }

    return true
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {checkAddTranslation() && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleTranslation}
            >
              Add Translation
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
