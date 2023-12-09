import { Link } from 'react-router-dom'

function Scripts(): JSX.Element {
  return (
    <div>
      <div>
        <Link to="/pre-defined-scripts">
          <button>Use Pre-Defined Scripts</button>
        </Link>
        <Link to="/custom-script">
          <button>Build Custom Script</button>
        </Link>
      </div>
      <div>
        <button>Next</button>
      </div>
    </div>
  )
}

export default Scripts
