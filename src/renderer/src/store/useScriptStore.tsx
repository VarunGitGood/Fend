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

export interface MyScriptItem {
  scriptName: string
  scriptDescription: string
  scriptOSVersion: string
  myConfig: ModuleItem[]
  ansibleConfig?: { [key: string]: any }
}

interface ScriptStore {
  script: ModuleItem[]
  myScripts: MyScriptItem[]
  advancedConfig: AdvancedConfigItem[]
  setScript: (sc: ModuleItem[]) => void
  setMyScripts: (ms: MyScriptItem[]) => void
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
      }
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
      description:
        'Compiler Configuration. Disabled compilers: as, cargo, cc, cc-[0-9]*, clang-[0-9]*, gcc, gcc-[0-9]*, go, make, rustc.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'compilers',
        label: 'Disabled Compilers',
        var: 'compilers',
        description: 'Disabled compilers for the system.',
        type: 'array',
        current: [
          'as',
          'cargo',
          'cc',
          'cc-[0-9]*',
          'clang-[0-9]*',
          'gcc',
          'gcc-[0-9]*',
          'go',
          'make',
          'rustc'
        ],
        tag: 'list'
      }
    ]
  },
  disableMod: {
    script: {
      module: 'disablemod',
      label: 'Kernel Module Configuration',
      description:
        'Kernel Module Configuration. Block blacklisted modules: false. Modules to block: bluetooth, usb-midi, thunderbolt, usb-storage.',
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
      description:
        'System Upgrade and Package Configuration. System upgrade: true. Blocked packages: apport*, autofs, avahi*, avahi-*, beep, git, pastebinit, popularity-contest, prelink, rpcbind, rsh*, rsync, talk*, telnet*, tftp*, tuned, whoopsie, xinetd, yp-tools, ypbind. Debian packages to install: acct, apparmor-profiles, apparmor-utils, apt-show-versions, audispd-plugins, auditd, cracklib-runtime, debsums, gnupg2, haveged, libpam-apparmor, libpam-cap, libpam-modules, libpam-pwquality, libpam-tmpdir, lsb-release, needrestart, openssh-server, postfix, rkhunter, rsyslog, sysstat, systemd-journal-remote, tcpd, vlock, wamerican. Ubuntu packages to install: fwupd, secureboot-db, snapd.',
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
          'apport*',
          'autofs',
          'avahi*',
          'avahi-*',
          'beep',
          'git',
          'pastebinit',
          'popularity-contest',
          'prelink',
          'rpcbind',
          'rsh*',
          'rsync',
          'talk*',
          'telnet*',
          'tftp*',
          'tuned',
          'whoopsie',
          'xinetd',
          'yp-tools',
          'ypbind'
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
          'acct',
          'apparmor-profiles',
          'apparmor-utils',
          'apt-show-versions',
          'audispd-plugins',
          'auditd',
          'cracklib-runtime',
          'debsums',
          'gnupg2',
          'haveged',
          'libpam-apparmor',
          'libpam-cap',
          'libpam-modules',
          'libpam-pwquality',
          'libpam-tmpdir',
          'lsb-release',
          'needrestart',
          'openssh-server',
          'postfix',
          'rkhunter',
          'rsyslog',
          'sysstat',
          'systemd-journal-remote',
          'tcpd',
          'vlock',
          'wamerican'
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
  },
  loginDefs: {
    script: {
      module: 'logindefs',
      label: 'Login Definitions Configuration',
      description:
        'Login Definitions Configuration. Login retries: 5, Login timeout: 60, Password max days: 60, Password min days: 1, Password warn age: 7.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'logindefs',
        label: 'Login Retries',
        var: 'login_defs_login_retries',
        description: 'Number of login retries.',
        type: 'number',
        current: 5,
        tag: 'number'
      },
      {
        module: 'logindefs',
        label: 'Login Timeout',
        var: 'login_defs_login_timeout',
        description: 'Login timeout in seconds.',
        type: 'number',
        current: 60,
        tag: 'number'
      },
      {
        module: 'logindefs',
        label: 'Password Max Days',
        var: 'login_defs_pass_max_days',
        description: 'Maximum number of days a password may be used.',
        type: 'number',
        current: 60,
        tag: 'number'
      },
      {
        module: 'logindefs',
        label: 'Password Min Days',
        var: 'login_defs_pass_min_days',
        description: 'Minimum number of days allowed between password changes.',
        type: 'number',
        current: 1,
        tag: 'number'
      },
      {
        module: 'logindefs',
        label: 'Password Warn Age',
        var: 'login_defs_pass_warn_age',
        description: 'Number of days warning given before password expiration.',
        type: 'number',
        current: 7,
        tag: 'number'
      }
    ]
  },
  password: {
    script: {
      module: 'password',
      label: 'Password Configuration',
      description: 'Password Configuration. Faillock enabled: true. pwquality settings enforced.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'password',
        label: 'Faillock Configuration',
        var: 'faillock_enable',
        description: 'Enable faillock for account lockout.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'Faillock Admin Group',
        var: 'faillock_admin_group',
        description: 'Admin group for faillock (empty array by default).',
        type: 'array',
        current: [],
        tag: 'list'
      },
      {
        module: 'password',
        label: 'Faillock Audit',
        var: 'faillock_audit',
        description: 'Enable faillock audit.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'Faillock Deny',
        var: 'faillock_deny',
        description: 'Number of attempts before account is denied.',
        type: 'number',
        current: 5,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'Faillock Directory',
        var: 'faillock_dir',
        description: 'Directory to store faillock files.',
        type: 'string',
        current: '/var/run/faillock',
        tag: 'text'
      },
      {
        module: 'password',
        label: 'Faillock Even Deny Root',
        var: 'faillock_even_deny_root',
        description: 'Even deny root user after failed attempts.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'Faillock Fail Interval',
        var: 'faillock_fail_interval',
        description: 'Time window (in seconds) for counting failed login attempts.',
        type: 'number',
        current: 900,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'Faillock Local Users Only',
        var: 'faillock_local_users_only',
        description: 'Count only local users for faillock.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'Faillock No Log Info',
        var: 'faillock_no_log_info',
        description: 'Do not log information about user locking/unlocking.',
        type: 'boolean',
        current: false,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'Faillock No Delay',
        var: 'faillock_nodelay',
        description: 'Do not add a delay after a failed login attempt.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'Faillock Root Unlock Time',
        var: 'faillock_root_unlock_time',
        description: 'Time (in seconds) to keep root account locked after successful login.',
        type: 'number',
        current: 600,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'Faillock Silent',
        var: 'faillock_silent',
        description: 'Do not display information about failed attempts to the user.',
        type: 'boolean',
        current: false,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'Faillock Unlock Time',
        var: 'faillock_unlock_time',
        description: 'Time (in seconds) to keep non-root account locked after successful login.',
        type: 'number',
        current: 600,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'Password Remember',
        var: 'password_remember',
        description: 'Number of passwords to remember.',
        type: 'number',
        current: 5,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Dcredit',
        var: 'pwquality_dcredit',
        description: 'Value for pwquality dcredit.',
        type: 'number',
        current: -1,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Dictcheck',
        var: 'pwquality_dictcheck',
        description: 'Enable or disable pwquality dictcheck.',
        type: 'number',
        current: 1,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Dictpath',
        var: 'pwquality_dictpath',
        description: 'Path to the cracklib dictionaries.',
        type: 'string',
        current: '',
        tag: 'text'
      },
      {
        module: 'password',
        label: 'pwquality Difok',
        var: 'pwquality_difok',
        description:
          'Number of characters in the new password that must not be present in the old password.',
        type: 'number',
        current: 8,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Enforce for Root',
        var: 'pwquality_enforce_for_root',
        description: 'Enforce pwquality settings for the root user.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'pwquality Enforcing',
        var: 'pwquality_enforcing',
        description: 'Enable or disable pwquality enforcing.',
        type: 'number',
        current: 1,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Gecoscheck',
        var: 'pwquality_gecoscheck',
        description: 'Enable or disable pwquality gecoscheck.',
        type: 'number',
        current: 1,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Lcredit',
        var: 'pwquality_lcredit',
        description: 'Value for pwquality lcredit.',
        type: 'number',
        current: -1,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Local Users Only',
        var: 'pwquality_local_users_only',
        description: 'Apply pwquality settings only to local users.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'password',
        label: 'pwquality Maxclassrepeat',
        var: 'pwquality_maxclassrepeat',
        description:
          'Reject passwords which contain more than N consecutive characters of the same class. The default is 0 which means that this check is disabled.',
        type: 'number',
        current: 4,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Maxrepeat',
        var: 'pwquality_maxrepeat',
        description:
          'Reject passwords which contain more than N same consecutive characters. The default is 0 which means that this check is disabled',
        type: 'number',
        current: 3,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Minclass',
        var: 'pwquality_minclass',
        description: 'Minimum number of classes required in the new password.',
        type: 'number',
        current: 4,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Minlen',
        var: 'pwquality_minlen',
        description: 'Minimum acceptable size for the new password.',
        type: 'number',
        current: 15,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Ocredit',
        var: 'pwquality_ocredit',
        description: 'Value for pwquality ocredit.',
        type: 'number',
        current: -1,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Retry',
        var: 'pwquality_retry',
        description: 'Prompt user at most N times before returning with error. The default is 1',
        type: 'number',
        current: 3,
        tag: 'number'
      },
      {
        module: 'password',
        label: 'pwquality Ucredit',
        var: 'pwquality_ucredit',
        description: 'Value for pwquality ucredit.',
        type: 'number',
        current: -1,
        tag: 'number'
      }
    ]
  },
  rkhunter: {
    script: {
      module: 'rkhunter',
      label: 'Enable and configure rkhunter',
      description: 'Enable and configure rkhunter',
      isSelected: false
    }
  },
  users: {
    script: {
      module: 'users',
      label: 'Users Configuration',
      description: 'Users Configuration. Delete specified users.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'users',
        label: 'Delete Users',
        var: 'delete_users',
        description: 'List of users to be deleted.',
        type: 'array',
        current: ['games', 'gnats', 'irc', 'list', 'news', 'sync', 'uucp'],
        tag: 'list'
      }
    ]
  },
  lockroot: {
    script: {
      module: 'lockroot',
      label: 'Lock Root',
      description: 'Lock the user account',
      isSelected: false
    }
  },
  cron: {
    script: {
      module: 'cron',
      label: 'Cron',
      description: 'Set cron, at and crontab permissoins to allow only root access'
    }
  },
  adduser: {
    script: {
      module: 'adduser',
      label: 'adduser',
      description: 'Configure adduser and useradd commands'
    }
  },
  apache: {
    script: {
      module: 'apache',
      label: 'Apache Configuration',
      description: 'Apache Configuration. Customize Apache settings.',
      isSelected: false
    },
    advancedConfig: [
      {
        module: 'apache',
        label: 'Listen IP',
        var: 'apache_listen_ip',
        description: 'IP address Apache should listen on.',
        type: 'string',
        current: '*',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'Listen Port',
        var: 'apache_listen_port',
        description: 'Port Apache should listen on.',
        type: 'number',
        current: 80,
        tag: 'number'
      },
      {
        module: 'apache',
        label: 'Listen Port SSL',
        var: 'apache_listen_port_ssl',
        description: 'Port Apache should listen on for SSL connections.',
        type: 'number',
        current: 443,
        tag: 'number'
      },
      {
        module: 'apache',
        label: 'Create Virtual Hosts',
        var: 'apache_create_vhosts',
        description: 'Create virtual hosts for Apache.',
        type: 'boolean',
        current: true,
        tag: 'checkbox'
      },
      {
        module: 'apache',
        label: 'Virtual Hosts Template',
        var: 'apache_vhosts_template',
        description: 'Template for Apache virtual hosts configuration.',
        type: 'string',
        current: 'vhosts.conf.j2',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'Remove Default Virtual Host',
        var: 'apache_remove_default_vhost',
        description: 'Remove default virtual host on Debian/Ubuntu.',
        type: 'boolean',
        current: false,
        tag: 'checkbox'
      },
      {
        module: 'apache',
        label: 'Allow Override',
        var: 'apache_allow_override',
        description: 'Apache AllowOverride directive.',
        type: 'string',
        current: 'All',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'Apache Options',
        var: 'apache_options',
        description: 'Options for Apache.',
        type: 'string',
        current: '-Indexes +FollowSymLinks',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'SSL Protocol',
        var: 'apache_ssl_protocol',
        description: 'SSL/TLS protocol for Apache.',
        type: 'string',
        current: 'All -SSLv2 -SSLv3',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'SSL Cipher Suite',
        var: 'apache_ssl_cipher_suite',
        description: 'Cipher suite for Apache SSL/TLS.',
        type: 'string',
        current: 'AES256+EECDH:AES256+EDH',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'Enabled Apache Modules',
        var: 'apache_mods_enabled',
        description: 'List of enabled Apache modules.',
        type: 'array',
        current: ['rewrite', 'ssl'],
        tag: 'list'
      },
      {
        module: 'apache',
        label: 'Disabled Apache Modules',
        var: 'apache_mods_disabled',
        description: 'List of disabled Apache modules.',
        type: 'array',
        current: [],
        tag: 'list'
      },
      {
        module: 'apache',
        label: 'Apache State',
        var: 'apache_state',
        description: 'Initial state of Apache. Recommended values: `started` or `stopped`.',
        type: 'string',
        current: 'started',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'Enable Apache',
        var: 'apache_enabled',
        description: 'Initial Apache service status. Recommended values: `yes` or `no`.',
        type: 'string',
        current: 'yes',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'Restart State',
        var: 'apache_restart_state',
        description:
          'Apache state when configuration changes are made. Recommended values: `restarted` or `reloaded`.',
        type: 'string',
        current: 'restarted',
        tag: 'text'
      },
      {
        module: 'apache',
        label: 'Apache Package State',
        var: 'apache_packages_state',
        description: 'Apache package state. Recommended values: `present` or `latest`.',
        type: 'string',
        current: 'present',
        tag: 'text'
      }
    ]
  }
}

const getScriptsFromModules = (): any => {
  const result: any = []
  for (const mod in modules) {
    result.push(modules[mod]['script'])
  }
  return result
}

const getACFromModules = (): any => {
  const result: any = []
  for (const mod in modules) {
    for (const i in modules[mod]['advancedConfig']) {
      result.push(modules[mod]['advancedConfig'][i])
    }
  }
  return result
}

export const useScriptStore = create<ScriptStore>((set) => ({
  script: getScriptsFromModules(),
  myScripts: [],
  advancedConfig: getACFromModules(),
  setScript: (sc): void => set({ script: sc }),
  setMyScripts: (ms): void => set({ myScripts: ms }),
  setAdvancedConfig: (ac): void => set({ advancedConfig: ac })
}))
