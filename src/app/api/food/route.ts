import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const foods = await prisma.food.findFirst({
    where: {
      Stoke: {
        userId,
      },
    },
  })

  return new Response(JSON.stringify(foods), { status: 200 })
}

export async function POST(req: Request) {
  const { foodName, amount, category, carbo, type, protein, fat, stokeId } =
    await req.json()

  const createNewFood = await prisma.food.create({
    data: {
      foodName,
      amount,
      type,
      category,
      carbo,
      protein,
      fat,
      Stoke: {
        connect: {
          id: stokeId,
        },
      },
    },
  })

  return new Response(JSON.stringify(createNewFood), {
    status: 201,
  })
}

export async function PATCH(req: Request) {
  const { id, amount } = await req.json()

  await prisma.food.update({
    where: {
      id,
    },
    data: {
      amount,
    },
  })

  return new Response(JSON.stringify('OK'), {
    status: 200,
  })
}
