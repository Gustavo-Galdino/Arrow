import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tables = await prisma.dietTable.findMany({
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
  })

  return NextResponse.json(tables)
}

export async function POST(req: Request) {
  const { dietTableId, title } = await req.json()

  const createNewTable = await prisma.dietBox.create({
    data: {
      title,
      dietTableId,
    },
  })

  return new Response(JSON.stringify(createNewTable), {
    status: 201,
  })
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' })
  }

  const { meal, id, time } = await req.json()

  const createNewTable = await prisma.dietBox.update({
    where: {
      id,
    },
    data: {
      dietList: {
        create: {
          meal,
          time,
        },
      },
    },
  })

  return new Response(JSON.stringify(createNewTable), {
    status: 201,
  })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.dietList.deleteMany({
    where: {
      dietBoxId: id,
    },
  })

  await prisma.dietBox.delete({
    where: {
      id,
    },
  })

  return new Response(JSON.stringify('OK'), {
    status: 200,
  })
}
