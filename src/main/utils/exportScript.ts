import { ExecException, exec } from 'child_process'
import { join } from 'path'
import * as fs from 'fs-extra'

export interface ExportOutput {
  status: string
  stdout: string
  scriptName: string
}

export const executeExportScript = async (scriptName: string): Promise<ExportOutput> => {
  console.log('Executing export script for:', scriptName)
  return new Promise((resolve, reject) => {
    const exportScriptPath = join(__dirname, '../../utils/export.sh')
    const exportFolderPath = join(__dirname, '../../utils/')
    const command = `${exportScriptPath} '${scriptName}'`

    exec(
      command,
      { cwd: exportFolderPath },
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
        const zipFilePath = join(exportFolderPath, 'export.zip')

        // Check if the zip file exists after script execution
        fs.access(zipFilePath, fs.constants.F_OK, (err) => {
          if (err) {
            reject({
              status: 'error',
              stdout: 'Export script completed but failed to generate the zip file.',
              scriptName
            })
          } else {
            resolve({
              status: 'success',
              stdout: output + `\nZip file generated successfully at: ${zipFilePath}`,
              scriptName
            })
          }
        })
      }
    )
  })
}
