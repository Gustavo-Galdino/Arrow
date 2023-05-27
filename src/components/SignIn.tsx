'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'

import googleIcon from '@/assets/google.svg'

export function SignIn() {
  return (
    <section className="m-auto space-y-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="flex flex-col gap-4 rounded border p-6">
        <button
          className="flex items-center gap-1 rounded bg-sky-400 px-4 py-2 text-lg font-bold hover:bg-sky-300 hover:text-gray-200"
          onClick={() => signIn('google')}
        >
          <Image src={googleIcon} alt="" width={40} height={40} />
          Entrar com Google
        </button>
        <a
          href="/"
          className="flex items-center gap-1 rounded border px-4 py-2 text-lg font-bold hover:text-gray-200"
        >
          <Image src={googleIcon} alt="" width={40} height={40} />
          Entrar com Outlook
        </a>
        <a
          href="/"
          className="flex items-center gap-1 rounded border px-4 py-2 text-lg font-bold hover:text-gray-200"
        >
          <Image src={googleIcon} alt="" width={40} height={40} />
          Entrar com Facebook
        </a>
      </div>
    </section>
  )
}
