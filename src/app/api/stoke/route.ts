import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  const user = session?.user?.email
  const foods = await prisma.stoke.findMany({
    where: {
      user: {
        email: user,
      },
    },
    include: {
      food: true,
    },
  })

  return new Response(JSON.stringify(foods), { status: 200 })
}
