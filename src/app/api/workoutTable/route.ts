import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await req.json()
  try {
    const tableExist = await prisma.workoutTable.findFirst({
      where: {
        userId,
      },
    })

    if (!tableExist) {
      const createWorkoutTable = await prisma.workoutTable.create({
        data: {
          userId,
        },
      })

      return new Response(JSON.stringify(createWorkoutTable), {
        status: 201,
      })
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: 'error', message: error.message }),
      {
        status: 500,
      },
    )
  }
}
