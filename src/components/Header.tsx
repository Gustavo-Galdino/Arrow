import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/" className="text-4xl font-bold">
        Arrow
      </Link>

      <SignedIn>
        <div className="flex items-center gap-4">
          <Link href="/training">Treino</Link>
          <Link href="/diet">Dieta</Link>
          <Link href="/stoke">Estoque</Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}
