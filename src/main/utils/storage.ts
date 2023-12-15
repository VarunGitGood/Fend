import * as fs from 'fs-extra'
import { join } from 'path'
import { BrowserWindow, Notification } from 'electron'

const location = join(__dirname, '../../storage')
const filePath = join(location, 'fendStorage.json')

interface Data {
  key: string
  value: any
}
const Notify = (message: string): void => {
  new Notification({
    title: 'Error',
    body: message
  }).show()
}

const handleSaveError = (mainWindow: BrowserWindow, message: string): void => {
  mainWindow.webContents.send('save-storage-error', message)
}

const handleSaveSuccess = (mainWindow: BrowserWindow, message: string): void => {
  mainWindow.webContents.send('save-storage-success', message)
}

export const saveDataToStore = (data: Data, mainWindow: BrowserWindow): void => {
  const key = data.key
  const value = data.value
  fs.ensureFileSync(filePath)

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      Notify('Some Error Occurred')
    } else {
      let existingData = {}
      if (fileData) {
        existingData = JSON.parse(fileData)
      }
      existingData[key] = value

      fs.writeFile(filePath, JSON.stringify(existingData), (err) => {
        if (err) {
          handleSaveError(mainWindow, 'Some Error Occurred')
        } else {
          handleSaveSuccess(mainWindow, 'Data written to file successfully.')
        }
      })
    }
  })
}

export const getDataFromStore = (key: string, mainWindow: BrowserWindow): void => {
  fs.ensureFileSync(filePath)

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      Notify('Some Error Occurred')
    } else {
      const existingData = JSON.parse(fileData || '{}')
      const value = existingData[key]
      console.log(value)
      if (value) {
        mainWindow.webContents.send('load-storage-success', value)
      } else {
        mainWindow.webContents.send('load-storage-error', 'Key not found')
      }
    }
  })
}
