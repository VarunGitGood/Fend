import { Box, Grid } from '@mantine/core'
import CustomScriptCard from '@renderer/components/CustomScriptCard'
import { MyScriptItem, useScriptStore } from '@renderer/store/useScriptStore'

export default function MuScript(): JSX.Element {
  const { myScripts } = useScriptStore()
  console.log(myScripts)
  return (
    <Box p="md">
      <h1>My Script</h1>
      <Grid gutter={{ xs: 2 }} mt={20}>
        {myScripts.map((script: MyScriptItem) => (
          <Grid.Col key={script.scriptName} span={4}>
            <CustomScriptCard script={script} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}
