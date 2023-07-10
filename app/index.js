// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const isDev = require('electron-is-dev');
// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, screen } = require('electron');

let mainWindow;
function createWindow() {
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width,
    height,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  // and load the index.html of the app.
  console.log(__dirname);
  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`);
  // mainWindow.loadURL(path.join(__dirname, '../build/index.html'));
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
