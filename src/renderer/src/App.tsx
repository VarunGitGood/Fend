import { MantineProvider } from '@mantine/core'
import './App.css'
import '@mantine/core/styles.css'
import { Routes, Route } from 'react-router-dom'
import MainAppShell from './components/MainAppShell'
import Dashboard from './pages/dashBoard'
import CustomScript from './pages/customScript'
import MyScript from './pages/myScript'
import Groups from './pages/groups'
import { Logs } from './pages/logs'
import { SystemInfo } from './pages/systemInfo'
import { useEffect } from 'react'
import { useGroupStore } from './store/useGroupStore'
const ipcRenderer = (window as any).ipcRenderer
import { useScriptStore } from './store/useScriptStore'
import { useRunsStore, Run } from './store/useRunsStore'
import { saveDataToStore } from './utils/storage'

function App(): JSX.Element {
  const { setGroupDetails } = useGroupStore()
  const { setMyScripts } = useScriptStore()
  const { setRuns, runs } = useRunsStore()

  useEffect(() => {
    ipcRenderer.send('load-storage', 'groupDetails')
    ipcRenderer.send('load-storage', 'myScripts')
    ipcRenderer.send('load-storage', 'runs')
    ipcRenderer.on('load-storage-groupDetails', (_event, arg) => {
      console.log('myScripts', arg)
      if (!arg) {
        setGroupDetails([])
      }
      setGroupDetails(arg)
    })
    ipcRenderer.on('load-storage-myScripts', (_event, arg) => {
      console.log('myScripts', arg)
      if (!arg) {
        setMyScripts([])
      }
      setMyScripts(arg)
    })
    ipcRenderer.on('load-storage-runs', (_event, arg) => {
      console.log('myScripts', arg)
      if (!arg) {
        setRuns([])
      }
      setRuns(arg)
    })
  }, [])

  useEffect(() => {
    ipcRenderer.on('run-script-update', (_event, arg) => {
      const updatedRuns: Run[] = runs.map((run: Run) => {
        if (run.scriptName === arg.scriptName) {
          return {
            ...run,
            status: arg.status,
            scriptOutput: arg.stdout
          }
        }
        return run
      })
      setRuns(updatedRuns)
      saveDataToStore('runs', updatedRuns)
    })
  }, [ipcRenderer, runs])

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
