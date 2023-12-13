import { Box, Flex, Stack, Button, Text, Input } from '@mantine/core'
import ScriptCard from '@renderer/components/ScriptCard'
import { useScriptStore, AdvancedConfigItem, ModuleItem } from '@renderer/store/useScriptStore'
const ipcRenderer = (window as any).ipcRenderer

function CustomScript(): JSX.Element {
  const { script, advancedConfig } = useScriptStore()

  const confirmScript = (): void => {
    const customScript: { [key: string]: any } = {
      active_roles: []
    }
    script.map((module: ModuleItem) => {
      if (module.current) {
        customScript.active_roles.push(module.module)
      }
    })
    advancedConfig.map((config: AdvancedConfigItem) => {
      customScript[config.var] = config.current
    })
    console.log(customScript)

    const data = {
      scriptName: 'Custom-Script',
      script: customScript
    }
    ipcRenderer.send('generate-script', data)
    ipcRenderer.on('generate-script-success', (_event, arg) => {
      console.log(arg)
    })
    ipcRenderer.on('generate-script-error', (_event, arg) => {
      console.error(arg)
    })
  }

  return (
    <Box p="md">
      <Text fz="2.25rem" fw={400}>
        Custom Script
      </Text>
      <Input placeholder="Name" />
      <Stack gap="1rem" mt="3rem">
        {script.map((s) => (
          <ScriptCard key={s.module} {...s} />
        ))}
      </Stack>
      <Flex justify="flex-end" gap={15} style={{ marginTop: '2rem' }}>
        <Button variant="subtle">Back</Button>
        <Button variant="filled" onClick={confirmScript}>
          Save & Next
        </Button>
      </Flex>
    </Box>
  )
}

export default CustomScript
