'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Product } from '~/schemas/product'

import { Actions } from './actions'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="flex items-center space-x-2">ID</div>,
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'name',
    header: () => <div className="flex items-center space-x-2">Name</div>,
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'subtitle',
    header: () => <div className="flex items-center space-x-2">Subtitle</div>,
    cell: ({ row }) => row.getValue('subtitle'),
  },
  {
    accessorKey: 'description',
    header: () => (
      <div className="flex items-center space-x-2">Description</div>
    ),
    cell: ({ row }) => row.getValue('description'),
  },
  {
    accessorKey: 'price',
    header: () => <div className="flex items-center space-x-2">Price</div>,
    cell: ({ row }) => row.getValue('price'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions row={row} />,
  },
]
