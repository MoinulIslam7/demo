/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { At, Envelope } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import Input from '../../Shared/Input/Input';
import { useAuth } from '../../Contexts/AuthProvider';
import ImageShow from '../../Shared/ImageShow/ImageShow';
import AdminNavbar from './AdminNavbar';
/**
 * Renders the admin profile page.
 *
 * This component displays the admin's profile information,
 * including the avatar, username, name, and email.
 * The admin can update their profile information,
 * such as the name and email, by submitting the form.
 * The avatar can also be changed by selecting a new image file.
 * The component utilizes the `Input` component for form inputs
 * with icons and the `useAuth` hook to access
 * the user data and the `updateOwn` function for updating the user's own profile information.
 *
 * @returns {JSX.Element} The rendered admin profile page.
 */

export default function AdminProfile() {
  const { user, updateOwn } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
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
    const avatar = data.avatar[0];
    const formData = new FormData();
    const payload = {
      avatar,
      data: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    };
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
    updateOwn(formData);
    reset();
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
          {
            user?.avatar && (
              <div className="w-[100px] h-[100px] rounded-[50px] overflow-hidden">
                {
                  selectedAvatar ? <img src={URL.createObjectURL(selectedAvatar)} alt="" /> : <ImageShow path={user?.avatar} />
                }
              </div>
            )
          }
          <div>
            <label htmlFor="avatar-change-upload" className="cursor-pointer">
              <p className="text-white px-6 py-3 bg-primary rounded-[50px] mb-2">Change Photo</p>
              <input
                hidden
                type="file"
                id="avatar-change-upload"
                {...register('avatar', {
                  onChange: (e) => {
                    setSelectedAvatar(e.target.files[0]);
                  },
                })}
              />
            </label>
            <div className="mt-4 ml-2 text-extrabold">
              {selectedAvatar ? selectedAvatar.name : ' '}
            </div>
          </div>
        </div>
        <form className="mt-2 w-12 lg:w-6/12" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-6 bg-bodyBg rounded-[50px] flex justify-start items-center gap-3 opacity-60">
            <At />
            <p>{user?.userName}</p>
          </div>
          <div>
            <Input label="Name" Icon={Envelope} register={{ ...register('name') }} defaultValue={user.name} />
          </div>
          <div>
            <Input label="Email" Icon={Envelope} register={{ ...register('email') }} defaultValue={user.email} />
          </div>
          <div className="flex justify-end items-center cursor-pointer">
            <input type="submit" className="bg-primary text-white cursor-pointer rounded-[50px] py-4 px-8" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
