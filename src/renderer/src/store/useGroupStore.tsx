import { create } from 'zustand'

export interface HostDetails {
  ipaddress: string
  alias: string
  lastModified: string
}
export interface Group {
  name: string
  details: HostDetails[]
}

interface GroupStore {
  groupDetails: Group[]
  setGroupDetails: (gd: Group[]) => void
}
export const useGroupStore = create<GroupStore>(
  (set): GroupStore => ({
    groupDetails: [],
    setGroupDetails: (gd: Group[]) => set({ groupDetails: gd })
  })
)
