/* eslint-disable react/jsx-props-no-spreading */
import { Upload } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../Admin/AdminHome.css';
import Input from '../../Shared/Input/Input';
// import { useGlobalCtx } from '../../Contexts/GlobalProvider';

export default function AddNewSoftware({ setIsAddNewSoftwareOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleSubmit, register, reset } = useForm();
  // const { createSoftware } = useGlobalCtx();
  function convertImageToBase64(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(image);
    });
  }

  const onsubmit = async (data) => {
    const { name, path } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('path', path);

    if (selectedImage) {
      try {
        const base64Image = await convertImageToBase64(selectedImage);
        formData.append('image', base64Image);

        console.log('formData:', formData);

        setIsAddNewSoftwareOpen(false);
        // createSoftware(formData);
        reset();
      } catch (error) {
        console.log('Image conversion failed:', error);
      }
    } else {
      console.log('No image selected');

      setIsAddNewSoftwareOpen(false);
      // createSoftware(formData);
      reset();
    }
  };

  return (
    <div className="w-[564px] h-[30rem] bg-white cursor-pointer rounded-[8px] p-8 text-[#000000]">
      <h2 className="font-medium">Add New software</h2>
      <hr className="opacity-10 mt-2" />
      <form onSubmit={handleSubmit(onsubmit)} className="mt-8">
        <div className="">
          <Input label="Software Name" register={{ ...register('name') }} />
        </div>
        <div className="">
          <Input label="Software Path" register={{ ...register('path') }} />
        </div>
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
                {...register('image', {
                  onChange: (e) => {
                    setSelectedImage(e.target.files[0]);
                  },
                })}
              />
            </div>
          </label>
        </div>
        <div className="flex justify-end items-center cursor-pointer">
          <input type="submit" className="bg-primary text-white cursor-pointer rounded-[50px] py-4 px-8" value="Add New" />
        </div>
      </form>
    </div>
  );
}
