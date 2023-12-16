import { Box, Flex, Button, Text, Input, Stack, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ScriptCard from '@renderer/components/ScriptCard'
import { useState } from 'react'
import {
  useScriptStore,
  AdvancedConfigItem,
  ModuleItem,
  MyScriptItem
} from '@renderer/store/useScriptStore'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function CustomScript(): JSX.Element {
  const { script, advancedConfig, setMyScripts, myScripts } = useScriptStore()
  const [scriptName, setScriptName] = useState<string>('')
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)

  const handleScript = (): void => {
    const customScript: { [key: string]: any } = { active_roles: [] }
    const modules = script.filter((s) => s.isSelected)
    script.forEach((module: ModuleItem) => {
      if (module.isSelected) {
        customScript.active_roles.push(module.module)
      }
    })
    advancedConfig.forEach((config: AdvancedConfigItem) => {
      customScript[config.var] = config.current
    })
    const myScript: MyScriptItem = {
      scriptName,
      myConfig: modules,
      ansibleConfig: customScript
    }
    setMyScripts([...myScripts, myScript])
  }

  const handleSaveAndNextClick = (): void => {
    const isModuleSelected = script.some((s) => s.isSelected)
    const isScriptName = scriptName.trim().length > 0
    if (!isModuleSelected) {
      toast.error('Please select at least one module')
      return
    }
    if (!isScriptName) {
      toast.error('Please enter script name')
      return
    }
    open()
  }

  return (
    <>
      <Modal opened={opened} onClose={close} size="md" title="Confirm Script" centered padding="md">
        <Text fz="1rem" fw={600} mb="1rem">
          Are you sure you want to save this script?
        </Text>
        <Flex justify="flex-end" gap={15}>
          <Button size="md" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            size="md"
            onClick={() => {
              close()
              handleScript()
              navigate(`/myScript`)
            }}
          >
            Confirm
          </Button>
        </Flex>
      </Modal>
      <Box p="md">
        <Text fz="2.25rem" fw="600" lh="2.75rem">
          Custom Script
        </Text>
        <Input
          placeholder="Enter custom script name"
          mt="2rem"
          size="md"
          style={{
            borderRadius: '4px'
          }}
          value={scriptName}
          onChange={(event) => setScriptName(event.currentTarget.value)}
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
            Save
          </Button>
        </Flex>
      </Box>
      <Toaster />
    </>
  )
}

export default CustomScript
