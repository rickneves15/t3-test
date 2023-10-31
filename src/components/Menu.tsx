'use client'

import { useLanguageStore } from '~/store/language-store'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function Menu() {
  const { languages, setLanguageSelected } = useLanguageStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <a
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/"
          >
            Home
          </a>
          <a
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/dashboard"
          >
            Dashboard
          </a>
        </nav>
        <div>
          <Select
            defaultValue="all"
            onValueChange={(languageId) => setLanguageSelected(languageId)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}
