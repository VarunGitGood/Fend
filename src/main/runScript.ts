import { ExecException, exec } from 'child_process'
import { BrowserWindow } from 'electron'

export const runScript = (
  scriptName: string,
  groupName: string,
  mainWindow: BrowserWindow
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const ansibleCommand = `ansible-playbook -i ../../data/groups/${groupName}.yml ./data/scripts/${scriptName}.yml`
    const child = exec(
      ansibleCommand,
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          mainWindow.webContents.send(
            'run-harden-error',
            `Error running Ansible script: ${error.message}`
          )
          console.error('Error running Ansible script:', error)
          reject(error)
          return
        }
        mainWindow.webContents.send(
          'run-harden-success',
          `Script ${scriptName} ran successfully.\nHere is the output:${stdout}`
        )
        console.log('Ansible script ran successfully:', stdout)
        if (stderr) {
          mainWindow.webContents.send(
            'run-harden-error',
            `Script ${scriptName} produced errors:\n${stderr}`
          )
          console.error('Ansible script produced errors:', stderr)
          reject(new Error(stderr))
        } else {
          resolve(stdout)
        }
      }
    )
    child.on('close', (code) => {
      //  TODO implement notification
    })
  })
}
