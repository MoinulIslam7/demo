import { Upload } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../Admin/AdminHome.css';
import Input from '../../Shared/Input/Input';
import Loading from '../../Shared/Loading/Loading';
import req from '../../utils/network/req';

export default function AddNewSoftware() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleSubmit, register, reset } = useForm();

  const onsubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    req({ target: 'create', body: data })
      .then((res) => {
        console.log(res);
        reset();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="box absolute m-auto right-0 left-0 top-0 bottom-0 w-[564px] h-[30rem] bg-white cursor-pointer rounded-[8px] p-8 text-[#000000]">
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
                onChange={(e) => {
                  register('image', { value: e.target.files[0] });
                  setSelectedImage(e.target.files[0]); // Update selectedImage state
                }}
              />
            </div>
          </label>
        </div>
        <div className="flex justify-end items-center">
          <input type="submit" className="bg-primary text-white rounded-[50px] text-white py-4 px-8" value="Add New" />
        </div>
      </form>
    </div>
  );
}
