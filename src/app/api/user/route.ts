import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function GET(req: Request) {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        userId,
      },
      include: {
        workoutTable: {
          include: {
            WorkoutTableExercise: {
              include: {
                exercise: true,
              },
            },
          },
        },
        dietTable: {
          include: {
            dietBox: {
              include: {
                dietList: {
                  include: {
                    food: {
                      include: {
                        food: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        stoke: {
          include: {
            food: true,
          },
        },
      },
    })

    return new Response(JSON.stringify(user), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: 'error', message: error.message }),
      {
        status: 500,
      },
    )
  }
}

export async function POST(req: Request) {
  const { userId, weight, height, age, goal } = await req.json()
  try {
    await prisma.user.create({
      data: {
        userId,
        weight,
        height,
        age,
        goal,
        dietTable: { create: {} },
        stoke: { create: {} },
        workoutTable: { create: {} },
      },
    })

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: 'error', message: error.message }),
      {
        status: 500,
      },
    )
  }
}

export async function PATCH(req: Request) {
  const { goal, weight, userId } = await req.json()

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        goal,
        weight,
      },
    })

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ status: 'error', message: error.message }),
      {
        status: 500,
      },
    )
  }
}
