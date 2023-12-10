import { Box } from '@mantine/core'
import ScriptCard from '@renderer/components/ScriptCard'

const script = [
  {
    module: 'ufw',
    label: 'UFW Firewall Configuration',
    description: 'UFW Firewall Configuration. Default allowed ports: 22, 80, 443.',
    advancedConfig: {
      enabled: {
        label: 'Enabled',
        description: 'Enable UFW Firewall.',
        type: 'boolean',
        default: true,
        tag: 'checkbox'
      },
      allowedPorts: {
        label: 'Allowed Ports',
        description: 'Allowed ports for UFW Firewall.',
        type: 'array',
        default: ['22', '80', '443'],
        tag: 'list'
      }
    }
  },

  {
    module: 'ssh',
    label: 'SSH Configuration',
    description: 'Configure basic SSH settings. Default allowed only for root user.',
    isAdvanceConfig: true
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
    </div>
  )
}

export default CustomScript
