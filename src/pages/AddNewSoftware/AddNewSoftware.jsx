/* eslint-disable react/jsx-props-no-spreading */
import { Upload } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalCtx } from '../../Contexts/GlobalProvider';
import Input from '../../Shared/Input/Input';
import '../Admin/AdminHome.css';

/**
 * Renders the Add New Software component.
 * @param {Object} props - Component props.
 * @param {function} props.setIsAddNewSoftwareOpen
 * - Function to set the state of the Add New Software modal.
 * @returns {JSX.Element} Add New Software component.
 */
export default function AddNewSoftware({ setIsAddNewSoftwareOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleSubmit, register, reset } = useForm();
  const { createSoftware } = useGlobalCtx();

  const onSubmit = async (data) => {
    const fd = new FormData();
    const image = data.image[0];
    const payload = {
      image,
      data: JSON.stringify({
        name: data.name,
        path: data.path,
      }),
    };
    Object.keys(payload).forEach((key) => fd.append(key, payload[key]));
    createSoftware(fd);
    setIsAddNewSoftwareOpen(false);
    setSelectedImage(false);
    reset();
  };

  return (
    <div className="w-[564px] h-3/6 bg-white cursor-pointer rounded-[18px] p-8 text-[#000000]">
      <h2 className="font-medium">Add New Software</h2>
      <hr className="opacity-10 mt-2" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="">
          <Input label="Software Name" register={register('name')} />
        </div>
        <div className="">
          <Input label="Software Path" register={register('path')} />
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
