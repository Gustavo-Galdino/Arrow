import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const notes = await prisma.workoutTableNote.findMany({
    include: {
      notes: true,
    },
  })

  return NextResponse.json(notes)
}

export async function POST(req: Request) {
  const { annotationValue, noteTableId } = await req.json()

  const createdExercise = await prisma.note.create({
    data: {
      annotation: annotationValue,
      tables: {
        connect: { id: noteTableId },
      },
    },
  })

  return new Response(JSON.stringify(createdExercise), {
    status: 201,
  })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.note.deleteMany({
    where: {
      id,
    },
  })

  return new Response(JSON.stringify('OK'), {
    status: 200,
  })
}
