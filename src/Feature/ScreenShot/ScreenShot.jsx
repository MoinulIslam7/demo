import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScreenShot() {
  const [screenshots, setScreenshots] = useState([]);

  const saveImage = async (blob) => {
    try {
      const formData = new FormData();
      const timestamp = Date.now();
      const imageName = `screenshot_${timestamp}.png`;
      formData.append('image', blob, imageName);
      const response = await axios.post('http://localhost:9998/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imagePath = response.data.path;

      setScreenshots((prevScreenshots) => [
        ...prevScreenshots,
        { path: imagePath, timestamp, date: new Date(timestamp).toLocaleString() },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const takeScreenshot = async () => {
    const { mediaDevices } = navigator;
    if (mediaDevices && mediaDevices.getDisplayMedia) {
      const stream = await mediaDevices.getDisplayMedia({ video: true });
      const track = stream.getVideoTracks()[0];

      const imageCapture = new ImageCapture(track);
      const bitmap = await imageCapture.grabFrame();

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      context.drawImage(bitmap, 0, 0);

      canvas.toBlob(async (blob) => {
        await saveImage(blob);

        track.stop();
        stream.getVideoTracks().forEach((track1) => track1.stop());
      }, 'image/png');
    }
  };

  useEffect(() => {
    const screenshotInterval = setInterval(takeScreenshot, 120000);

    return () => clearInterval(screenshotInterval);
  }, []);

  return (
    <div>
      <button onClick={takeScreenshot}>Take Screenshot</button>
      {screenshots.map((screenshot, index) => (
        <div key={screenshot.id}>
          <img src={screenshot.path} alt={`Screenshot ${index}`} />
          <p>
            Timestamp:
            {' '}
            {screenshot.timestamp}
          </p>
          <p>
            Date:
            {' '}
            {screenshot.date}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ScreenShot;
