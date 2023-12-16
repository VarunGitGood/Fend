import { MantineProvider } from '@mantine/core'
import './App.css'
import '@mantine/core/styles.css'
import { Routes, Route } from 'react-router-dom'
import MainAppShell from './components/MainAppShell'
import Dashboard from './pages/dashBoard'
import CustomScript from './pages/customScript'
import MyScript from './pages/MyScript'
import Groups from './pages/groups'
import { Logs } from './pages/logs'
import { SystemInfo } from './pages/systemInfo'
import { useEffect } from 'react'
import { useGroupStore } from './store/useGroupStore'
import { loadDataFromStore } from './utils/storage'

function App(): JSX.Element {
  const { setGroupDetails } = useGroupStore()

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const groupDetails = await loadDataFromStore('groupDetails')
      if (groupDetails) {
        setGroupDetails(groupDetails)
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
          <Route path="/myScript" element={<MyScript />} />
        </Routes>
      </MainAppShell>
    </MantineProvider>
  )
}

export default App
