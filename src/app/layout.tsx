import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'Arrow',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="bg-zinc-900 text-gray-100">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
