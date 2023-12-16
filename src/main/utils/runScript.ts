import { ExecException, exec } from 'child_process'
import { join } from 'path'
const cwd = process.cwd()

export const runScript = (scriptName: string, groupName: string): Promise<string> => {
  console.log('runScript', scriptName, groupName)
  return new Promise((resolve, reject) => {
    const ansibleCommand = `ansible-playbook ${join(cwd, 'ansible/')}main.yml -i ${join(
      cwd,
      'ansible-data/groups/'
    )}test.yml --extra-vars "@${join(cwd, 'ansible-data/scripts/')}${scriptName}.yml"`
    exec(ansibleCommand, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        reject(error)
        return
      }
      if (stderr) {
        resolve(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}
