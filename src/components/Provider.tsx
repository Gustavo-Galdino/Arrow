'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface Props {
  children?: ReactNode
}

export function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
