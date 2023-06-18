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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    await prisma.foodInGrams.deleteMany({
      where: {
        foodId: id,
      },
    })

    const food = await prisma.food.delete({
      where: {
        id,
      },
    })

    return new Response(JSON.stringify(food), {
      status: 200,
    })
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }
}
