import { Box, Flex, Button, Text, Input, Stack } from '@mantine/core'
import ScriptCard from '@renderer/components/ScriptCard'
import { useScriptStore, AdvancedConfigItem, ModuleItem } from '@renderer/store/useScriptStore'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const ipcRenderer = (window as any).ipcRenderer

function CustomScript(): JSX.Element {
  const { script, advancedConfig } = useScriptStore()
  const navigate = useNavigate()

  const confirmScript = (): void => {
    // TODO
    const customScript: { [key: string]: any } = { active_roles: [] }
    script.forEach((module: ModuleItem) => {
      if (module.isSelected) {
        customScript.active_roles.push(module.module)
      }
    })
    advancedConfig.forEach((config: AdvancedConfigItem) => {
      customScript[config.var] = config.current
    })
    // TODO 
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

    const selectedScript = script
      .filter((s) => s.isSelected)
      .map((s) => s.module)
      .join(',')

    navigate(`/groups?custom=true&selectedScript=${selectedScript}`)
  }

  const handleSaveAndNextClick = (): void => {
    const isModuleSelected = script.some((s) => s.isSelected)
    if (!isModuleSelected) {
      toast.error('Please select at least one module')
      return
    }
    confirmScript()
  }

  return (
    <>
      <Box p="md">
        <Text fz="2.25rem" fw="600" lh="2.75rem">
          Custom Script
        </Text>
        <Input placeholder="Name" mt="2rem" />
        <Stack gap="1rem" mt="3rem">
          {script.map((s) => (
            <ScriptCard key={s.module} {...s} />
          ))}
        </Stack>
        <Flex justify="flex-end" gap={15} mt="2rem">
          <Button variant="subtle">Back</Button>
          <Button variant="filled" onClick={handleSaveAndNextClick}>
            Save & Next
          </Button>
        </Flex>
      </Box>
      <Toaster />
    </>
  )
}

export default CustomScript
