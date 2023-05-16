import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { foodName, dietListId } = await req.json()

  const createNewFood = await prisma.food.create({
    data: {
      foodName,
      tables: {
        connect: { id: dietListId },
      },
    },
  })

  return new Response(JSON.stringify(createNewFood), {
    status: 201,
  })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.food.deleteMany({
    where: {
      id,
    },
  })

  return new Response(JSON.stringify('OK'), {
    status: 200,
  })
}
