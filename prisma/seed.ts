import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const foods = [
    {
      category: 'Grãos',
      foodName: 'Arroz Integral',
      amount: 1000,
      carbo: 77,
      protein: 8,
      fat: 2,
    },
    {
      category: 'Carnes',
      foodName: 'Peito de Frango',
      amount: 500,
      carbo: 0,
      protein: 31,
      fat: 3,
    },
    {
      category: 'Vegetais',
      foodName: 'Brócolis',
      amount: 400,
      carbo: 7,
      protein: 2.8,
      fat: 0.4,
    },
    {
      category: 'Grãos',
      foodName: 'Aveia',
      amount: 500,
      carbo: 68,
      protein: 13,
      fat: 7,
    },
    {
      category: 'Frutas',
      foodName: 'Banana',
      amount: 150,
      carbo: 22,
      protein: 1,
      fat: 0,
    },
    {
      category: 'Laticínios',
      foodName: 'Ovo',
      amount: 50,
      carbo: 1,
      protein: 6,
      fat: 5,
    },
    {
      category: 'Tubérculos',
      foodName: 'Batata Doce',
      amount: 200,
      carbo: 20,
      protein: 2,
      fat: 0,
    },
    {
      category: 'Vegetais',
      foodName: 'Espinafre',
      amount: 30,
      carbo: 1,
      protein: 1,
      fat: 0,
    },
    {
      category: 'Carnes',
      foodName: 'Tofu',
      amount: 150,
      carbo: 2,
      protein: 8,
      fat: 5,
    },
    {
      category: 'Frutas',
      foodName: 'Abacate',
      amount: 200,
      carbo: 9,
      protein: 2,
      fat: 15,
    },
    {
      category: 'Frutas',
      foodName: 'Laranja',
      amount: 160,
      carbo: 15,
      protein: 1,
      fat: 0,
    },
    {
      category: 'Carnes',
      foodName: 'Salmao',
      amount: 154,
      carbo: 0,
      protein: 22,
      fat: 13,
    },
    {
      category: 'Legumes',
      foodName: 'Manteiga de Amendoim',
      amount: 32,
      carbo: 3,
      protein: 4,
      fat: 8,
    },
    {
      category: 'Laticínios',
      foodName: 'Iogurte Grego',
      amount: 245,
      carbo: 9,
      protein: 20,
      fat: 0,
    },
    {
      category: 'Legumes',
      foodName: 'Lentilha',
      amount: 200,
      carbo: 40,
      protein: 18,
      fat: 1,
    },
    {
      category: 'Grãos',
      foodName: 'Quinoa',
      amount: 185,
      carbo: 39,
      protein: 8.1,
      fat: 3.6,
    },
    {
      category: 'Legumes',
      foodName: 'Feijão Preto',
      amount: 172,
      carbo: 40,
      protein: 15,
      fat: 1,
    },
    {
      category: 'Vegetais',
      foodName: 'Cenoura',
      amount: 61,
      carbo: 14,
      protein: 1,
      fat: 0,
    },
    {
      category: 'Vegetais',
      foodName: 'Alho',
      amount: 3,
      carbo: 1,
      protein: 0,
      fat: 0,
    },
    {
      category: 'Vegetais',
      foodName: 'Tomate',
      amount: 123,
      carbo: 5,
      protein: 1,
      fat: 0,
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
