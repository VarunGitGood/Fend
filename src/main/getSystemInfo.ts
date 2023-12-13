import os from 'os'

export const getSystemInfo = (): any => {
  const osInfo = {
    platform: os.platform(),
    release: os.release(),
    hostname: os.hostname(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuInfo: os.cpus()[0] || {},
    networkInterfaces: os.networkInterfaces() || {},
    ports:
      os.networkInterfaces() &&
      Object.keys(os.networkInterfaces()).map((key) => {
        const networkInterface = os.networkInterfaces()[key]
        if (networkInterface) {
          return networkInterface.map((item) => item.address)
        }
        return []
      })
  }
  return osInfo
}
