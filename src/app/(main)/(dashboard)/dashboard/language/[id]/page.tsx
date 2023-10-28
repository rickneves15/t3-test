'use client'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { EditLanguage } from '~/components/pages/language/form/edit'
import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { Button } from '~/components/ui/button'
import { api } from '~/trpc/react'

export default function Edit({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: language, isLoading } = api.language.find.useQuery({ id })

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="flex items-center space-x-2 text-2xl font-bold tracking-tight">
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              asChild
            >
              <Link href="/dashboard/language">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <span className="flex-1">Edit Language</span>
          </h2>
        </div>
      </div>
      {language ? (
        <EditLanguage language={language} />
      ) : (
        'language was not found'
      )}
    </div>
  )
}
