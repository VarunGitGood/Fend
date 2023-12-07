import { Routes, Route } from 'react-router-dom'
import Scripts from './pages/scripts'
import PreDefinedScripts from './pages/preDefinedScripts'
import CustomScript from './pages/customScript'

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Scripts />} />
      <Route path="/pre-defined-scripts" element={<PreDefinedScripts />} />
      <Route path="/custom-script" element={<CustomScript />} />
    </Routes>
  )
}

export default App
