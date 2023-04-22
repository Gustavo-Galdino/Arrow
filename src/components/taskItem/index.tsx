import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, X } from 'phosphor-react'

interface Task {
  name: string
  series: number
  volume: number
}

interface ExerciseItemProps {
  task: Task
  onRemove: () => void
}

export function TaskItem({ task, onRemove }: ExerciseItemProps) {
  return (
    <li
      key={crypto.randomUUID()}
      className="border-b-2 border-zinc-500 px-1 flex items-center justify-between"
    >
      <div className="flex items-center gap-2 w-1/3">
        <Checkbox.Root
          className="w-4 h-4 border border-gray-300 rounded focus:ring-blue-500 flex items-center justify-center"
          id={task.name}
        >
          <Checkbox.Indicator>
            <Check color="white" size={12} weight="bold" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor={task.name} className="w-full text-base">
          {task.name}
        </label>
      </div>
      <div>
        <p>
          Series: {task.series} / {task.volume}
        </p>
      </div>
      <button onClick={onRemove}>
        <X weight="bold" className="text-red-500" />
      </button>
    </li>
  )
}
