import { ExecException, exec } from 'child_process'
import { BrowserWindow } from 'electron'
import { join } from 'path'

// const ansibleCommand1 = 'cd /home/varun/Code/Projects/safeguard/ansible && molecule test'
// const ansibleCommand2 = 'molecule test'

export const runScript = (
  scriptName: string,
  groupName: string,
  mainWindow: BrowserWindow
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const ansibleCommand = `ansible-playbook /home/varun/Code/Projects/safeguard/ansible/main.yml -i /home/varun/Code/Projects/safeguard/data/groups/${groupName}.yml --extra-vars "@/home/varun/Code/Projects/safeguard//data/scripts/${scriptName}.yml"`
    mainWindow.webContents.send('run-harden-start', `Running script in fn ${scriptName}...`)
    const ansiblePath = join(__dirname, '../../ansible')
    const child = exec(
      ansibleCommand,
      {
        cwd: ansiblePath
      },
      (error: ExecException | null, stdout: string, stderr: string) => {
        mainWindow.webContents.send('run-harden-exec', `executing ${ansibleCommand}...`)
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
