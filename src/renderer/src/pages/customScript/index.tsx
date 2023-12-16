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

    // navigate(`/groups?custom=true`)
    navigate(`/myScript`)
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
        <Input
          placeholder="Name"
          mt="2rem"
          size="md"
          style={{
            borderRadius: '4px'
          }}
        />
        <Stack gap="1rem" mt="3rem">
          {script.map((s) => (
            <ScriptCard key={s.module} {...s} />
          ))}
        </Stack>
        <Flex justify="flex-end" gap={15} mt="2rem">
          <Button variant="subtle" onClick={() => navigate('/')}>
            Back
          </Button>
          <Button variant="filled" onClick={handleSaveAndNextClick}>
            Next
          </Button>
        </Flex>
      </Box>
      <Toaster />
    </>
  )
}

export default CustomScript
