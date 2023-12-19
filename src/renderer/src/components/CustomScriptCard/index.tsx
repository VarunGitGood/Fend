import { Box, Flex, Button, Group, Paper, Stack, Text } from '@mantine/core'
import classes from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { MyScriptItem } from '@renderer/store/useScriptStore'
import { IconFileExport } from '@tabler/icons-react'
const ipcRenderer = (window as any).ipcRenderer

interface CustomScriptCardProps {
  script: MyScriptItem
}

function Chip({ children }: { children: string }): JSX.Element {
  return (
    <Box bg="#F6F6F6" p="0.125rem 0.5rem" style={{ display: 'inline-block', borderRadius: '1rem' }}>
      <Text fz="0.75rem" fw={500} c="#475467">
        {children}
      </Text>
    </Box>
  )
}
export default function CustomScriptCard({ script }: CustomScriptCardProps): JSX.Element {
  const navigate = useNavigate()

  const handleExport = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    ipcRenderer.send('export-script', script.scriptName)
  }

  return (
    <>
      <Paper className={classes.card} p="xl">
        <Stack justify="flex-start" gap="0.75rem">
          <Text c="#101828" fz="1.125rem" fw={600} lh="1.50rem">
            {script.scriptName}
          </Text>
          <Text c="#475467" fz="0.875rem" fw={400} lh="1.50rem">
            {script.scriptDescription}
          </Text>
          <Group gap="0.5rem">
            {script.myConfig &&
              script.myConfig.map((config) => (
                <Chip key={config.module}>{config.module.toUpperCase()}</Chip>
              ))}
          </Group>
          <Flex mt="1rem" w="100%" gap="1rem">
            <Button
              size="md"
              fullWidth
              onClick={() =>
                navigate(
                  `/groups?custom=true&scriptName=${script.scriptName}&scriptDescription=${script.scriptDescription}`
                )
              }
            >
              Run Script
            </Button>
            <Button
              leftSection={<IconFileExport size={28} strokeWidth={2} />}
              className={classes.btn}
              c="rgba(0, 0, 0, 0.90)"
              variant="outline"
              size="md"
              fullWidth
              onClick={handleExport}
            >
              Export
            </Button>
          </Flex>
        </Stack>
      </Paper>
    </>
  )
}
