'use client'

import { ColumnDef } from '@tanstack/react-table'

import { LanguageSchemaValues } from '~/schemas/language'

import { Actions } from './actions'

export const columns: ColumnDef<LanguageSchemaValues>[] = [
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
