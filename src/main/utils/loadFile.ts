import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'
import { join } from 'path'

export enum filePath {
  script = '../../ansible-data/scripts',
  group = '../../ansible-data/groups'
}

export const loadAnsibleFile = (filePath: filePath): any => {
  const scriptFolderPath = join(__dirname, filePath)
  const files = fs.readdirSync(scriptFolderPath)
  const data: any = []
  files.forEach((file) => {
    const fileData = fs.readFileSync(join(scriptFolderPath, file), 'utf8')
    const fileJson = yaml.load(fileData)
    data.push(fileJson)
  })
  return data
}
