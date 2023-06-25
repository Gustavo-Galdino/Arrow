import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { title, workoutTableId } = await req.json()
  try {
    await prisma.workoutTableExercise.create({
      data: {
        title,
        WorkoutTable: { connect: { id: workoutTableId } },
      },
    })

    return new Response(JSON.stringify('ok'), {
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
  try {
    const { completed, WorkoutTableExerciseId, nivel, experience, userId } =
      await req.json()

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        nivel,
        experience,
      },
    })

    await prisma.workoutTableExercise.update({
      where: {
        id: WorkoutTableExerciseId,
      },
      data: {
        completed,
      },
    })

    return new Response(JSON.stringify('ok'), {
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

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    await prisma.workoutTableExercise.deleteMany({
      where: {
        id,
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
