import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Routes, Route } from 'react-router-dom'
import MainAppShell from './components/MainAppShell'
import Dashboard from './pages/dashBoard'
import PreDefinedScripts from './pages/preDefinedScripts'
import CustomScript from './pages/customScript'
import SshAdvancedSettings from './pages/sshAdvancedSettings/index.tsx'
import Groups from './pages/groups'

function App(): JSX.Element {
  return (
    <MantineProvider>
      <MainAppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/pre-defined-scripts" element={<PreDefinedScripts />} />
          <Route path="/custom-script" element={<CustomScript />} />
          <Route path="/ssh-advanced-settings" element={<SshAdvancedSettings />} />
        </Routes>
      </MainAppShell>
    </MantineProvider>
  )
}

export default App
