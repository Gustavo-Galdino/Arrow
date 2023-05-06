'use client'

import { TrainingContext } from '@/context/trainingContext'
import * as Progress from '@radix-ui/react-progress'
import { useContext, useEffect, useState } from 'react'

interface GeneralProps {
  TablesAmout: number
  userId: string
  nivel: number
  experiencee: number
}

export function General({
  userId,
  TablesAmout,
  nivel,
  experiencee,
}: GeneralProps) {
  const { experience, setExperience } = useContext(TrainingContext)
  const [updateNivel, setUpdateNivel] = useState(nivel)

  useEffect(() => {
    setExperience(experiencee)
  }, [setExperience, experiencee])

  const [exp, setExp] = useState(100 * nivel)

  const [progress, setProgress] = useState(0)

  console.log(updateNivel)

  useEffect(() => {
    setProgress((experience / exp) * 100)
  }, [exp, experience])

  async function update() {
    if (progress === 100) {
      setUpdateNivel((state) => state + 1)
      await fetch('http://localhost:3000/api/users', {
        method: 'PATCH',
        body: JSON.stringify({
          userId,
          updateNivel,
        }),
      })

      setExp(100 * nivel)
      setExperience(0)
    }
  }

  update()

  return (
    <article className="border-l-2 border-zinc-500 px-10 w-2/4">
      <section className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold border-b-2 pb-2 border-zinc-500">
          Skills
        </h1>
        <div className="flex flex-col gap-1">
          <p>Nivel {updateNivel}</p>
          <Progress.Root
            className="relative overflow-hidden bg-zinc-100 w-full h-2 rounded-full"
            value={progress}
          >
            <Progress.Indicator
              className="w-full h-full bg-green-400 transition-transform"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>
        </div>

        <p>0 / {TablesAmout} Treinos concluidos</p>
        <p>2 semans de treinos completas</p>
        <p>50 treinos feitos</p>
      </section>

      <section className="flex flex-col gap-3 mt-10">
        <h2 className="text-2xl font-semibold border-b-2 pb-2 border-zinc-500">
          Conquistas
        </h2>
        <div className="flex gap-4 flex-wrap">
          <div className="border rounded-full w-10 h-10 bg-zinc-300" />
          <div className="border rounded-full w-10 h-10 bg-zinc-300" />
          <div className="border rounded-full w-10 h-10 bg-zinc-300" />
          <div className="border rounded-full w-10 h-10 bg-zinc-300" />
          <div className="border rounded-full w-10 h-10 bg-zinc-300" />
          <div className="border rounded-full w-10 h-10 bg-zinc-300" />
        </div>
      </section>
    </article>
  )
}
