import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { tableName, userId } = await req.json()

  const createExerciseTable = await prisma.workoutTableExercise.create({
    data: {},
  })

  const createNoteTable = await prisma.workoutTableNote.create({ data: {} })

  const createdExercise = await prisma.workoutTable.create({
    data: {
      tableName,
      userId,
      workoutTableExerciseId: createExerciseTable.id,
      workoutTableNoteId: createNoteTable.id,
    },
  })

  return new Response(JSON.stringify(createdExercise), {
    status: 201,
  })
}

export async function GET() {
  const tables = await prisma.workoutTable.findMany()

  return NextResponse.json(tables)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.workoutTable.deleteMany({
    where: {
      id,
    },
  })

  return new Response(JSON.stringify('OK'), {
    status: 200,
  })
}
