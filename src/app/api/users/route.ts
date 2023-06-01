import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' })
  }

  const users = await prisma.user.findMany({
    where: {
      email: session.user?.email,
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
      dietTable: true,
    },
  })

  return NextResponse.json(users)
}

export async function PATCH(req: Request) {
  const { userId, updateNivel } = await req.json()

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      nivel: updateNivel,
    },
  })

  return NextResponse.json(updatedUser)
}

export async function POST(req: Request) {
  try {
    const { WorkoutTableExercise, title } = await req.json()

    const createdExercise = await prisma.workoutTableExercise.create({
      data: {
        title,
        WorkoutTable: { connect: { id: WorkoutTableExercise } },
      },
    })

    return new Response(JSON.stringify(createdExercise), {
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
