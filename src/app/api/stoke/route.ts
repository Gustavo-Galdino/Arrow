import { prisma } from '@/lib/prisma'
// import { auth } from '@clerk/nextjs'

// export async function GET() {
//   const { userId } = auth()

//   if (!userId) {
//     return new Response('Unauthorized', { status: 401 })
//   }

//   try {
//     const foods = await prisma.stoke.findMany({
//       where: {
//         User: {
//           userId,
//         },
//       },
//       include: {
//         food: true,
//       },
//     })

//     return new Response(JSON.stringify(foods), { status: 200 })
//   } catch (error: any) {
//     return new Response(
//       JSON.stringify({ status: 'error', message: error.message }),
//       {
//         status: 500,
//       },
//     )
//   }
// }

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    await prisma.foodInGrams.deleteMany({
      where: {
        foodId: id,
      },
    })

    const food = await prisma.food.delete({
      where: {
        id,
      },
    })

    return new Response(JSON.stringify(food), {
      status: 200,
    })
  } catch (error) {
    console.error(error)

    return new Response(JSON.stringify(error), {
      status: 500,
    })
  }
}
