import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import UserNavbar from './UserNavbar';
import { useAuth } from '../../Contexts/AuthProvider';
import ImageShow from '../../Shared/ImageShow/ImageShow';
/**
 * Renders the user's home page with recently used software and all software options.
 *
 * This component displays the user's home page,
 * which includes sections for recently used software and
 * all available software. It utilizes the `UserNavbar`
 * component for the navigation bar. The recently
 * used software section shows a grid of software
 * items with their respective icons and names. The all
 * software section includes a search input field and a grid of
 * software items fetched from the user's data.
 *
 * @returns {JSX.Element} The rendered user home page.
 */

export default function UserHome() {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <UserNavbar />
      </div>
      <div className="bg-background">
        <div className="px-20 py-11">
          <p className="text-heading text-extrabold text-xl pb-9">Recently Used</p>
          <div className="flex justify-start gap-8 items-center">
            <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center">
              <img src="" alt="" />
              <p className="mt-2 text-base">Figma</p>
            </div>
            <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center">
              <img src="" alt="" />
              <p className="mt-2 text-base">Vs Code</p>
            </div>
            <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center">
              <img src="" alt="" />
              <p className="mt-2 text-base">Photoshop</p>
            </div>
            <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center">
              <img src="" alt="" />
              <p className="mt-2 text-base">Team</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[70px]">
        <div className="mt-24">
          <div className="flex items-center justify-start mb-5">
            <div className="w-2/12"><p className="text-heading text-extrabold text-xl">All Software</p></div>
            <div className="w-full relative">
              <MagnifyingGlass size={20} className="absolute top-4 left-4" />
              <input type="text" className="w-full p-3 rounded-[50px] pl-12 border-2 border-borderColor outline-none" placeholder="All Software" />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-8">
            {
              user.app?.map((software) => (
                <div key={software.id} className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center border border-borderColor">
                  <div>
                    <ImageShow path={software.image} />
                  </div>
                  <p className="mt-2 text-base">{software.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
