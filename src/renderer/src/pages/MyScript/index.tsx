import { Box, Button, Grid, Group, Image } from '@mantine/core'
import CustomScriptCard from '@renderer/components/CustomScriptCard'
import { MyScriptItem, useScriptStore } from '@renderer/store/useScriptStore'
import notFoundImg from '../../assets/notFound.jpg'
import { useNavigate } from 'react-router-dom'

export default function MuScript(): JSX.Element {
  const { myScripts } = useScriptStore()
  const navigate = useNavigate()
  console.log(myScripts)
  return (
    <Box p="md">
      <h1>My Script</h1>
      {myScripts.length > 0 ? (
        <Grid gutter={{ xs: 2 }} mt={20}>
          {myScripts.map((script: MyScriptItem) => (
            <Grid.Col key={script.scriptName} span={4}>
              <CustomScriptCard script={script} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Group justify="center" align="center" mt="3rem">
          <Image src={notFoundImg} alt="No Groups Found" width={600} height={600} />
          <Button bg="#005FB8" size="md" onClick={() => navigate('/custom-script')}>
            Build Custom Script
          </Button>
        </Group>
      )}
    </Box>
  )
}
