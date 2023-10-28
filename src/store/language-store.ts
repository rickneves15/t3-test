import { create } from 'zustand'

import { LanguageSchemaValues } from '~/schemas/language'

interface LanguageState {
  languages: LanguageSchemaValues[]
}

interface LanguageActions {
  createLanguage: (newLanguage: LanguageSchemaValues) => void
  setLanguages: (languages: LanguageSchemaValues[]) => void
  deleteLanguage: (languageId: string) => void
  editLanguage: (languageId: string, newLanguage: LanguageSchemaValues) => void
}

export const useLanguageStore = create<LanguageState & LanguageActions>()(
  (set) => ({
    languages: [],
    createLanguage: (newLanguage) =>
      set((state) => ({ languages: [...state.languages, newLanguage] })),
    setLanguages: (languages) => set(() => ({ languages })),
    deleteLanguage: (languageId) =>
      set((state) => ({
        languages: state.languages.filter(
          (language) => language.id !== languageId,
        ),
      })),
    editLanguage: (languageId, newLanguage) =>
      set((state) => ({
        languages: state.languages.map((language) =>
          language.id === languageId ? { ...language, newLanguage } : language,
        ),
      })),
  }),
)
