import { prisma } from '@/lib/prisma'

export async function GET() {
  const foods = await prisma.food.findMany()

  return new Response(JSON.stringify(foods), { status: 200 })
}

export async function POST(req: Request) {
  const { foodName, amount, category, carbo, protein, fat } = await req.json()

  const createNewFood = await prisma.food.create({
    data: {
      foodName,
      amount,
      category,
      carbo,
      protein,
      fat,
    },
  })

  return new Response(JSON.stringify(createNewFood), {
    status: 201,
  })
}

export async function PATCH(req: Request) {
  const { foodId, tableId } = await req.json()

  await prisma.food.update({
    where: {
      id: foodId,
    },
    data: {
      tables: {
        disconnect: {
          id: tableId,
        },
      },
    },
  })

  return new Response(JSON.stringify('OK'), {
    status: 200,
  })
}
