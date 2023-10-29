'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'

import {
  CreateLanguage,
  CreateLanguageSchema,
  Language,
} from '~/schemas/language'
import { useLanguageStore } from '~/store/language-store'
import { api } from '~/trpc/react'

interface LanguageContextData {
  languages: Language[]
  isLoading: boolean
  onCreateSubmit: (language: Language) => unknown
  createForm: UseFormReturn<CreateLanguage>
  refetch: () => void
}

const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData,
)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { languages, setLanguages, createLanguage } = useLanguageStore()

  const {
    data: languagesData,
    isLoading,
    refetch,
  } = api.language.getAll.useQuery()

  const createForm = useForm<CreateLanguage>({
    resolver: zodResolver(CreateLanguageSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  })

  const { mutate: newLanguage } = api.language.create.useMutation({
    onSuccess: (data: Language) => {
      createLanguage(data)
      createForm.reset()
    },
  })

  const onCreateSubmit = (language: CreateLanguage) => {
    newLanguage(language)
    router.push('/dashboard/language')
  }

  useEffect(() => {
    if (languagesData) {
      setLanguages(languagesData)
    }
  }, [languagesData, setLanguages])

  return (
    <LanguageContext.Provider
      value={{
        languages,
        isLoading,
        refetch,
        onCreateSubmit,
        createForm,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
