/* eslint-disable react/jsx-props-no-spreading */
import { Upload } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Input from '../../Shared/Input/Input';
import RoleInput from '../../Shared/RoleInput/RoleInput';
import SoftwarePermissionInput from '../../Shared/SoftwarePermissionInput/SoftwarePermissionInput';
import { useAuth } from '../../Contexts/AuthProvider';
import '../Admin/AdminHome.css';
import ImageShow from '../../Shared/ImageShow/ImageShow';

/**
 * Renders the Edit User component.
 * @param {string} id - User ID.
 * @param {function} setIsOpenEdit - Function to toggle edit mode.
 * @returns {JSX.Element} Edit User component.
 */
export default function EditUser({ id, setIsOpenEdit }) {
  const { allusers } = useAuth();
  const user = allusers.find((u) => u.id === id);
  const [selectedOption, setSelectedOption] = useState(user?.role);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectApps, setSelectedApps] = useState(user?.app);
  const { updateOne } = useAuth();

  const { handleSubmit, register, reset } = useForm();

  const onsubmit = (data) => {
    Object.keys(data).forEach((key) => {
      if (
        data[key] === ''
        || data[key] === {}
        || data[key] === undefined
        || data[key] === []
        || data[key] === {}
        || data[key] === null
      ) {
        delete data[key];
      }
    });
    const appIds = selectApps.map((a) => a.id);
    const avatar = data?.avatar[0];
    const formData = new FormData();
    const payload = {
      avatar,
      data: JSON.stringify({
        name: data.name,
        userName: data.userName,
        email: data.email,
        password: data.password,
        role: selectedOption,
        app: appIds,
      }),
    };
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
    updateOne(id, formData);
    setIsOpenEdit(false);
    setSelectedAvatar(null);
    reset();
  };

  return (
    <div className="w-[564px] h-5/6 bg-white cursor-pointer rounded-[8px] p-8 text-[#000000]">
      <h2 className="font-medium">
        Update
        <span className="mx-1.5 font-extrabold">{user.name}</span>
      </h2>
      <hr className="opacity-10 mt-2" />
      <form onSubmit={handleSubmit(onsubmit)} className="mt-8">
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 mr-4 rounded-[50px] overflow-hidden">
            <ImageShow path={user.avatar} />
          </div>
          <div className="border border-primary rounded-[50px] cursor-pointer my-4">
            <label htmlFor="avatar-edit" className="flex justify-between items-center px-8">
              <div className="flex items-center py-5 gap-2">
                <Upload />
                <p className="text-textPrimary block w-[12rem]">
                  {selectedAvatar ? selectedAvatar.name : 'Upload logo. (JPG, PNG)'}
                </p>
              </div>
              <div>
                <p className="text-textPrimary px-5 py-2 bg-background rounded-[50px]">Choose file</p>
                <input
                  hidden
                  type="file"
                  id="avatar-edit"
                  {...register('avatar', {
                    onChange: (e) => {
                      setSelectedAvatar(e.target.files[0]);
                    },
                  })}
                />
              </div>
            </label>
          </div>
        </div>
        <div>
          <Input label="Name" register={{ ...register('name') }} defaultValue={user.name} />
        </div>
        <div>
          <Input label="Username" register={{ ...register('userName') }} defaultValue={user.userName} />
        </div>
        <div>
          <Input label="Email Address" register={{ ...register('email') }} defaultValue={user.email} />
        </div>
        <div>
          <Input label="Password" register={{ ...register('password') }} />
        </div>
        <div>
          <SoftwarePermissionInput
            label="Software Permission"
            selectApps={selectApps}
            setSelectedApps={setSelectedApps}
          />
        </div>
        <div>
          <RoleInput label="Role" selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </div>
        <div className="flex justify-end items-center">
          <input type="submit" className="bg-primary cursor-pointer text-white rounded-[50px] py-4 px-8" value="Update" />
        </div>
      </form>
    </div>
  );
}
