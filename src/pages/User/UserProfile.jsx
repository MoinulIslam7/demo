import React, { useRef } from 'react';
import { At, Envelope } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { Avatar } from '../../Assets/SVGcomponents';
import AdminNavbar from '../Admin/AdminNavbar';
import Input from '../../Shared/Input/Input';
import { useAuth } from '../../Contexts/AuthProvider';

export default function UserProfile() {
  const { user, updateOwn } = useAuth();
  const { register, handleSubmit } = useForm();
  const avatarInputRef = useRef(null);

  const handleAvatarChange = () => {
    const file = avatarInputRef.current.files[0];
    const fileName = file ? file.name : '';
    console.log('Selected file:', fileName);
  };

  const onSubmit = (data) => {
    const updatedData = {
      name: data.name,
      email: data.email,
    };
    updateOwn(updatedData);
  };

  return (
    <div className="text-textPrimary">
      <div>
        <AdminNavbar />
      </div>
      <div className="mx-96">
        <h2 className="text-xl font-medium leading-6 text-mediumText mt-9 mb-1">Profile</h2>
        <p className="text-body mb-12">You can change your profile information here.</p>
        <div className="flex justify-start items-center gap-5">
          {user?.avatar ? (
            <Avatar className="w-[100px] h-[100px]" src={user.avatar} alt="User Avatar" />
          ) : (
            <Avatar className="w-[100px] h-[100px]" />
          )}
          <div>
            <label htmlFor="avatar" className="cursor-pointer">
              <p className="text-white px-6 py-3 bg-primary rounded-[50px] mb-2">Change Photo</p>
              <input
                type="file"
                id="avatar"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </label>
            {avatarInputRef.current && avatarInputRef.current.files.length > 0 && (
              <p>{avatarInputRef.current.files[0].name}</p>
            )}
          </div>
        </div>
        <form className="mt-2 w-12 lg:w-6/12" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-6 bg-bodyBg rounded-[50px] flex justify-start items-center gap-3 opacity-60">
            <At />
            <p>{user?.userName}</p>
          </div>
          <div>
            <Input label="Name" Icon={Envelope} register={{ ...register('name') }} />
          </div>
          <div>
            <Input label="Email" Icon={Envelope} register={{ ...register('email') }} />
          </div>
          <div className="flex justify-end items-center">
            <input
              type="submit"
              className="bg-primary text-white rounded-[50px] text-whote py-4 px-8 cursor-pointer"
              value="Save"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
