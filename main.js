const electron = require('electron')
// Module to control application life.
const app = electron.app
// const {Menu, MenuItem, ipcMain} = electron;
const {ipcMain} = require('electron');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({minWidth: 800, minHeight: 600, frame: false, title: 'DVD Pila!', titleBarStyle: 'hidden'})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  settingsWindow = new BrowserWindow({width: 400, height: 300, frame: false, title: 'Settings', show: false, resizable: false});
  settingsWindow.loadURL(`file://${__dirname}/src/settings.html`);

  ipcMain.on('toggle-settings', (event) => {
    if (settingsWindow.isVisible()) {
      settingsWindow.hide();
    } else {
      settingsWindow.show();
    }
    event.sender.send('settings-update');
  });

  ipcMain.on('search', (event, term) => {
    console.log('term:', term);
    event.sender.send('search', term);
  });

  mainWindow.on('resize', (event) => {
    mainWindow.webContents.send('resize', mainWindow.getBounds());
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
