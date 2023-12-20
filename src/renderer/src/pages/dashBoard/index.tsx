import { Box, Flex, Grid, Text, Button, Loader, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import LogsTable from '@renderer/components/LogsTable'
import { useRunsStore } from '@renderer/store/useRunsStore'
import CustomScriptCard from '@renderer/components/CustomScriptCard'
import { MyScriptItem } from '@renderer/store/useScriptStore'

function Dashboard(): JSX.Element {
  const { runs } = useRunsStore()
  const navigate = useNavigate()

  const script: MyScriptItem = {
    scriptName: 'Script Name',
    scriptDescription: 'Short description - where we can use this (Recommended target)',
    scriptOSVersion: '22.04',
    myConfig: []
  }

  return (
    <Box p="md">
      <Flex justify="space-between" align="center">
        <Text fz="2.25rem" fw="600" lh="2.75rem">
          Dashboard
        </Text>
        <Button bg="#005FB8" size="md" onClick={() => navigate('/custom-script')}>
          Build Custom Script
        </Button>
      </Flex>
      <Box mt="3rem">
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={6}>
            <CustomScriptCard script={script} />
          </Grid.Col>
          <Grid.Col span={6}>
            <CustomScriptCard script={script} />
          </Grid.Col>
        </Grid>
      </Box>
      {runs[0]?.status === 'running' && (
        <Stack justify="center" align="center" gap="md" mt="2rem">
          <Loader />
        </Stack>
      )}
      <LogsTable title="Last Executed Scripts" limit={5} />
    </Box>
  )
}

export default Dashboard
