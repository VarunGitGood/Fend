import { Checkbox, UnstyledButton, Text, Box, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from './checkbox.module.css'
import { useState } from 'react'

function ScriptCard({ module, label, description }): JSX.Element {
  const [checked, setChecked] = useState(false)
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal opened={opened} onClose={close} centered></Modal>
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
