/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload } from '@phosphor-icons/react';
import Input from '../../Shared/Input/Input';
import '../UserActivity/UserActivity.css';
import RoleInput from '../../Shared/RoleInput/RoleInput';
import SoftwarePermissionInput from '../../Shared/SoftwarePermissionInput/SoftwarePermissionInput';
import { useAuth } from '../../Contexts/AuthProvider';
import '../Admin/AdminHome.css';
/**
 * Renders a form for adding a new user.
 *
 * This component provides a form with input fields for adding a new user. The form includes fields for
 * uploading an avatar, name, username, email address, password, software permission, and role.
 * The component utilizes the `useForm` hook from `react-hook-form` for form handling and validation.
 * It also uses the `Input` component for rendering input fields, the `SoftwarePermissionInput` component
 * for selecting software permissions, and the `RoleInput` component for selecting the user's role.
 * The form data is submitted using the `handleSubmit` function, and the `registerUser` function from the
 * `useAuth` hook is used to register the new user.
 *
 * @param {Object} props - The component props.
 * @param {function} props.setIsAddNewUserOpen - A function to set the state of whether the add new user form is open.
 * @returns {JSX.Element} The rendered add new user form.
 */

export default function AddNewUser({ setIsAddNewUserOpen }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectApps, setSelectedApps] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { registerUser } = useAuth();

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data) => {
    const appIds = selectApps.map((a) => a.id);
    const avatar = data.avatar[0];
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
    setIsAddNewUserOpen(false);
    setSelectedAvatar(null);
    registerUser(formData);
    reset();
  };

  return (
    <div className="w-[564px] h-5/6 bg-white cursor-pointer rounded-[18px] p-8 text-[#000000]">
      <h2 className="font-medium">Add New User</h2>
      <hr className="opacity-10 mt-2" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="border border-primary rounded-[50px] cursor-pointer my-4">
          <label htmlFor="avatar-upload" className="flex justify-between items-center px-8">
            <div className="flex items-center py-5 gap-2">
              <Upload />
              <p className="text-textPrimary block">
                {selectedAvatar ? selectedAvatar.name : 'Upload logo. (JPG, PNG)'}
              </p>
            </div>
            <div>
              <p className="text-textPrimary px-5 py-2 bg-background rounded-[50px]">Choose file</p>
              <input
                hidden
                type="file"
                id="avatar-upload"
                {...register('avatar', {
                  onChange: (e) => {
                    setSelectedAvatar(e.target.files[0]);
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
        <div className="flex justify-end items-center cursor-pointer">
          <input type="submit" className="bg-primary text-white cursor-pointer rounded-[50px] py-4 px-8" value="Add New" />
        </div>
      </form>
    </div>
  );
}
