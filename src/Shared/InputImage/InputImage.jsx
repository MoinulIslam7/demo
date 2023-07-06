import { Upload } from '@phosphor-icons/react';
import React, { useState } from 'react';

function ImageUpload({ register }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    register({ value: file }); // Pass the selected file to the register function
  };

  return (
    <div className="border border-primary rounded-[50px] cursor-pointer my-4">
      <label htmlFor="logo" className="flex justify-between items-center px-8">
        <div className="flex items-center py-5 gap-2">
          <Upload />
          <p className="text-textPrimary block">
            {selectedImage ? selectedImage.name : 'Upload logo. (JPG, PNG)'}
          </p>
        </div>
        <div>
          <p className="text-textPrimary px-5 py-2 bg-background rounded-[50px]">Choose file</p>
          <input
            hidden
            type="file"
            id="logo"
            onChange={handleImageChange}
          />
        </div>
      </label>
    </div>
  );
}

export default ImageUpload;
