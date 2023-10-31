'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Language } from '~/schemas/language'

import { Actions } from './actions'

export const columns: ColumnDef<Language>[] = [
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
    id: 'actions',
    cell: ({ row }) => <Actions row={row} />,
  },
]
