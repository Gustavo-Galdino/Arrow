import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function GET() {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const foods = await prisma.stoke.findFirst({
    where: {
      User: {
        userId,
      },
    },
    include: {
      food: true,
    },
  })

  return new Response(JSON.stringify(foods), { status: 200 })
}

export async function POST(req: Request) {
  const { grams, foodId, dietListId } = await req.json()

  const createNewFood = await prisma.foodInGrams.create({
    data: {
      grams,
      food: {
        connect: { id: foodId },
      },
      DietList: { connect: { id: dietListId } },
    },
  })

  return new Response(JSON.stringify(createNewFood), {
    status: 201,
  })
}

export async function PATCH(req: Request) {
  const { grams, id } = await req.json()

  const createNewFood = await prisma.foodInGrams.update({
    where: {
      id,
    },
    data: {
      grams,
    },
  })

  return new Response(JSON.stringify(createNewFood), {
    status: 200,
  })
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    const food = await prisma.foodInGrams.delete({
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
