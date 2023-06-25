import React from 'react';
import {
  Minus,
  Copy,
  X,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import { softwares } from '../../Data/data';
import {
  Figma,
  Logo,
  Meet,
  PhotoShop,
  Team,
  Vscode,
  Zoom,
} from '../../Assets/SVGcomponents';
import UserNavbar from '../User/UserNavbar';

function Home() {
  return (
    <div className="">
      <div className="bg-heading flex justify-between items-center px-5">
        <Logo />
        <div className="flex flex-row justify-center items-center gap-4">
          <UserNavbar />
          <div className=" hover:bg-[#ffffff33] p-4">
            <Minus color="#ffffffa6" />
          </div>
          <div className=" hover:bg-[#ffffff33] p-4">
            <Copy color="#ffffffa6" />
          </div>
          <div className=" hover:bg-[#ffffff33] p-4">
            <X color="#ffffffa6" />
          </div>
        </div>
      </div>
      <div className="bg-background pt-11 pb-12 px-[70px]">
        <p className="pb-9 text-xl font-medium text-heading">Recently used</p>
        <div className="flex items-center gap-8">
          <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
            <Figma />
            <p className="text-heading pt-2">Figma</p>
          </div>
          <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
            <Vscode />
            <p className="text-heading pt-2">Vs Code</p>
          </div>
          <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
            <PhotoShop />
            <p className="text-heading pt-2">Photoshop CC</p>
          </div>
          <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
            <Team />
            <p className="text-heading pt-2">Team</p>
          </div>
          <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
            <Zoom />
            <p className="text-heading pt-2">Zoom</p>
          </div>
          <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
            <Meet />
            <p className="text-heading pt-2">Meet</p>
          </div>
        </div>
      </div>

      <div className="mt-[89px] px-[70px]">
        <div className="flex items-center gap-[70px] ">
          <p className="text-xl font-medium text-heading w-1/12">All Software</p>
          <label htmlFor="email" className="relative border border-[#0405011a] p-[14px] rounded-[50px] w-11/12">
            <MagnifyingGlass className="absolute inset-y-0 top-3 left-0 flex items-center w-7  h-7 pl-2" />
            <input type="search" name="" className="pl-6 focus:outline-none w-full" placeholder="Search..." autoComplete="off" />
          </label>
        </div>
        <div className="mt-5 grid grid-cols-10 gap-8">
          {
            softwares.map(((software) => (
              <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
                <software.icon />
                <p className="text-heading pt-2">{software.name}</p>
              </div>
            )))
          }
        </div>
        <div className="mt-5 grid grid-cols-10 gap-8">
          {
            softwares.map(((software) => (
              <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
                <software.icon />
                <p className="text-heading pt-2">{software.name}</p>
              </div>
            )))
          }
        </div>
        <div className="mt-5 grid grid-cols-10 gap-8">
          {
            softwares.map(((software) => (
              <div className="px-30 bg-white w-[135px] h-[135px] border border-borderColor rounded-3xl flex flex-col justify-center items-center">
                <software.icon />
                <p className="text-heading pt-2">{software.name}</p>
              </div>
            )))
          }
        </div>
      </div>
    </div>
  );
}
export default Home;
