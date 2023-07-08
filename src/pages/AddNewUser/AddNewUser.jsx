/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { Upload } from '@phosphor-icons/react';
import Input from '../../Shared/Input/Input';
import '../UserActivity/UserActivity.css';
import RoleInput from '../../Shared/RoleInput/RoleInput';
import SoftwarePermissionInput from '../../Shared/SoftwarePermissionInput/SoftwarePermissionInput';
import { useAuth } from '../../Contexts/AuthProvider';
import '../Admin/AdminHome.css';

/**
 * Renders the Add New User component.
 * @param {Object} props - Component props.
 * @param {function} props.setIsAddNewUserOpen -
 *  Function to set the state of the Add New User modal.
 * @returns {JSX.Element} Add New User component.
 */

export default function AddNewUser({ setIsAddNewUserOpen }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectApps, setSelectedApps] = useState([]);
  const [selectedImage, setSelectedImage] = useState(false);
  const { registerUser } = useAuth();

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data) => {
    const appIds = selectApps.map((a) => a.id);
    const avatar = data.image[0];
    const formData = new FormData();
    const payload = {
      avatar,
      ...data,
      role: selectedOption,
      app: appIds,
    };
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
    setIsAddNewUserOpen(false);
    registerUser(formData);
    reset();
  };

  return (
    <div className="w-[564px] h-5/6 bg-white cursor-pointer rounded-[18px] p-8 text-[#000000]">
      <h2 className="font-medium">Add New User</h2>
      <hr className="opacity-10 mt-2" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
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
        <div>
          <Input label="Name" register={register('name')} />
        </div>
        <div>
          <Input label="Username" register={register('userName')} />
        </div>
        <div>
          <Input label="Email Address" register={register('email')} />
        </div>
        <div>
          <Input label="Password" register={register('password')} />
        </div>
        <div>
          <SoftwarePermissionInput
            label="Software Permission"
            selectApps={selectApps}
            setSelectedApps={setSelectedApps}
          />
        </div>
        <div>
          <RoleInput
            label="Role"
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
        <div className="flex justify-end items-center">
          <input type="submit" className="bg-primary cursor-pointer text-white rounded-[50px] py-4 px-8" value="Add New" />
        </div>
      </form>
    </div>
  );
}
