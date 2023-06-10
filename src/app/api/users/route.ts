import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' })
  }

  const users = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user?.email!,
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
                  food: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return NextResponse.json(users)
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' })
  }

  try {
    const user = session.user

    const { experience, nivel, WorkoutTableExerciseId, completed } =
      await req.json()

    const updatedUser = await prisma.user.update({
      where: {
        email: user?.email!,
      },
      data: {
        experience,
        nivel,
      },
    })

    const updateTable = await prisma.workoutTableExercise.update({
      where: {
        id: WorkoutTableExerciseId,
      },
      data: {
        completed,
      },
    })

    return NextResponse.json(`${updatedUser} ${updateTable}`)
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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    await prisma.workoutTableExercise.delete({
      where: {
        id,
      },
      include: {
        exercise: true,
      },
    })

    return new Response(JSON.stringify('OK'), {
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
