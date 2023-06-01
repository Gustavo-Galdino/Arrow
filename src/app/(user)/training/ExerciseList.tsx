import { DeleteModal } from '@/components/ButtonDelete'

interface ExerciseListProps {
  name: string
  series: number
  volume: number
  exerciseId: string
}

export function ExerciseList({
  exerciseId,
  name,
  series,
  volume,
}: ExerciseListProps) {
  return (
    <div className="shadown grid grid-cols-3 items-center justify-between gap-4 rounded bg-gray-600 px-2 py-1">
      <strong>{name}</strong>
      <span>
        Series: {series} / {volume}
      </span>

      <div className="flex gap-2 justify-self-end">
        <DeleteModal
          exerciseId={exerciseId}
          title="Deletar Exercicio?"
          description="Ao deleter o exercicio sera apagado permanentemente"
          whereApi="exercises"
        />
      </div>
    </div>
  )
}
