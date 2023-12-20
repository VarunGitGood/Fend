import { create } from 'zustand'

export interface Run {
  status: 'success' | 'running' | 'error' | ''
  scriptName: string
  scriptDescription: string
  groupNames: string[]
  modules: string[]
  timeStamp: string
  scriptOutput?: string
  scriptError?: string
}

interface RunStore {
  runs: Run[]
  setRuns: (runs: Run[]) => void
}

export const useRunsStore = create<RunStore>(
  (set): RunStore => ({
    runs: [],
    setRuns: (runs: Run[]) => set({ runs })
  })
)
