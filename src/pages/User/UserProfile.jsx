import React from 'react';
import { At, Envelope, Lock } from '@phosphor-icons/react';
import { Avatar } from '../../Assets/SVGcomponents';
import AdminNavbar from '../Admin/AdminNavbar';
import Input from '../../Shared/Input/Input';

export default function UserProfile() {
  return (
    <div className="text-textPrimary">
      <div>
        <AdminNavbar />
      </div>
      <div className="mx-96">
        <h2 className="text-xl font-medium leading-6 text-mediumText mt-14 mb-1">Profile </h2>
        <p className="text-body mb-12">You can change your profile information here.</p>
        <p className="mb-4 text-body text-lg leading-6">Upload your profile photo</p>
        <div className="flex justify-start items-center gap-5">
          <Avatar className="w-[100px] h-[100px]" />
          <div>
            <label htmlFor="logo" className="">
              <p className="text-white px-6 py-3 bg-primary rounded-[50px] mb-2">Change Photo</p>
              <input hidden type="file" id="logo" />
              <p>/this is my photo.png</p>
            </label>
          </div>
        </div>
        <form className="mt-8 w-6/12">
          <div className="py-6 px-6 bg-bodyBg rounded-[50px] flex justify-start items-center gap-3 opacity-60">
            <At />
            <p>username</p>
          </div>
          <div>
            <Input label="Email" Icon={Envelope} />
          </div>
          <div>
            <Input label="Current Password" Icon={Lock} />
          </div>
          <div>
            <Input label="New Password" Icon={Lock} />
          </div>
          <div>
            <Input label="New Password" Icon={Lock} />
          </div>
          <div className="flex justify-end items-center">
            <input type="submit" className="bg-primary text-white rounded-[50px] text-whote py-4 px-8" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
