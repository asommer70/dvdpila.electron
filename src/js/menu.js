const {remote, ipcRenderer} = require('electron');
const {Menu, MenuItem} = remote;

var template = [
  {
    label: 'Electron',
    submenu: [
      {
        label: 'Settings',
        accelerator: 'Shift+Command+S',
        click: () => { ipcRenderer.send('toggle-settings') }
      },
      {
        label: 'Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click: (item, focusedWindow) => { if (focusedWindow) {focusedWindow.webContents.toggleDevTools();} }
      },
      {
        label: 'Close',
        accelerator: 'Command+w',
        selector: 'close:',
        role: 'close'
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Website',
        click: () => { remote.shell.openExternal('http://dvdpila.thehoick.com') }
      },
    ]
  }
];
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
