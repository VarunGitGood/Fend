const ipcRenderer = (window as any).ipcRenderer

export const saveDataToStore = (
  key: string,
  value: any,
  fileName: 'runs.json' | 'scripts.json' | 'groups.json'
): void => {
  const data = { key, value, fileName }
  ipcRenderer.send('save-storage', data)
  ipcRenderer.on('save-storage-success', (_event, arg) => {
    console.log(arg)
  })
  ipcRenderer.on('save-storage-error', (_event, arg) => {
    new Error(arg)
  })
}

export const loadDataFromStore = (
  key: string,
  fileName: 'runs.json' | 'scripts.json' | 'groups.json'
): Promise<any> => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('load-storage', { key, fileName })
    ipcRenderer.on('load-storage-success', (_event, arg) => {
      resolve(arg)
    })
    ipcRenderer.on('load-storage-error', (_event, arg) => {
      reject(new Error(arg))
    })
  })
}
