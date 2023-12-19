import { BrowserWindow } from 'electron'
import Store from 'electron-store'

const electronStore = new Store()

const setItem = (key: string, data: any, mainWindow: BrowserWindow): void => {
  electronStore.set(key, data)
  mainWindow.webContents.send('save-storage-success', {})
}

const getItem = (key: 'myScripts' | 'groupDetails' | 'runs', mainWindow: BrowserWindow): any => {
  // make seperate ipc success calls for each key
  const data = electronStore.get(key)
  if (!data) {
    mainWindow.webContents.send('load-storage-empty', {})
    return
  }
  switch (key) {
    case 'myScripts':
      mainWindow.webContents.send('load-storage-myScripts', data)
      break
    case 'groupDetails':
      mainWindow.webContents.send('load-storage-groupDetails', data)
      break
    case 'runs':
      mainWindow.webContents.send('load-storage-runs', data)
      break
    default:
      mainWindow.webContents.send('load-storage-empty', false)
  }
}

export { setItem, getItem, electronStore }
