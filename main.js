// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const {autoUpdater} = require("electron-updater");


let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 500})
  mainWindow.setMaximizable(false)
  mainWindow.setResizable(false);
//  mainWindow.webContents.openDevTools()
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=> {
  createWindow()
  autoUpdater.checkForUpdates();
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('appVersion', app.getVersion());
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for updates...');
});

autoUpdater.on('update-avilable', info => {
  console.log('Update available');
  console.log('Version', info.version);
  console.log('Release date', info.releaseDate);
  dialog.showMessageBox({type:"info", message:"Update is available (Downloading right now!) don\'t exit the software untill it restarts (Can take up to 10 min depends on your network)"});
});

autoUpdater.on('update-not-available', info => {
  console.log(info)
});

autoUpdater.on('download-progress', p => {
  mainWindow.webContents.send('updatePercent', `- updating: ${Math.floor(p.percent)}%`);
  console.log(`Progress ${Math.floor(p.percent)}%`);
});

autoUpdater.on('update-downloaded', info => {
  autoUpdater.quitAndInstall();
});
