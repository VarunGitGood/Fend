import { ExecException, exec } from 'child_process'
import { join } from 'path'

export interface ExportOutput {
  status: string
  stdout: string
  scriptName: string
}

export const executeExportScript = async (
  data: any
): Promise<ExportOutput> => {
  return new Promise((resolve, reject) => {
    const exportScriptPath = join(__dirname, '../../utils')
    const command = `${exportScriptPath}/export.sh '${data.scriptName}' ${data.scriptOSVersion}`

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
            scriptName: data.scriptName
          })
          return
        }

        const output = stdout + stderr

        resolve({
          status: 'success',
          stdout: output + `\nZip file generated successfully at: downloads}`,
          scriptName:data.scriptName
        })
      }
    )
  })
}
