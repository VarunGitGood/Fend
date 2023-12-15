/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

export interface AdvancedConfigItem {
  module: string
  label: string
  var: string
  description: string
  type: string
  current: any
  tag: string
}

export interface ModuleItem {
  module: string
  label: string
  description: string
  isSelected: boolean
}
interface ScriptStore {
  script: ModuleItem[]
  advancedConfig: AdvancedConfigItem[]
  setScript: (sc: ModuleItem[]) => void
  setAdvancedConfig: (ac: AdvancedConfigItem[]) => void
}

export const useScriptStore = create<ScriptStore>((set) => ({
  script: [
    {
      module: 'ufw',
      label: 'UFW Firewall Configuration',
      description: 'UFW Firewall Configuration. Default allowed ports: 22, 80, 443.',
      isSelected: false
    },
    {
      module: 'ssh',
      label: 'OpenSSH Configuration',
      description: 'OpenSSH Configuration',
      isSelected: false
    }
  ],
  advancedConfig: [
    {
      module: 'ufw',
      label: 'Enabled',
      var: 'ufw_enabled',
      description: 'Enable UFW Firewall.',
      type: 'boolean',
      current: true,
      tag: 'checkbox'
    },
    {
      module: 'ufw',
      label: 'Allowed Ports',
      var: 'ufw_outgoing_traffic',
      description: 'Allowed ports for UFW Firewall.',
      type: 'array',
      current: ['22', '80', '443'],
      tag: 'list'
    },
    {
      module: 'ssh',
      label: 'Admin Networks',
      var: 'sshd_admin_net',
      description: 'Admin networks that should be allowed SSH access to the client',
      type: 'array',
      current: ['192.168.0.0/24', '192.168.1.0/24'],
      tag: 'list'
    },
    {
      module: 'ssh',
      label: 'Allowed Groups',
      var: 'sshd_allow_groups',
      description: 'User groups that should be allowed to access SSH',
      type: 'array',
      current: ['sudo'],
      tag: 'list'
    },
    {
      module: 'ssh',
      label: 'Allowed Users',
      var: 'sshd_allow_users',
      description: 'users that should be allowed to access ssh',
      type: 'array',
      current: ['root', 'ansible_user'],
      tag: 'list'
    },
    {
      module: 'ssh',
      label: 'Listening Ports',
      var: 'sshd_ports',
      description: 'Ports that sshd should listen on',
      type: 'array',
      current: ['22'],
      tag: 'list'
    }
  ],
  setScript: (sc): void => set({ script: sc }),
  setAdvancedConfig: (ac): void => set({ advancedConfig: ac })
}))
