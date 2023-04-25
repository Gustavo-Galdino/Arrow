import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  // mudar para findMany
  const users = await prisma.user.findFirstOrThrow({
    include: {
      tables: true,
    },
  })

  return NextResponse.json(users)
}
