import React, { useRef } from 'react';
import { Plus } from '@phosphor-icons/react';
import {
  Ellipse,
  Avatar,
} from '../../Assets/SVGcomponents';
import Tooltip from '../../Shared/Tooltip/Tooltip';
import { softwares } from '../../Data/data';
import './UserActivity.css';
import img1 from '../../Assets/Images/img1.jpg';
import img2 from '../../Assets/Images/img2.jpg';
import img3 from '../../Assets/Images/img3.jpg';
import img4 from '../../Assets/Images/img4.jpg';
import DateComponent from './DateComponent';
import SoftwarePermission from './SoftwarePermission';
import AdminNavbar from '../Admin/AdminNavbar';
import ModalWrapper from '../../Hooks/ModalWrapper';

function UserActivity() {
  const softwareRef = useRef();
  return (
    <div>
      <div>
        <AdminNavbar />
      </div>
      <div className="bg-background">
        <div className="pt-9 pb-11 px-[70px] flex justify-between">
          <div className="flex items-center">
            <p className="font-medium text-xl leading-6 text-textPrimary mr-3">User Activity</p>
            <Tooltip information="User All Activity" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex justify-start items-center py-3 px-2 bg-white">
              <Avatar />
              <p className="ml-2">Jacob Jones</p>
            </div>
            <DateComponent />
          </div>
        </div>
        <div className="px-[90px] flex justify-start items-center pb-5 ">
          <div className=" w-4/12">
            <p className="text-body text-[20px] leading-6 mb-7">User Details</p>
            <div className="flex justify-start items-center gap-2">
              <Avatar className="w-20 h-20" />
              <div>
                <p className="text-[20px] leading-6">Jacob Jones</p>
                <p className="text-body">michelle.rivera@example.com</p>
              </div>
            </div>
          </div>
          <div className="w-8/12">
            <p className="text-body text-[20px] leading-6 mb-7">Software Permission list</p>
            <div className="flex justify-start items-center gap-3">
              {
                softwares.slice(0, 3).map((s) => (
                  <div key={s.id} className="p-5 bg-white w-20 h-20 border border-borderColor rounded-3xl flex justify-center items-center">
                    <s.icon />
                  </div>
                ))
              }
              <div>
                <div onClick={() => softwareRef.current.classList.remove('hidden')} role="contentinfo" onKeyDown={() => { }} className="py-5 bg-white w-20 h-20 border border-borderColor rounded-3xl flex justify-center items-center cursor-pointer">
                  <Plus color="#50AB27" />
                </div>
                <ModalWrapper modalRef={softwareRef}>
                  <SoftwarePermission />
                </ModalWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[70px] mt-12">
        <div>
          <div className="flex justify-start items-center gap-2 mb-5">
            <Ellipse />
            <p>11:00 am - 12:00 pm</p>
          </div>
          <div className="grid grid-cols-6 gap-5">
            <img className="w-full h-full" src={img1} alt="" />
            <img className="w-full h-full" src={img2} alt="" />
            <img className="w-full h-full" src={img3} alt="" />
            <img className="w-full h-full" src={img4} alt="" />
            <img className="w-full h-full" src={img1} alt="" />
            <img className="w-full h-full" src={img3} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
