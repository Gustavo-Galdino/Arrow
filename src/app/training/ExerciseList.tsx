import { DeleteModal } from '@/components/ButtonDelete'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Annotation } from './Annotation'

interface ExerciseListProps {
  name: string
  series: number
  volume: number
  exerciseId: string
  annotation: string
}

export function ExerciseList({
  exerciseId,
  name,
  series,
  volume,
  annotation,
}: ExerciseListProps) {
  const [open, setOpen] = useState(false)

  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value={name} className="mb-4 last:mb-0">
        <Accordion.Trigger asChild>
          <div
            onClick={() => setOpen(!open)}
            className="box-border grid grid-cols-3 items-center justify-between gap-2 rounded-md border border-zinc-50 px-2 py-1.5 text-sm transition-colors duration-200 ease-in-out hover:bg-zinc-400 dark:border-zinc-500 dark:hover:bg-zinc-500 sm:text-base"
          >
            <div className="flex items-center gap-1">
              <div className="cursor-pointer">
                {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              <strong className="overflow-hidden font-normal">{name}</strong>
            </div>
            <span className="justify-self-end">
              <span className="text-xs text-zinc-700 dark:text-zinc-400">
                Series:
              </span>{' '}
              {series} / {volume}
            </span>
            <div className="flex gap-2 justify-self-end">
              <DeleteModal
                exerciseId={exerciseId}
                title="Deletar Exercicio?"
                description="Ao deleter o exercicio sera apagado permanentemente"
                whereApi="exercise"
              />
            </div>
          </div>
        </Accordion.Trigger>
        <Accordion.Content className="mt-1 rounded bg-gray-200 px-6 py-4 shadow-inner dark:bg-zinc-500">
          <Annotation note={annotation} exerciseId={exerciseId} />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
