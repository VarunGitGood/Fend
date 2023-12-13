import { useEffect, useState } from 'react'
const ipcRenderer = (window as any).ipcRenderer

export const SystemInfo = (): React.ReactElement => {
  const [Info, seTInfo] = useState({})
  useEffect(() => {
    ipcRenderer.send('get-system-info')
    ipcRenderer.on('get-system-info-success', (_event, arg) => {
      seTInfo(arg)
    })
  }, [])

  return (
    <>
      <h1>System Info</h1>
      {JSON.stringify(Info)}
    </>
  )
}
