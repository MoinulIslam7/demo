import { Upload } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Input from '../../Shared/Input/Input';
import req from '../../utils/network/req';
import Loading from '../../Shared/Loading/Loading';
import '../UserActivity/UserActivity.css';
import DropdownInput from '../../Shared/DropdownInput/DropdownInput';

export default function AddNewUser() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  const onsubmit = (data) => {
    setIsLoading(true);
    req({ target: 'registers', body: data })
      .then((res) => {
        console.log(res);
        navigate('/');
        reset();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (isLoading) return <Loading />;

  return (
    <div className="box absolute m-auto right-0 left-0 top-0 bottom-0 w-[564px] h-5/6 bg-white cursor-pointer rounded-[8px] p-8 text-[#000000]">
      <h2 className="font-medium">Add New User</h2>
      <hr className="opacity-10 mt-2" />
      <form onSubmit={handleSubmit(onsubmit)} className="mt-8">
        <div className="border border-primary rounded-[50px] cursor-pointer my-4">
          <label htmlFor="logo" className="flex justify-between items-center px-8">
            <div className="flex items-center py-5 gap-2">
              <Upload />
              <p className="text-textPrimary block">
                Upload logo. (JPG, PNG)
              </p>
            </div>
            <div>
              <p className="text-textPrimary px-5 py-2 bg-background rounded-[50px]">Chose file</p>
              <input hidden type="file" id="logo" />
            </div>
          </label>
        </div>
        <div className="">
          <Input label="Name" register={{ ...register('name') }} />
        </div>
        <div className="">
          <Input label="Username" register={{ ...register('userName') }} />
        </div>
        <div className="">
          <Input label="Email Address" register={{ ...register('email') }} />
        </div>
        <div className="">
          <Input label="Password" register={{ ...register('password') }} />
        </div>
        <div>
          <DropdownInput register={register} name="role" />
        </div>
        <div className="flex justify-end items-center">
          <input type="submit" className="bg-primary text-white rounded-[50px] text-whote py-4 px-8" value="Add New" />
        </div>
      </form>
    </div>
  );
}
