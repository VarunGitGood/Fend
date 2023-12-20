import { Box, Flex, Grid, Text, Button, Loader, Stack } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import LogsTable from '@renderer/components/LogsTable'
import { useRunsStore } from '@renderer/store/useRunsStore'
import CustomScriptCard from '@renderer/components/CustomScriptCard'
import { MyScriptItem } from '@renderer/store/useScriptStore'

function Dashboard(): JSX.Element {
  const { runs } = useRunsStore()
  const navigate = useNavigate()

  const script: MyScriptItem[] = [
    {
      scriptName: 'Web Server Hardening',
      scriptDescription:
        'This script will harden the web server with recommended settings and configurations',
      myConfig: [
        {
          module: 'Apache',
          description: 'Apache web server',
          isSelected: true,
          label: 'Apache'
        },
        {
          module: 'ufw',
          description: 'Uncomplicated Firewall',
          isSelected: true,
          label: 'UFW'
        },
        {
          module: 'Lock Root',
          description: 'Lock root account',
          isSelected: true,
          label: 'Lock Root'
        },
        {
          module: 'SSH',
          description: 'SSH',
          isSelected: true,
          label: 'SSH'
        },
        {
          module: 'Updates',
          description: 'Updates',
          isSelected: true,
          label: 'Updates'
        }
      ]
    },
    {
      scriptName: 'Workstation Hardening',
      scriptDescription:
        'Workstation hardening script will harden the workstation with recommended settings and configurations. ',
      myConfig: [
        {
          module: 'USB',
          description: 'Apache web server',
          isSelected: true,
          label: 'Apache'
        },
        {
          module: 'ufw',
          description: 'Uncomplicated Firewall',
          isSelected: true,
          label: 'UFW'
        },
        {
          module: 'Password',
          description: 'Password',
          isSelected: true,
          label: 'Password'
        },
        {
          module: 'SSH',
          description: 'SSH',
          isSelected: true,
          label: 'SSH'
        },
        {
          module: 'Updates',
          description: 'Updates',
          isSelected: true,
          label: 'Updates'
        }
      ]
    }
  ]

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
        <Text fz={'1.25rem'} fw="600" lh={'1.75rem'} mb="lg">
          Recommended Combined Scripts
        </Text>
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={6}>
            <CustomScriptCard script={script[0]} />
          </Grid.Col>
          <Grid.Col span={6}>
            <CustomScriptCard script={script[1]} />
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
