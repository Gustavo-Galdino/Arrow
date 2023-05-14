import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const tables = await prisma.dietBox.findMany({
    include: {
      DietList: {
        include: {
          food: true,
        },
      },
    },
  })

  return NextResponse.json(tables)
}
