import { Box, Flex, Stack, Button, Text, Input } from '@mantine/core'
import ScriptCard from '@renderer/components/ScriptCard'
import { useScriptStore, AdvancedConfigItem, ModuleItem } from '@renderer/store/useScriptStore'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const ipcRenderer = (window as any).ipcRenderer

function CustomScript(): JSX.Element {
  const { script, advancedConfig } = useScriptStore()
  console.log(script)
  const navigate = useNavigate()

  const confirmScript = (): void => {
    const customScript: { [key: string]: any } = {
      active_roles: []
    }
    script.map((module: ModuleItem) => {
      if (module.isSelected) {
        customScript.active_roles.push(module.module)
      }
    })
    advancedConfig.map((config: AdvancedConfigItem) => {
      customScript[config.var] = config.current
    })

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

    navigate('/groups?custom=true')
  }

  return (
    <>
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
          <Button
            variant="filled"
            onClick={(): void => {
              let flag = false
              script.map((s) => {
                if (s.isSelected) {
                  flag = true
                  return
                }
              })
              if (!flag) {
                toast.error('Please select at least one module')
                return
              }
              confirmScript()
            }}
          >
            Save & Next
          </Button>
        </Flex>
      </Box>
      <Toaster />
    </>
  )
}

export default CustomScript
