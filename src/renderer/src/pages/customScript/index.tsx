import CustomCheckBox from '@renderer/components/CustomCheckBox'
import { Link } from 'react-router-dom'

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
      <CustomCheckBox />
      <div>
        <Link to="/">
          <button>Back</button>
        </Link>
        <button onClick={openChildWindow}>Next</button>
      </div>
    </div>
  )
}

export default CustomScript
