function SshAdvancedSettings(): JSX.Element {
  const ipcRenderer = (window as any).ipcRenderer

  const handleCancelBtnClick = () => {
    ipcRenderer.send('close-child-window')
  }

  const handleNextBtnClick = () => {
    ipcRenderer.send('close-child-window')
  }

  return (
    <div>
      <h1>SSH Advanced Settings</h1>

      <div>
        <button onClick={handleCancelBtnClick}>Cancel</button>
        <button onClick={handleNextBtnClick}>Next</button>
      </div>
    </div>
  )
}

export default SshAdvancedSettings
