/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const isDev = require('electron-is-dev');
const {
  app, BrowserWindow, screen, ipcMain, desktopCapturer,
} = require('electron');
const fs = require('fs');

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
  mainWindow.loadURL(isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`);

  // Handle the capture-screenshot event from the renderer process
  ipcMain.on('capture-screenshot', async () => {
    try {
      const sources = await desktopCapturer.getSources({ types: ['screen'] });
      const screenshotPath = path.join(__dirname, 'screenshots');
      if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
      }

      const timestamp = new Date().getTime();
      const screenshotFilename = `screenshot_${timestamp}.png`;
      const screenshotFilePath = path.join(screenshotPath, screenshotFilename);

      const source = sources.find((source1) => source1.name === 'Entire screen');

      if (source) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: 800,
              maxWidth: 1920,
              minHeight: 600,
              maxHeight: 1080,
            },
          },
        });

        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        const bitmap = await imageCapture.grabFrame();
        const imageBitmap = await createImageBitmap(bitmap);

        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const buffer = Buffer.from(imageData.data);
        fs.writeFileSync(screenshotFilePath, buffer);

        // Send the file path back to the renderer process
        mainWindow.webContents.send('screenshot-captured', screenshotFilePath);
      }
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  });

  // Open the DevTools in development mode.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create a window in the app when the
  // dock icon is clicked and no other windows are open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
