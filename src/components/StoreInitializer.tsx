'use client'

import { useStore } from '@/context/store'
import { useRef } from 'react'

export function StoreInitializer({ user }: any) {
  const initialized = useRef(false)
  if (!initialized.current) {
    useStore.setState({ user })
    initialized.current = true
  }
  return null
}
