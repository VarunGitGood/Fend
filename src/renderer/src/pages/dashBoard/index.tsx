import { Box, Flex, Stack, Group, Grid, Paper, Text, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import classes from './index.module.css'
import LogsTable from '@renderer/components/LogsTable'
// const ipcRenderer = (window as any).ipcRenderer

function Chip({ children }: { children: string }): JSX.Element {
  return (
    <Box bg="#F6F6F6" p="0.125rem 0.5rem" style={{ display: 'inline-block', borderRadius: '1rem' }}>
      <Text fz="0.75rem" fw={500} c="#475467">
        {children}
      </Text>
    </Box>
  )
}

function CustomScriptCard({
  scriptName,
  description
}: {
  scriptName: string
  description: string
}): JSX.Element {
  return (
    <Paper className={classes.card} p="xl">
      <Stack justify="flex-start" gap="0.75rem">
        <Text c="#101828" fz="1.125rem" fw={600} lh="1.50rem">
          {scriptName}
        </Text>
        <Text c="#475467" fz="1rem" fw={400} lh="1.25rem">
          {description}
        </Text>
        <Group gap="0.5rem">
          <Chip>SSH</Chip>
          <Chip>UFW</Chip>
          <Chip>APP Armor</Chip>
        </Group>
        <Button
          className={classes.btn}
          c="rgba(0, 0, 0, 0.90)"
          variant="outline"
          size="md"
          mt="0.5rem"
          fullWidth
        >
          Use Script
        </Button>
      </Stack>
    </Paper>
  )
}

function Dashboard(): JSX.Element {
  const navigate = useNavigate()
  // const runsScript = (): void => {
  //   const data = {
  //     scriptName: 'Custom-Script',
  //     groupName: 'test'
  //   }
  //   ipcRenderer.send('run-script', data)
  //   ipcRenderer.on('run-script-success', (_event, arg) => {
  //     console.log(arg)
  //   })
  //   ipcRenderer.on('run-script-error', (_event, arg) => {
  //     console.error(arg)
  //   })
  // }
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
      {/* <button onClick={runsScript}>testing</button> */}
      <Box mt="3rem">
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={6}>
            <CustomScriptCard
              scriptName="Script Name"
              description="Short description - where we can use this (Recommended target)"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <CustomScriptCard
              scriptName="Script Name"
              description="Short description - where we can use this (Recommended target)"
            />
          </Grid.Col>
        </Grid>
      </Box>
      <LogsTable title="Last Executed Scripts" limit={5} />
    </Box>
  )
}

export default Dashboard
