import { Box, Flex, Stack, Button, Text } from '@mantine/core'
import ScriptCard from '@renderer/components/ScriptCard'
import { useScriptStore } from '@renderer/store/useScriptStore'

function CustomScript(): JSX.Element {
  const { script } = useScriptStore()
  console.log(script)
  return (
    <Box p="md">
      <Text fz="2.25rem" fw={400}>
        Custom Script
      </Text>
      <Stack gap="1rem" mt="3rem">
        {script.map((s) => (
          <ScriptCard key={s.module} {...s} />
        ))}
      </Stack>
      <Flex justify="flex-end" gap={15} style={{ marginTop: '2rem' }}>
        <Button variant="subtle">Back</Button>
        <Button variant="filled">Next</Button>
      </Flex>
    </Box>
  )
}

export default CustomScript
