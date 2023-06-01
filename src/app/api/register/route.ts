import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export interface UserProps {
  id: string
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = (await request.json()) as UserProps

    const hashedPassword = await hash(password, 12)
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        experience: 0,
        nivel: 0,
        workoutTable: { create: {} },
        dietTable: { create: {} },
      },
    })

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    })
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: 'error', message: error.message }),
      {
        status: 500,
      },
    )
  }
}
