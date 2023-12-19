import { Box, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
const ipcRenderer = (window as any).ipcRenderer

export const SystemInfo = (): React.ReactElement => {
  const [Info, seTInfo] = useState<any>({})
  useEffect(() => {
    ipcRenderer.send('get-system-info')
    ipcRenderer.on('get-system-info-success', (_event, arg) => {
      seTInfo(arg)
    })
  }, [])

  return (
    <Box p="md">
      <Text fz="2.25rem" fw="600" lh="2.75rem">
        System Information
      </Text>
      <Box mb={10} mt="2rem">
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb={2}>
          OS Type
        </Text>
        <Text fz="lg" fw={500}>
          {Info.platform && String(Info.platform).toUpperCase()}
        </Text>
      </Box>
      <Box mb={10}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb={2}>
          Kernel Version
        </Text>
        <Text fz="lg" fw={500}>
          {Info.release && String(Info?.release).toUpperCase()}
        </Text>
      </Box>
      <Box mb={10}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb={2}>
          Host Name
        </Text>
        <Text fz="lg" fw={500}>
          {Info.hostname && String(Info?.hostname)}
        </Text>
      </Box>
      <Box mb={10}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb={2}>
          CPU Model
        </Text>
        <Text fz="lg" fw={500}>
          {Info.cpuInfo && String(Info?.cpuInfo?.model)}
        </Text>
      </Box>
      <Box mb={10}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb={6}>
          Network Interfaces
        </Text>
        <Text fz="lg" fw={500} mb={5}>
          {Info?.networkInterfaces &&
            Object.keys(Info?.networkInterfaces).map((key) => (
              <Box key={key}>
                <Text fz="lg" fw={500}>
                  {String(key) + ': ' + Info?.networkInterfaces[key][0].address}
                </Text>
              </Box>
            ))}
        </Text>
      </Box>
      <Box mb={10}>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed" mb={6}>
          Total Memory (RAM)
        </Text>
        <Text fz="lg" fw={500} mb={5}>
          {Info.totalMemory && Number(Info?.totalMemory) / 1000000000} GB
        </Text>
      </Box>
    </Box>
  )
}
