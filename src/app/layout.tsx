import './globals.css'
import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'

export const metadata = {
  title: 'Arrow',
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR" className={roboto.className}>
        <body className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
