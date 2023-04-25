'use client'

import { X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface AnnotationType {
  annotation: string
}

export function Annotations() {
  const [annotations, setAnnotations] = useState<AnnotationType[]>([])
  const { register, handleSubmit, getValues, reset } = useForm()

  function handleNewAnnotation() {
    const annotationContent = getValues('annotations')

    if (annotationContent) {
      setAnnotations((state) => [...state, { annotation: annotationContent }])
      reset()
    }
  }
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-5">Anotações</h2>

      <div className="flex flex-col gap-4">
        {annotations.length > 0 &&
          annotations.map((annotation) => (
            <div
              key={annotation.annotation}
              className="flex items-center justify-between border-b-2 border-zinc-500 px-1"
            >
              <p className="truncate w-11/12">{annotation.annotation}</p>
              <X weight="bold" className="text-red-500" />
            </div>
          ))}

        <form onSubmit={handleSubmit(handleNewAnnotation)}>
          <textarea
            id="annotation"
            rows={4}
            placeholder="Digite sua anotação"
            {...register('annotations')}
            className="p-2 w-full text-sm rounded border bg-zinc-800 border-zinc-600 outline-none"
          />
          <button
            type="submit"
            className="py-3 px-5 mt-1 text-xs font-medium text-center bg-orange-700 rounded"
          >
            Adicionar
          </button>
        </form>
      </div>
    </section>
  )
}
