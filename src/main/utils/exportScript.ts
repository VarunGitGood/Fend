import { ExecException, exec } from 'child_process'
import { join } from 'path'

export interface ExportOutput {
  status: string
  stdout: string
  scriptName: string
}

export const executeExportScript = async (scriptName: string): Promise<ExportOutput> => {
  console.log('Executing export script for:', scriptName)
  return new Promise((resolve, reject) => {
    const exportScriptPath = join(__dirname, '../../utils')
    const command = `${exportScriptPath}/export.sh '${scriptName}'`

    exec(
      command,
      {
        cwd: exportScriptPath
      },
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          reject({
            status: 'error',
            stdout,
            scriptName
          })
          return
        }

        const output = stdout + stderr

        resolve({
          status: 'success',
          stdout: output + `\nZip file generated successfully at: downloads}`,
          scriptName
        })
      }
    )
  })
}
