import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const tables = await prisma.dietBox.findMany({
    include: {
      dietList: {
        include: {
          food: true,
        },
      },
    },
  })

  return NextResponse.json(tables)
}

export async function POST(req: Request) {
  const { dietTableId, title } = await req.json()

  const createNewTable = await prisma.dietBox.create({
    data: {
      dietTableId,
      title,
    },
  })

  return new Response(JSON.stringify(createNewTable), {
    status: 201,
  })
}
