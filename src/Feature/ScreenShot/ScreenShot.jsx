/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

function ScreenshotComponent() {
  const [screenshotsArray, setScreenshotsArray] = useState([]);

  useEffect(() => {
    // Listen for IPC message from Electron.js main process
    ipcRenderer.on('screenshot-captured', (_, filePath) => {
      setScreenshotsArray((prevArray) => [...prevArray, filePath]);
    });

    // Clean up the array periodically (e.g., remove old screenshots)
    const cleanupInterval = setInterval(() => {
      setScreenshotsArray((prevArray) => prevArray.slice(-10)); // Keep the last 10 screenshots
    }, 60000); // Clean up every minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(cleanupInterval);
  }, []);

  const takeScreenshot = () => {
    ipcRenderer.send('capture-screenshot');
  };

  // Trigger the initial screenshot capture
  useEffect(() => {
    takeScreenshot();
  }, []);

  // Trigger the next screenshot capture every 2 minutes
  useEffect(() => {
    const screenshotInterval = setInterval(() => {
      takeScreenshot();
    }, 120000); // Capture every 2 minutes

    // Clean up the interval when the component unmounts
    return () => clearInterval(screenshotInterval);
  }, []);

  return (
    <div>
      {screenshotsArray.map((filePath) => (
        <img key={filePath} src={filePath} alt="Screenshot" />
      ))}
    </div>
  );
}

export default ScreenshotComponent;
