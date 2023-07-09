/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from '@phosphor-icons/react';
import Input from '../../Shared/Input/Input';
import '../Admin/AdminHome.css';
import { useGlobalCtx } from '../../Contexts/GlobalProvider';
/**
 * Renders a form for adding new software.
 *
 * This component provides a form with input fields for adding new software. The form includes fields for
 * software name, software path, and uploading a logo image. The component utilizes the `useForm` hook from
 * `react-hook-form` for form handling and validation. It also uses the `Input` component for rendering input fields.
 * The form data is submitted using the `handleSubmit` function, and the `createSoftware` function from the
 * `useGlobalCtx` hook is used to create the new software.
 *
 * @param {Object} props - The component props.
 * @param {function} props.setIsAddNewSoftwareOpen - A function to set the state of whether the add new software form is open.
 * @returns {JSX.Element} The rendered add new software form.
 */

export default function AddNewSoftware({ setIsAddNewSoftwareOpen }) {
  const { handleSubmit, register, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
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
    setSelectedImage(null);
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
