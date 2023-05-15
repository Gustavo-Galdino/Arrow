import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { meal, dietBoxId } = await req.json()

  const createNewTable = await prisma.dietList.create({
    data: {
      meal,
      dietBox: {
        connect: { id: dietBoxId },
      },
    },
  })

  return new Response(JSON.stringify(createNewTable), {
    status: 201,
  })
}
