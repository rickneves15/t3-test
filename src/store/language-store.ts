import { create } from 'zustand'

import { Language } from '~/schemas/language'

interface LanguageState {
  languages: Language[]
}

interface LanguageActions {
  createLanguage: (newLanguage: Language) => void
  setLanguages: (languages: Language[]) => void
  deleteLanguage: (languageId: string) => void
  editLanguage: (languageId: string, newLanguage: Language) => void
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
