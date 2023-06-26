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
            className="flex items-center justify-between rounded-md bg-zinc-100 px-2 py-1.5 text-sm hover:bg-zinc-400 dark:border-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-500 sm:text-base"
          >
            <div className="flex items-center gap-1">
              <div className="cursor-pointer">
                {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
              <strong className="overflow-hidden font-normal">{name}</strong>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span>
                Series: {series} / {volume}
              </span>
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
