import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { NewLanguage } from '~/components/pages/dashboard/language/form/new'
import { Button } from '~/components/ui/button'

export default function Create() {
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
            <span className="flex-1">Create Language</span>
          </h2>
        </div>
      </div>

      <NewLanguage />
    </div>
  )
}
