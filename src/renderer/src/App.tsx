import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Routes, Route } from 'react-router-dom'
import MainAppShell from './components/MainAppShell'
import Dashboard from './pages/dashBoard'
import CustomScript from './pages/customScript'
import Groups from './pages/groups'
import { Logs } from './pages/logs'
import { SystemInfo } from './pages/systemInfo'

function App(): JSX.Element {
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
