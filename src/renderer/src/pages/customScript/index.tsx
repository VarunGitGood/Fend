import { useState } from 'react'
import { Box, Flex, Stack, Text, TextInput, Textarea, Select, Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ScriptCard from '@renderer/components/ScriptCard'
import {
  useScriptStore,
  AdvancedConfigItem,
  ModuleItem,
  MyScriptItem
} from '@renderer/store/useScriptStore'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { saveDataToStore } from '@renderer/utils/storage'
const ipcRenderer = (window as any).ipcRenderer

function CustomScript(): JSX.Element {
  const { script, advancedConfig, setMyScripts, myScripts } = useScriptStore()
  const [scriptName, setScriptName] = useState<string>('')
  const [scriptDescription, setScriptDescription] = useState<string>('')
  const [scriptOSVersion, setScriptOSVersion] = useState<string>('')
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
      scriptDescription,
      scriptOSVersion,
      myConfig: modules,
      ansibleConfig: customScript
    }

    ipcRenderer.send('generate-script', {
      scriptName,
      script: customScript
    })
    ipcRenderer.on('generate-script-success', (_event, arg) => {
      console.log(arg)
    })
    ipcRenderer.on('generate-script-error', (_event, arg) => {
      console.error(arg)
    })
    setMyScripts([...myScripts, myScript])
    saveDataToStore('myScripts', [...myScripts, myScript])
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
    if (!scriptDescription) {
      toast.error('Please enter script description')
      return
    }
    if (!scriptOSVersion) {
      toast.error('Please enter your OS Version')
      return
    }
    if (checkScriptName(scriptName)) {
      toast.error('Script name already exists change it before saving')
      return
    }
    open()
  }

  const checkScriptName = (name: string): boolean => {
    let flag = false
    myScripts.forEach((script: MyScriptItem) => {
      if (script.scriptName === name) {
        flag = true
      }
    })
    return flag
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
        <TextInput
          label="Enter your script name"
          placeholder="Enter custom script name"
          mt="2rem"
          size="md"
          style={{ borderRadius: '4px' }}
          value={scriptName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            if (checkScriptName(event.target.value)) {
              toast.error('Script name already exists')
            }
            setScriptName(event.target.value)
          }}
          error={checkScriptName(scriptName)}
        />
        <Textarea
          label="Enter your script description"
          placeholder="Enter custom script description"
          mt="1rem"
          size="md"
          style={{ borderRadius: '4px' }}
          value={scriptDescription}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setScriptDescription(event.target.value)
          }}
        />
        <Select
          label="Select the version of your system"
          placeholder="Select OS version"
          mt="1rem"
          size="md"
          data={[
            { label: 'Ubuntu 22.04', value: '22.04' },
            { label: 'Ubuntu 20.04', value: '20.04' },
            { label: 'Ubuntu 18.04', value: '18.04' }
          ]}
          value={scriptOSVersion}
          onChange={(value: string | null): void => {
            if (value !== null) {
              setScriptOSVersion(value)
            }
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
            Save
          </Button>
        </Flex>
      </Box>
      <Toaster />
    </>
  )
}

export default CustomScript
