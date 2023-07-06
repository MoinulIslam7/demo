import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import UserNavbar from './UserNavbar';
import {
  Figma, PhotoShop, Team, Vscode,
} from '../../Assets/SVGcomponents';
import { useAuth } from '../../Contexts/AuthProvider';

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
              <Figma />
              <p className="mt-2 text-base">Figma</p>
            </div>
            <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center">
              <Vscode />
              <p className="mt-2 text-base">Vs Code</p>
            </div>
            <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center">
              <PhotoShop />
              <p className="mt-2 text-base">Photoshop</p>
            </div>
            <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center">
              <Team />
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
                <div className="px-5 py-5 bg-white w-[120px] h-[120px] rounded-[24px] flex flex-col justify-center items-center border border-borderColor">
                  <img src={software.image} alt="" />
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
