import { useState } from 'react'
import {
  Box,
  Flex,
  Stack,
  Checkbox,
  UnstyledButton,
  Text,
  Modal,
  TagsInput,
  NumberInput,
  Button,
  TextInput
} from '@mantine/core'
import { AdvancedConfigItem } from '@renderer/store/useScriptStore'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useScriptStore } from '@renderer/store/useScriptStore'
import classes from './index.module.css'
import { IconInfoCircle } from '@tabler/icons-react'

type ScriptCardProps = {
  module: string
  label: string
  description: string
  isSelected: boolean
}

function ScriptCard({ label, description, module, isSelected }: ScriptCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false)
  const [checked, setChecked] = useState(isSelected)
  const [opened, { open, close }] = useDisclosure(false)
  const { advancedConfig, setAdvancedConfig } = useScriptStore()
  const { script, setScript } = useScriptStore()

  const moduleAdvancedConfig: AdvancedConfigItem[] | undefined = advancedConfig.filter(
    (config) => config.module === module
  )

  const initialValues: Record<string, string | number | boolean> = {}

  moduleAdvancedConfig?.map((config) => {
    initialValues[config.var] = config.current
  })

  const editModule = (isChecked, module): void => {
    const newScript = script.map((s) => {
      if (s.module !== module) return s
      s.isSelected = isChecked
      return s
    })
    setScript(newScript)
  }

  const form = useForm({
    initialValues: initialValues
  })
  const handleSubmit = (e): void => {
    e.preventDefault()
    const newAdvancedConfig = advancedConfig.map((config) => {
      if (config.module !== module) return config
      config.current = form.values[config.var]
      return config
    })
    setAdvancedConfig(newAdvancedConfig)
    close()
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="45%"
        title={`${module.toUpperCase()} Advance Configurations`}
        centered
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack gap={20} py={10}>
            {advancedConfig?.map((config) => {
              if (config.module !== module) return null

              if (config.tag === 'checkbox') {
                return (
                  <Checkbox
                    key={config.label}
                    defaultChecked={config.current}
                    label={config.label}
                    description={config.description}
                    {...form.getInputProps(config.var)}
                  />
                )
              }
              if (config.tag === 'list') {
                return (
                  <Box key={config.label}>
                    <Text>{config.label}</Text>
                    <TagsInput
                      defaultValue={config.current}
                      description={config.description}
                      {...form.getInputProps(config.var)}
                    />
                  </Box>
                )
              }
              if (config.tag === 'number') {
                return (
                  <Box key={config.label}>
                    <Text>{config.label}</Text>
                    <NumberInput
                      defaultValue={config.current}
                      description={config.description}
                      {...form.getInputProps(config.var)}
                    />
                  </Box>
                )
              }
              if (config.tag == 'text') {
                return (
                  <Box key={config.label}>
                    <Text>{config.label}</Text>
                    <TextInput
                      defaultValue={config.current}
                      description={config.description}
                      {...form.getInputProps(config.var)}
                    />
                  </Box>
                )
              }
              return null
            })}
            <Flex justify="stretch" gap={15}>
              <Button onClick={close} variant="outline" fullWidth>
                Close
              </Button>
              <Button type="submit" onClick={close} variant="filled" fullWidth>
                Save
              </Button>
            </Flex>
          </Stack>
        </form>
      </Modal>

      <div className={classes.root}>
        <Flex
          justify="space-between"
          align="center"
          px="1.5rem"
          onClick={() => {
            setChecked(!checked)
            editModule(!checked, module)
          }}
        >
          <Checkbox
            classNames={{ root: classes.checkboxWrapper, input: classes.checkbox }}
            checked={checked}
            tabIndex={-1}
            size="md"
            aria-label="Checkbox example"
            readOnly
          />
          <UnstyledButton className={classes.control} data-checked={checked || undefined}>
            <Flex
              mih={30}
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <Text className={classes.label}>{label}</Text>
              <IconInfoCircle
                size={18}
                strokeWidth={1}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              />
            </Flex>
            <Text className={classes.description} lineClamp={isHovered ? undefined : 1}>
              {description}
            </Text>
          </UnstyledButton>
          {moduleAdvancedConfig?.length > 0 && (
            <Text
              c="blue"
              miw={200}
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                open()
              }}
            >
              Show Advance Options
            </Text>
          )}
        </Flex>
      </div>
    </>
  )
}

export default ScriptCard
