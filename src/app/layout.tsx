import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '@/components/Provider'

export const metadata = {
  title: 'Arrow',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-gray-50">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
