const {app, BrowserWindow, screen} = require('electron')

app.commandLine.appendSwitch('disable-gpu-vsync')
app.commandLine.appendSwitch('disable-frame-rate-limit')
app.commandLine.appendSwitch('enable-begin-frame-scheduling')
app.commandLine.appendSwitch('disable-gpu-compositing')
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion')
app.commandLine.appendSwitch('disable-renderer-backgrounding')
app.commandLine.appendSwitch('disable-background-timer-throttling')
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows')

function createWindow(){
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    alwaysOnTop: true,
    focusable: true,
    transparent: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences:{
      preload: __dirname + "/preload.js",
      contextIsolation:true,
      nodeIntegration:false,
      offscreen:false,
      backgroundThrottling:false
    }
  })

  win.loadFile("index.html")
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)
