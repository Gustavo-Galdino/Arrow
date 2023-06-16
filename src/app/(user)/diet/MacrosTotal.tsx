import { DietBox } from '@/context/store'
import React from 'react'

interface MacrosTotalProps {
  dietBox: DietBox
}

export function MacrosTotal({ dietBox }: MacrosTotalProps) {
  let totalCarbo = 0
  let totalProtein = 0
  let totalFat = 0
  const objetivo = 3000

  dietBox.dietList.forEach((dietList) => {
    dietList.food.forEach((food) => {
      totalCarbo += (food.food.carbo * food.grams) / 100
      totalProtein += (food.food.protein * food.grams) / 100
      totalFat += (food.food.fat * food.grams) / 100
    })
  })

  // Convertendo gramas para calorias
  const totalCarboCal = totalCarbo * 4
  const totalProteinCal = totalProtein * 4
  const totalFatCal = totalFat * 9
  const totalCal = totalCarboCal + totalProteinCal + totalFatCal

  console.log(totalFat)

  // Calculando porcentagens
  const percentCarbo = (totalCarboCal / objetivo) * 100
  const percentProtein = (totalProteinCal / objetivo) * 100
  const percentFat = (totalFatCal / objetivo) * 100

  return (
    <div className="my-5 flex flex-col items-center text-center text-white">
      <h2 className="text-2xl font-bold">Total Macros: {objetivo} calorias</h2>
      <p className="mt-1 flex items-center justify-center">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-green-500"></span>
        Total Carbo: {totalCarbo}g ({percentCarbo.toFixed(2)}%)
      </p>
      <p className="mt-1 flex items-center justify-center">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-blue-500"></span>
        Total Protein: {totalProtein}g ({percentProtein.toFixed(2)}%)
      </p>
      <p className="mt-1 flex items-center justify-center">
        <span className="mr-2 inline-block h-3 w-3 rounded-full bg-red-500"></span>
        Total Fat: {totalFat}g ({percentFat.toFixed(2)}%)
      </p>
      <div className="mt-3 flex h-2 w-2/4 overflow-hidden rounded border border-gray-500 bg-gray-600">
        <div style={{ width: `${percentCarbo}%` }} className="bg-green-500" />
        <div style={{ width: `${percentProtein}%` }} className="bg-blue-500" />
        <div style={{ width: `${percentFat}%` }} className="bg-red-500" />
      </div>
      <p>
        {totalCal} kcal - restam: {(objetivo - totalCal).toFixed(2)}
      </p>
    </div>
  )
}
