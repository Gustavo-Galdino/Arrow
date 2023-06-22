import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header className="flex items-center justify-between p-5">
      <h1 className="text-4xl font-bold">Arrow</h1>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}
