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
  Button
} from '@mantine/core'
import { AdvancedConfigItem } from '@renderer/store/useScriptStore'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useScriptStore } from '@renderer/store/useScriptStore'
import classes from './checkbox.module.css'

type ScriptCardProps = {
  module: string
  label: string
  description: string
}

function ScriptCard({ label, description, module }: ScriptCardProps): JSX.Element {
  const [checked, setChecked] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)
  const { advancedConfig, setAdvancedConfig } = useScriptStore()

  const moduleAdvancedConfig: AdvancedConfigItem[] | undefined = advancedConfig.filter(
    (config) => config.module === module
  )

  const initialValues = moduleAdvancedConfig?.map((config) => ({
    [config.var]: config.current
  }))

  const form = useForm({
    initialValues: initialValues
  })

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`${module.toUpperCase()} Advance Configurations`}
        centered
      >
        <form onSubmit={form.onSubmit(() => console.log(form.values))}>
          <Stack gap={20} py={10}>
            {advancedConfig?.map((config) => {
              if (config.module !== module) return null

              if (config.tag === 'checkbox') {
                return (
                  <Checkbox
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

              return null
            })}
            <Flex justify="stretch" gap={15}>
              <Button onClick={close} variant="subtle" fullWidth>
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
          onClick={() => setChecked((c) => !c)}
        >
          <Checkbox
            classNames={{ root: classes.checkboxWrapper, input: classes.checkbox }}
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            tabIndex={-1}
            size="md"
            aria-label="Checkbox example"
          />
          <UnstyledButton className={classes.control} data-checked={checked || undefined}>
            <Text className={classes.label}>{label}</Text>
            <Text className={classes.description}>{description}</Text>
          </UnstyledButton>
          <Text
            c="blue"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation()
              open()
            }}
          >
            Show Advance Options
          </Text>
        </Flex>
      </div>
    </>
  )
}

export default ScriptCard
