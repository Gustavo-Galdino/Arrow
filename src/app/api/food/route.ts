import { prisma } from '@/lib/prisma'

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
