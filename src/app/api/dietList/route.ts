import { prisma } from '@/lib/prisma'

// export async function PATCH(req: Request) {
//   const { id, foodId, grams, amount } = await req.json()

//   const updateTable = await prisma.dietList.update({
//     where: {
//       id,
//     },
//     data: {
//       food: {
//         create: {
//           grams,
//           food: {
//             connect: { id: foodId },
//           },
//         },
//       },
//     },
//   })

//   return new Response(JSON.stringify(updateTable), {
//     status: 201,
//   })
// }

export async function PATCH(req: Request) {
  const { id, meal, time } = await req.json()

  const updateTable = await prisma.dietList.update({
    where: {
      id,
    },
    data: {
      meal,
      time,
    },
  })

  return new Response(JSON.stringify(updateTable), {
    status: 201,
  })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()

  await prisma.dietList.deleteMany({
    where: {
      id,
    },
  })

  return new Response(JSON.stringify('OK'), {
    status: 200,
  })
}
