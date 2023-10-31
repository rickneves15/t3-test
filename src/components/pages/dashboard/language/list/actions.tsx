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
import { LanguageSchema } from '~/schemas/language'
import { api } from '~/trpc/react'
import { useLanguageStore } from '~/store/language-store'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function Actions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const language = LanguageSchema.parse(row.original)
  const { deleteLanguage } = useLanguageStore()
  const router = useRouter()

  const { mutate: removeLanguage } = api.language.delete.useMutation({
    onSuccess(data) {
      deleteLanguage(data.id)
    },
  })

  const handleEdit = () => {
    router.push(`/dashboard/language/${language.id}`)
  }

  const handleDelete = () => {
    removeLanguage({ id: language.id })
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
          <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="cursor-pointer">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
