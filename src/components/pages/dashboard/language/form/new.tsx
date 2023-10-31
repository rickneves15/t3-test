/* eslint-disable prettier/prettier */
'use client'

import { clsx } from 'clsx'

import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { useLanguage } from '~/contexts/language'

export function NewLanguage() {
  const { onCreateSubmit, createForm } = useLanguage()
  const { isValid, isSubmitting } = createForm.formState

  return (
    <Card >
      <CardHeader>
        <CardTitle>Create Language</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...createForm}>
          {/* @ts-ignore */}
          <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-8">
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

            <div className="flex">
              <Button
                className={clsx('w-full', [
                  !isValid && 'opacity-50 disabled:cursor-not-allowed',
                  isSubmitting &&
                  'disabled:cursor-wait disabled:bg-primary disabled:opacity-100',
                ])}
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                {isSubmitting && (
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
