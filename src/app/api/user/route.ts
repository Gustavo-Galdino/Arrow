import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { userId } = await req.json()
  try {
    await prisma.user.create({
      data: {
        userId,
        nivel: 1,
        experience: 0,
        dietTable: { create: {} },
        stoke: { create: {} },
        workoutTable: { create: {} },
      },
    })

    return new Response(JSON.stringify({ status: 'ok' }), {
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
