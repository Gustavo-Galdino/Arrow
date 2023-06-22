import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'

export const metadata = {
  title: 'Arrow',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en" className={inter.className}>
        <body className="bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-gray-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
