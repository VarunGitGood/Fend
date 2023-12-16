import { create } from 'zustand'

export interface HostDetails {
  ipaddress: string
  alias: string
  lastModified: string
}
export interface Group {
  groupName: string
  hosts: HostDetails[]
}

interface RunStore {
  scriptName: string
  groupNames: Group[]
  timeStamp: string
  scriptOutput?: string
  scriptError?: string
  setScriptName: (scriptName: string) => void
  setgroupNames: (gd: [Group]) => void
  setTimeStamp: (timeStamp: string) => void
  setScriptOutput: (scriptOutput: string) => void
  setScriptError: (scriptError: string) => void
}

export const useRunStore = create<RunStore>(
  (set): RunStore => ({
    scriptName: '',
    groupNames: [],
    timeStamp: '',
    scriptOutput: '',
    scriptError: '',
    setScriptName: (scriptName: string) => set({ scriptName }),
    setgroupNames: (groupNames: Group[]) => set({ groupNames }),
    setTimeStamp: (timeStamp: string) => set({ timeStamp }),
    setScriptOutput: (scriptOutput: string) => set({ scriptOutput }),
    setScriptError: (scriptError: string) => set({ scriptError })
  })
)
