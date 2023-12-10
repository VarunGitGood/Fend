import { Box, Button, Flex } from '@mantine/core'
import ScriptCard from '@renderer/components/ScriptCard'

const script = [
  {
    module: 'ufw',
    label: 'UFW Firewall Configuration',
    description: 'UFW Firewall Configuration. Default allowed ports: 22, 80, 443.',
    advancedConfig: [
      {
        label: 'Enabled',
        description: 'Enable UFW Firewall.',
        type: 'boolean',
        default: true,
        tag: 'checkbox'
      },
      {
        label: 'Allowed Ports',
        description: 'Allowed ports for UFW Firewall.',
        type: 'array',
        default: ['22', '80', '443'],
        tag: 'list'
      }
    ]
  },
  {
    module: 'ssh',
    label: 'OpenSSH Configuration',
    description: 'OpenSSH Configuration',
    advancedConfig: [
      {
        label: 'sshd_admin_net',
        description: 'Admin networks that should be allowed SSH access to the client',
        type: 'array',
        default: ['192.168.0.0/24', '192.168.1.0/24'],
        tag: 'list'
      },
      {
        label: 'sshd_allow_groups',
        description: 'User groups that should be allowed to access SSH',
        type: 'array',
        default: ['sudo'],
        tag: 'list'
      },
      {
        label: 'sshd_allow_users',
        description: 'users that should be allowed to access ssh',
        type: 'array',
        default: ['ansible_user'],
        tag: 'list'
      },
      {
        label: 'sshd_ports',
        description: 'Ports that sshd should listen on',
        type: 'array',
        default: ['22'],
        tag: 'list'
      }
    ]
  }
]

function CustomScript(): JSX.Element {
  return (
    <div>
      <h1>Custom Script</h1>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {script.map((s) => (
          <ScriptCard key={s.module} {...s} />
        ))}
      </Box>
      <Flex justify="flex-end" gap={15} style={{ marginTop: '2rem' }}>
        <Button variant="subtle">Back</Button>
        <Button variant="filled">Next</Button>
      </Flex>
    </div>
  )
}

export default CustomScript
