import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'
import { join } from 'path'
import { BrowserWindow } from 'electron'

export interface ScriptData {
  script: { [key: string]: string | number | boolean }
  scriptName: string
}

export const generateScript = (data: ScriptData, mainWindow: BrowserWindow): void => {
  try {
    const yamlData = yaml.dump(data.script)
    const scriptFolderPath = join(__dirname, '../../data/scripts')
    const filePath = join(scriptFolderPath, `${data.scriptName}.yml`)
    fs.writeFileSync(filePath, yamlData)
    mainWindow.webContents.send('generate-script-success', 'Data written to file successfully.')
  } catch (error) {
    // Notify the renderer process of the error
    mainWindow.webContents.send('generate-script-error', error.message)
  }
}
