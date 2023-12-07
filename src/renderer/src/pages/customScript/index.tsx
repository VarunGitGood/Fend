function CustomScript(): JSX.Element {
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
        <button>Cancel</button>
        <button>Next</button>
      </div>
    </div>
  )
}

export default CustomScript
