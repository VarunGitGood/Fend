import { Box } from '@mantine/core'
import CustomScriptCard from '@renderer/components/CustomScriptCard'

export default function MuScript(): JSX.Element {
  return (
    <Box>
      <h1>My Script</h1>
      <Box>
        {[0, 0, 0, 0, 0, 0].map((item, index) => (
          <CustomScriptCard key={index} />
        ))}
      </Box>
    </Box>
  )
}
