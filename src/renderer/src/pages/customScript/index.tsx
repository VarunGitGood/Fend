import { Box, Button, Flex } from '@mantine/core'
import ScriptCard from '@renderer/components/ScriptCard'
import { useScriptStore } from '@renderer/store/useScriptStore'
function CustomScript(): JSX.Element {
  const { script } = useScriptStore()
  return (
    <div>
      <h1>Custom Script</h1>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {script.map((s) => (
          <ScriptCard key={s.module} {...s} />
        ))}
      </Box>
      <Flex justify="flex-end" gap={15} style={{ marginTop: '2rem' }}>
        <Button variant="subtle">Back</Button>
        <Button variant="filled">Next</Button>
      </Flex>
    </div>
  )
}

export default CustomScript
