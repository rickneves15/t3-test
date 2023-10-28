'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

export function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen w-60 flex-col bg-black p-3 shadow">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
          <button onClick={() => setOpen(!open)}>
            <HamburgerMenuIcon />
          </button>
        </div>
        <div className="flex-1">
          <ul className="space-y-1 pb-4 pt-2 text-sm">
            <li className="hover:rounded hover:bg-primary hover:text-primary-foreground">
              <Link
                href="/"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                Product
              </Link>
            </li>
            <li className="hover:rounded hover:bg-primary hover:text-primary-foreground">
              <Link
                href="/language"
                className="flex items-center space-x-3 rounded-md p-2"
              >
                Language
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
