'use client'

/* eslint-disable prettier/prettier */
import { PlusIcon } from '@radix-ui/react-icons'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import Link from 'next/link'
import clsx from 'clsx'

import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { Button } from '~/components/ui/button'
import { useProduct } from '~/contexts/product'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import { columns } from './columns'

export function ListProduct() {
  const { products, isLoading } = useProduct()

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          asChild
        >
          <Link href="/dashboard/product/create">
            <PlusIcon className="mr-2 h-4 w-4" />
            Product
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader
            className={clsx([
              table.getRowModel().rows?.length === 0 && 'hidden',
            ])}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="rounded-tl-lg">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
