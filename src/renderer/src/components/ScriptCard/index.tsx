import {
  Checkbox,
  UnstyledButton,
  Text,
  Box,
  Modal,
  TagsInput,
  Button,
  Flex,
  Stack
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from './checkbox.module.css'
import { useState } from 'react'
import { useScriptStore } from '@renderer/store/useScriptStore'
type ScriptCardProps = {
  label: string
  module: string
  description: string
  advancedConfig?: Array<any>
}

function ScriptCard({ label, description, advancedConfig, module }: ScriptCardProps): JSX.Element {
  const [checked, setChecked] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)
  const { setScript, script } = useScriptStore()
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`${module.toUpperCase()} Advance Configurations`}
        centered
      >
        <Stack gap={20} py={10}>
          {advancedConfig?.map((config) => {
            if (config.tag === 'checkbox') {
              return (
                <>
                  <Checkbox
                    defaultChecked={config.current}
                    onChange={(e) => {
                      console.log(script)
                      const newScript = script.map((sc) => {
                        if (sc.module === module) {
                          return {
                            ...sc,
                            advancedConfig: sc.advancedConfig.map((ac) => {
                              if (ac.label === config.label) {
                                return {
                                  ...ac,
                                  current: e.currentTarget.checked
                                }
                              }
                              return ac
                            })
                          }
                        }
                        return sc
                      })
                      setScript(newScript)
                    }}
                    label={config.label}
                    description={config.description}
                  />
                </>
              )
            }
            if (config.tag === 'list') {
              return (
                <Box key={config.label}>
                  <Text>{config.label}</Text>
                  <TagsInput
                    defaultValue={config.default}
                    onChange={(e) => console.log(e)}
                    description={config.description}
                  />
                </Box>
              )
            }
          })}
          <Flex justify="stretch" gap={15}>
            <Button onClick={close} variant="subtle" fullWidth>
              Close
            </Button>
            <Button onClick={close} variant="filled" fullWidth>
              Save
            </Button>
          </Flex>
        </Stack>
      </Modal>
      <div className={classes.root}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5rem'
          }}
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
            style={{
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.stopPropagation()
              open()
            }}
          >
            Show Advance Options
          </Text>
        </Box>
      </div>
    </>
  )
}

export default ScriptCard
