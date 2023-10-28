/* eslint-disable prettier/prettier */
'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'

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
import { CreateLanguageSchema, CreateLanguageSchemaValues } from '~/schemas/language'
import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { api } from '~/trpc/react'
import { useLanguageStore } from '~/store/language-store'

export function NewLanguage() {
  const router = useRouter()
  const { createLanguage } = useLanguageStore()

  const form = useForm<CreateLanguageSchemaValues>({
    resolver: zodResolver(CreateLanguageSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  })

  const { isValid, isSubmitting } = form.formState

  const { mutate: newLanguage } = api.language.create.useMutation({
    onSuccess: (data) => {
      createLanguage(data)
      form.reset()
    },
  })

  const onSubmit = (language: z.infer<typeof CreateLanguageSchema>) => {
    newLanguage(language)
    router.push('/dashboard/language')
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>Create Language</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
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
