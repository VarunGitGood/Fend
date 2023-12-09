import { Routes, Route } from 'react-router-dom'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import Scripts from './pages/scripts'
import PreDefinedScripts from './pages/preDefinedScripts'
import CustomScript from './pages/customScript'
import SshAdvancedSettings from './pages/sshAdvancedSettings/index.tsx'

function App(): JSX.Element {
  return (
    <MantineProvider>
      <Routes>
        <Route path="/" element={<Scripts />} />
        <Route path="/pre-defined-scripts" element={<PreDefinedScripts />} />
        <Route path="/custom-script" element={<CustomScript />} />
        <Route path="/ssh-advanced-settings" element={<SshAdvancedSettings />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
