import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  // mudar para findMany
  const users = await prisma.user.findFirstOrThrow({
    include: {
      tables: true,
      DiettTable: true,
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
