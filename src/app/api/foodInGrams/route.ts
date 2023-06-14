import { prisma } from '@/lib/prisma'

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

export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.foodInGrams.delete({
    where: {
      id,
    },
  })
}
