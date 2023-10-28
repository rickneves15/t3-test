/* eslint-disable prettier/prettier */
'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Language, LanguageSchema, LanguageSchemaValues } from '~/schemas/language'
import { SpinnerIcon } from '~/components/ui/Icons/spinner-icon'
import { api } from '~/trpc/react'
import { useLanguageStore } from '~/store/language-store'

interface EditLanguage {
  language: Language
}

export function EditLanguage({ language }: EditLanguage) {
  const router = useRouter()
  const { editLanguage } = useLanguageStore()

  const form = useForm<LanguageSchemaValues>({
    resolver: zodResolver(LanguageSchema),
    defaultValues: {
      id: language.id,
      name: language.name,
    },
    mode: 'onChange',
  })

  const { isSubmitting } = form.formState

  const { mutate: updateLanguage } = api.language.update.useMutation({
    onSuccess: (data) => {
      editLanguage(language.id, data)
      form.reset()
    },
  })

  const onSubmit = (language: z.infer<typeof LanguageSchema>) => {
    updateLanguage(language)
    router.push('/dashboard/language')
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>Edit Language</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              defaultValue={language.name}
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
                className='w-full'
                type="submit"
              >
                {isSubmitting && (
                  <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Edit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
