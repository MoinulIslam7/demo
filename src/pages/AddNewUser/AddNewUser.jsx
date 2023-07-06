import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Input from '../../Shared/Input/Input';
import '../UserActivity/UserActivity.css';
import RoleInput from '../../Shared/RoleInput/RoleInput';
import SoftwarePermissionInput from '../../Shared/SoftwarePermissionInput/SoftwarePermissionInput';
import { useAuth } from '../../Contexts/AuthProvider';
import '../Admin/AdminHome.css';
import ImageUpload from '../../Shared/InputImage/InputImage';

export default function AddNewUser({ setIsAddNewUserOpen }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectApps, setSelectedApps] = useState([]);
  const {
    registerUser,
  } = useAuth();

  const { handleSubmit, register } = useForm();

  const onsubmit = (data) => {
    const appIds = selectApps.map((a) => a.id);
    const formData = { ...data, role: selectedOption, app: appIds };
    setIsAddNewUserOpen(false);
    registerUser(formData);
  };

  return (
    <div className="w-[564px] h-[55rem] bg-white cursor-pointer rounded-[8px] p-8 text-[#000000]">
      <h2 className="font-medium">Add New User</h2>
      <hr className="opacity-10 mt-2" />
      <form onSubmit={handleSubmit(onsubmit)} className="mt-8">
        <div>
          <ImageUpload register={{ value: register('image') }} />
        </div>

        <div>
          <Input label="Name" register={{ ...register('name') }} />
        </div>
        <div>
          <Input label="Username" register={{ ...register('userName') }} />
        </div>
        <div>
          <Input label="Email Address" register={{ ...register('email') }} />
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
