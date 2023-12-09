import MainAppShell from '@renderer/components/MainAppShell'

function PreDefinedScripts(): JSX.Element {
  return (
    <MainAppShell>
      <div>
        <h3>Recommended for WebServer</h3>
        <button>Script 1</button>
        <button>Script 2</button>
      </div>
      <div>
        <h3>Recommended for WorkStation</h3>
        <button>Script 3</button>
        <button>Script 4</button>
      </div>
      <div>
        <button>Back</button>
        <button>Next</button>
      </div>
    </MainAppShell>
  )
}

export default PreDefinedScripts
