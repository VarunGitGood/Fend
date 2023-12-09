import { Checkbox, UnstyledButton, Text, Box } from '@mantine/core'
import classes from './CustomCheckBox.module.css'
import { useState } from 'react'

const CustomCheckBox = (): JSX.Element => {
  const [checked, setChecked] = useState(false)

  return (
    <Box className={classes.root}>
      <Checkbox
        classNames={{ root: classes.checkboxWrapper, input: classes.checkbox }}
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        tabIndex={-1}
        size="md"
        aria-label="Checkbox example"
      />

      <UnstyledButton
        className={classes.control}
        data-checked={checked || undefined}
        onClick={() => setChecked((c) => !c)}
      >
        <Text className={classes.label}>@mantine/core</Text>
        <Text className={classes.description}>
          Core components library: inputs, buttons, overlays, etc.
        </Text>
      </UnstyledButton>
    </Box>
  )
}

export default CustomCheckBox
