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

const modules = {
  ufw: {
    script: {
      module: 'ufw',
      label: 'UFW Firewall Configuration',
      description: 'UFW Firewall Configuration. Default allowed ports: 22, 80, 443.',
      isSelected: false
    },
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
    ]
  },
  ssh: {
    script: {
      module: 'ssh',
      label: 'OpenSSH Configuration',
      description: 'OpenSSH Configuration',
      isSelected: false
    },
    advancedConfig: [
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
    ]
  },
  compilers: {
    script: {
      module: 'compilers',
      label: 'Compiler Configuration',
      description: 'Compiler Configuration. Disabled compilers: as, cargo, cc, cc-[0-9]*, clang-[0-9]*, gcc, gcc-[0-9]*, go, make, rustc.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'compilers',
        label: 'Disabled Compilers',
        var: 'compilers',
        description: 'Disabled compilers for the system.',
        type: 'array',
        current: ['as', 'cargo', 'cc', 'cc-[0-9]*', 'clang-[0-9]*', 'gcc', 'gcc-[0-9]*', 'go', 'make', 'rustc'],
        tag: 'list'
      }
    ]
  },
  disableMod: {
    script: {
      module: 'disablemod',
      label: 'Kernel Module Configuration',
      description: 'Kernel Module Configuration. Block blacklisted modules: false. Modules to block: bluetooth, usb-midi, thunderbolt, usb-storage.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'disablemod',
        label: 'Block Blacklisted Modules',
        var: 'block_blacklisted',
        description: 'Block blacklisted modules for the kernel.',
        type: 'boolean',
        current: false,
        tag: 'checkbox'
      },
      {
        module: 'disablemod',
        label: 'Modules Blocklist',
        var: 'misc_modules_blocklist',
        description: 'List of modules to block for the kernel.',
        type: 'array',
        current: ['bluetooth', 'usb-midi', 'thunderbolt', 'usb-storage'],
        tag: 'list'
      }
    ]
  },
  ipv6: {
    script: {
      module: 'ipv6',
      label: 'IPv6 Configuration',
      description: 'IPv6 Configuration. Disable IPv6: false.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'ipv6',
        label: 'Disable IPv6',
        var: 'disable_ipv6',
        description: 'Disable IPv6 for the system.',
        type: 'boolean',
        current: false,
        tag: 'checkbox'
      }
    ]
  },
  packages: {
    script: {
      module: 'packages',
      label: 'System Upgrade and Package Configuration',
      description: 'System Upgrade and Package Configuration. System upgrade: true. Blocked packages: apport*, autofs, avahi*, avahi-*, beep, git, pastebinit, popularity-contest, prelink, rpcbind, rsh*, rsync, talk*, telnet*, tftp*, tuned, whoopsie, xinetd, yp-tools, ypbind. Debian packages to install: acct, apparmor-profiles, apparmor-utils, apt-show-versions, audispd-plugins, auditd, cracklib-runtime, debsums, gnupg2, haveged, libpam-apparmor, libpam-cap, libpam-modules, libpam-pwquality, libpam-tmpdir, lsb-release, needrestart, openssh-server, postfix, rkhunter, rsyslog, sysstat, systemd-journal-remote, tcpd, vlock, wamerican. Ubuntu packages to install: fwupd, secureboot-db, snapd.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'packages',
        label: 'System Upgrade',
        var: 'system_upgrade',
        description: 'Perform a system upgrade.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'packages',
        label: 'Blocked Packages',
        var: 'packages_blocklist',
        description: 'List of packages to block during the upgrade.',
        type: 'array',
        current: [
          'apport*', 'autofs', 'avahi*', 'avahi-*', 'beep', 'git', 'pastebinit',
          'popularity-contest', 'prelink', 'rpcbind', 'rsh*', 'rsync', 'talk*',
          'telnet*', 'tftp*', 'tuned', 'whoopsie', 'xinetd', 'yp-tools', 'ypbind'
        ],
        tag: 'list'
      },
      {
        module: 'packages',
        label: 'Debian Packages to Install',
        var: 'packages_debian',
        description: 'List of Debian packages to install.',
        type: 'array',
        current: [
          'acct', 'apparmor-profiles', 'apparmor-utils', 'apt-show-versions',
          'audispd-plugins', 'auditd', 'cracklib-runtime', 'debsums', 'gnupg2',
          'haveged', 'libpam-apparmor', 'libpam-cap', 'libpam-modules',
          'libpam-pwquality', 'libpam-tmpdir', 'lsb-release', 'needrestart',
          'openssh-server', 'postfix', 'rkhunter', 'rsyslog', 'sysstat',
          'systemd-journal-remote', 'tcpd', 'vlock', 'wamerican'
        ],
        tag: 'list'
      },
      {
        module: 'packages',
        label: 'Ubuntu Packages to Install',
        var: 'packages_ubuntu',
        description: 'List of Ubuntu packages to install.',
        type: 'array',
        current: ['fwupd', 'secureboot-db', 'snapd'],
        tag: 'list'
      }
    ]
  }
}

const getScriptsFromModules = (): any => {
  const result: any = []
  for(const mod in modules) {
      result.push(modules[mod]['script'])
  }
  console.log(result)
  return result
}

const getACFromModules = (): any => {
  const result: any = []
  for(const mod in modules) {
    for(const i in modules[mod]['advancedConfig']) {
      result.push(modules[mod]['advancedConfig'][i])
    }
  }
  console.log(result)
  return result
}
export const useScriptStore = create<ScriptStore>((set) => ({
  script: getScriptsFromModules(),
  advancedConfig: getACFromModules(),
  setScript: (sc): void => set({ script: sc }),
  setAdvancedConfig: (ac): void => set({ advancedConfig: ac })
}))