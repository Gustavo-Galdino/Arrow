import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { exerciseName, series, volume, exerciseTableId } = await req.json()

    const createdExercise = await prisma.exercise.create({
      data: {
        exerciseName,
        series,
        volume,
        tables: {
          connect: { id: exerciseTableId },
        },
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

    await prisma.exercise.deleteMany({
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
