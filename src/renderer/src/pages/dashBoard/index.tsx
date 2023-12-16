import { Box, Flex, Grid, Text, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import LogsTable from '@renderer/components/LogsTable'
import CustomScriptCard from '@renderer/components/CustomScriptCard'
// import { loadDataFromStore, saveDataToStore } from '@renderer/utils/storage'
// const ipcRenderer = (window as any).ipcRenderer

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

  // const getData = (): void => {
  //   ipcRenderer.send('load-data', '../../data/scripts')
  //   ipcRenderer.on('load-data-success', (_event, arg) => {
  //     console.log(arg)
  //   })
  //   ipcRenderer.on('load-data-error', (_event, arg) => {
  //     console.error(arg)
  //   })
  // }

  // const setData = (): void => {
  //   const data = {
  //     place: 'Varanasi',
  //     college: 'IIT BHU'
  //   }
  //   saveDataToStore('address2', data)
  // }

  // const getData = async (): Promise<void> => {
  //   const value = await loadDataFromStore('address')
  //   console.log(value)
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
      {/* <button onClick={setData}>set data</button>
      <button onClick={getData}>get data</button> */}
      <Box mt="3rem">
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={6}>
            <CustomScriptCard />
          </Grid.Col>
          <Grid.Col span={6}>
            <CustomScriptCard />
          </Grid.Col>
        </Grid>
      </Box>
      <LogsTable title="Last Executed Scripts" limit={5} />
    </Box>
  )
}

export default Dashboard
