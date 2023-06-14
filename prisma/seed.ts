import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const foods = [
    {
      category: 'Fontes de Carboidratos',
      foodName: 'Arroz Integral',
      amount: 1,
      carbo: 0.077,
      protein: 0.008,
      fat: 0.002,
    },
    {
      category: 'Fontes de Proteínas',
      foodName: 'Peito de Frango',
      amount: 1,
      carbo: 0,
      protein: 0.062,
      fat: 0.006,
    },
    {
      category: 'Fontes de Carboidratos',
      foodName: 'Batata Doce',
      amount: 1,
      carbo: 0.1,
      protein: 0.01,
      fat: 0,
    },
    {
      category: 'Fontes de Proteínas',
      foodName: 'Claras de Ovos',
      amount: 1,
      carbo: 0.007,
      protein: 0.11,
      fat: 0.002,
    },
    {
      category: 'Fontes de Gorduras',
      foodName: 'Abacate',
      amount: 1,
      carbo: 0.045,
      protein: 0.01,
      fat: 0.075,
    },
    {
      category: 'Fontes de Proteínas',
      foodName: 'Salmao',
      amount: 1,
      carbo: 0,
      protein: 0.143,
      fat: 0.084,
    },
    {
      category: 'Fontes de Gorduras',
      foodName: 'Manteiga de Amendoim',
      amount: 1,
      carbo: 0.094,
      protein: 0.125,
      fat: 0.25,
    },
    {
      category: 'Fontes de Proteínas',
      foodName: 'Iogurte Grego',
      amount: 1,
      carbo: 0.037,
      protein: 0.082,
      fat: 0,
    },
    {
      category: 'Fontes de Carboidratos',
      foodName: 'Quinoa',
      amount: 1,
      carbo: 0.211,
      protein: 0.044,
      fat: 0.019,
    },
    {
      category: 'Fontes de Carboidratos',
      foodName: 'Feijão Preto',
      amount: 1,
      carbo: 0.233,
      protein: 0.087,
      fat: 0.006,
    },
    {
      category: 'Fontes de Proteínas',
      foodName: 'Whey Protein',
      amount: 1,
      carbo: 0.067,
      protein: 0.8,
      fat: 0.033,
    },
    {
      category: 'Fontes de Gorduras',
      foodName: 'Azeite de Oliva',
      amount: 1,
      carbo: 0,
      protein: 0,
      fat: 1.4,
    },
  ]

  for (const food of foods) {
    await prisma.food.create({ data: food })
  }

  console.log('Foods created!')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
