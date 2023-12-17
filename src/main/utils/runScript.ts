import { ExecException, exec } from 'child_process'
import { join } from 'path'
import * as fs from 'fs-extra'
const cwd = process.cwd()

export interface RunOutput {
  status: string
  stdout: string
  stderr: string
  scriptName: string
}

export const runScript = (scriptName: string, groupName: string): Promise<RunOutput> => {
  console.log('runScript', scriptName, groupName)
  return new Promise((resolve, reject) => {
    const ansibleCommand = `ansible-playbook ${join(cwd, 'ansible/')}main.yml -i ${join(
      cwd,
      'ansible-data/groups/'
    )}test.yml --extra-vars "@${join(cwd, 'ansible-data/scripts/')}${scriptName}.yml"`
    exec(ansibleCommand, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        fs.unlinkSync(join(cwd, 'ansible-data/groups/test.yml'))
        reject({
          status: 'error',
          stdout,
          stderr,
          scriptName
        })
        return
      }
      if (stderr) {
        fs.unlinkSync(join(cwd, 'ansible-data/groups/test.yml'))
        resolve({
          status: 'error',
          stdout,
          stderr,
          scriptName
        })
      } else {
        fs.unlinkSync(join(cwd, 'ansible-data/groups/test.yml'))
        resolve({
          status: 'success',
          stdout,
          stderr,
          scriptName
        })
      }
    })
  })
}
