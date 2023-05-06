'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface TrainingContextType {
  experience: number
  setExperience: Dispatch<SetStateAction<number>>
  handleCheckTask: () => void
}

export const TrainingContext = createContext({} as TrainingContextType)

interface TrainingProviderProps {
  children: ReactNode
}

export function TraningProvider({ children }: TrainingProviderProps) {
  const [experience, setExperience] = useState(0)

  function handleCheckTask() {
    setExperience((state) => state + 10)
  }

  return (
    <TrainingContext.Provider
      value={{ experience, setExperience, handleCheckTask }}
    >
      {children}
    </TrainingContext.Provider>
  )
}
