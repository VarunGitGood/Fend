import { MantineProvider } from '@mantine/core'
import './App.css'
import '@mantine/core/styles.css'
import { Routes, Route } from 'react-router-dom'
import MainAppShell from './components/MainAppShell'
import Dashboard from './pages/dashBoard'
import CustomScript from './pages/customScript'
import Groups from './pages/groups'
import { Logs } from './pages/logs'
import { SystemInfo } from './pages/systemInfo'
import { useEffect } from 'react'
import { useScriptStore } from './store/useScriptStore'
import { useGroupStore } from './store/useGroupStore'
import { loadDataFromStore } from './utils/storage'

function App(): JSX.Element {
  const { setAdvancedConfig, setScript } = useScriptStore()
  const { setGroupDetails } = useGroupStore()

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const script = await loadDataFromStore('script')
      const advancedConfig = await loadDataFromStore('advancedConfig')
      const groupDetails = await loadDataFromStore('groupDetails')

      if (script) {
        setScript(JSON.parse(script))
      }

      if (advancedConfig) {
        setAdvancedConfig(JSON.parse(advancedConfig))
      }

      if (groupDetails) {
        setGroupDetails(JSON.parse(groupDetails))
      }
    }

    loadData()
  }, [])

  return (
    <MantineProvider>
      <MainAppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/custom-script" element={<CustomScript />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/sysInfo" element={<SystemInfo />} />
        </Routes>
      </MainAppShell>
    </MantineProvider>
  )
}

export default App
