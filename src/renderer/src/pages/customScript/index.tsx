function CustomScript(): JSX.Element {
  const ipcRenderer = (window as any).ipcRenderer

  const openChildWindow = () => {
    ipcRenderer.send('open-child-window')
  }

  return (
    <div>
      <div>
        <h3>Name</h3>
        <input type="text" />
      </div>
      <div>
        <label>
          <input type="checkbox" value="ssh" /> SSH
        </label>
        <br />
        <label>
          <input type="checkbox" value="firewalls" /> Firewalls (Ufw)
        </label>
        <br />
        <label>
          <input type="checkbox" value="services(systemctl)" /> Services (systemctl)
        </label>
        <br />
        <label>
          <input type="checkbox" value="physical-ports" /> Physical Ports
        </label>
        <br />
        <label>
          <input type="checkbox" value="bluetooth" /> Bluetooth
        </label>
        <br />
        <label>
          <input type="checkbox" value="app-armor" /> AppArmor
        </label>
        <br />
      </div>
      <div>
        <button>Back</button>
        <button onClick={openChildWindow}>Next</button>
      </div>
    </div>
  )
}

export default CustomScript
