import { getServerSession } from 'next-auth'
import { Header } from '@/components/Header'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <>
      <Header />
      <section className="min-h-screen  bg-gray-600 pt-20">
        <div className="bg-ct-dark-100 mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md">
          <div>
            <p className="mb-3 text-center text-5xl font-semibold">
              Profile Page
            </p>
            <pre>{JSON.stringify(user)}</pre>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-8">
                <div className="mt-8">
                  <p className="mb-3">Name: {user.name}</p>
                  <p className="mb-3">Email: {user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
