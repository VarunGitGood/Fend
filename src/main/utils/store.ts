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
    mainWindow.webContents.send(`load-storage-${key}`, false)
    return
  }
  mainWindow.webContents.send(`load-storage-${key}`, data)
}

export { setItem, getItem, electronStore }
