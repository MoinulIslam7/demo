/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { At, Envelope } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Contexts/AuthProvider';
import ImageShow from '../../Shared/ImageShow/ImageShow';
import UserNavbar from './UserNavbar';

/**
 * Renders the user profile page with the user's information and an option to update the profile.
 *
 * This component displays the user's profile information, including their avatar, username, name, and email.
 * It allows the user to update their profile by submitting a form with new information. The form includes
 * fields for the user's name and email. Upon submission, the profile is updated using the `updateOwn` function
 * from the `useAuth` context. The avatar image can also be changed, but that functionality is currently commented out.
 *
 * @returns {JSX.Element} The rendered user profile page.
 */

export default function UserProfile() {
  const { user, updateOwn } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState();
  const { handleSubmit, reset } = useForm();

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
    setSelectedAvatar(avatar);
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
      <UserNavbar />
      <div className="mx-96">
        <h2 className="text-xl font-medium leading-6 text-mediumText mt-9 mb-1">Profile</h2>
        {/* <p className="text-body">You can change your profile information here.</p> */}
        <div className="flex justify-start items-center gap-5 mt-12">
          {
            user?.avatar && (
              <div className="w-[100px] h-[100px] rounded-[50px] overflow-hidden">
                {
                  selectedAvatar ? <img src={URL.createObjectURL(selectedAvatar)} alt="" /> : <ImageShow path={user?.avatar} />
                }
              </div>
            )
          }
          {/* <div>
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
          </div> */}
        </div>
        <form className="mt-2 w-12 lg:w-6/12" onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-6 bg-bodyBg rounded-[50px] flex justify-start items-center gap-3 opacity-60">
            <At />
            <p>{user?.userName}</p>
          </div>
          <div className="mt-4 py-6 px-6 bg-bodyBg rounded-[50px] flex justify-start items-center gap-3 opacity-60">
            <Envelope />
            <p>{user?.name}</p>
          </div>
          <div className="mt-4 py-6 px-6 bg-bodyBg rounded-[50px] flex justify-start items-center gap-3 opacity-60">
            <Envelope />
            <p>{user?.email}</p>
          </div>
          {/* <div>
            <Input label="Name" Icon={Envelope}
             register={{ ...register('name') }} defaultValue={user?.name} />
          </div>
          <div>
            <Input label="Email" Icon={Envelope}
             register={{ ...register('email') }} defaultValue={user?.email} />
          </div> */}
          <div className="flex justify-end items-center cursor-pointer mt-4">
            <input type="submit" className="bg-primary text-white cursor-pointer rounded-[50px] py-4 px-8" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
