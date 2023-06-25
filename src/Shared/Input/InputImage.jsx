import React, { useState } from 'react';

function InputImage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      <label htmlFor="fileInput">
        {selectedFile ? selectedFile.name : 'No file chosen'}
      </label>
      <button onClick={() => document.getElementById('fileInput').click()}>
        Browse
      </button>
    </div>
  );
}

export default InputImage;
