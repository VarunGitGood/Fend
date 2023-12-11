import { create } from 'zustand'

export interface GroupDetail {
  name: string
  details: {
    ipaddress: string
    alias?: string
  }[]
}

interface GroupStore {
  groupDetails: GroupDetail[]
  setGroupDetails: (gd: GroupDetail[]) => void
}
export const useGroupStore = create<GroupStore>((set) => ({
  groupDetails: [
    {
      name: 'Web Server',
      details: []
    },
    {
      name: 'Work Station',
      details: []
    }
  ],
  setGroupDetails: (gd: GroupDetail[]): void => set({ groupDetails: gd })
}))
