import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const tables = await prisma.workoutTableExercise.findMany({
    include: {
      exercise: true,
    },
  })

  return NextResponse.json(tables)
}

export async function POST(req: Request) {
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
}
