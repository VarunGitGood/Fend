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
const ipcRenderer = (window as any).ipcRenderer
import { useScriptStore } from './store/useScriptStore'
import { useState } from 'react'

function App(): JSX.Element {
  const { setGroupDetails } = useGroupStore()
  const { setMyScripts } = useScriptStore()
  const [localData, setLocalData] = useState<any>(null)

  useEffect(() => {
    ipcRenderer.send('load-storage')
    ipcRenderer.on('load-storage-success', (_event, arg) => {
      console.log(arg)
      setLocalData(arg)
    })
    ipcRenderer.on('load-storage-error', (_event, arg) => {
      console.error(arg)
    })
  }, [])

  useEffect(() => {
    if (localData && localData.groupDetails) {
      setGroupDetails(localData.groupDetails)
    } else {
      setGroupDetails([])
    }
    if (localData && localData.myScripts) {
      setMyScripts(localData.myScripts)
    } else {
      setMyScripts([])
    }
  }, [localData])

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
