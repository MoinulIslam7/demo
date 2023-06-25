import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Minus,
  Plus,
  X,
} from '@phosphor-icons/react';
// import { Logo } from '../../Assets/SVGcomponents';
import AddNewSoftware from '../AddNewSoftware/AddNewSoftware';
import AddNewUser from '../AddNewUser/AddNewUser';
import UserNavbar from '../User/UserNavbar';
import ModalWrapper from '../../Hooks/ModalWrapper';
import useUser from '../../Hooks/useUser';
import { Avatar } from '../../Assets/SVGcomponents';

export default function AdminNavbar() {
  const newUserRef = useRef();
  const newSoftwareref = useRef();
  const userNavRef = useRef();
  const { user } = useUser();

  return (
    <div className="bg-heading flex justify-between items-center px-5 text-white cursor-pointer">
      <div className="flex justify-start items-center">
        <Link to="/">Logo</Link>
        <div className="ml-3 mr-11 opacity-30">
          <p>V1.0</p>
        </div>
        <Link to="/" className="mr-4 p-2 hover:bg-[#ffffff33]">Home</Link>
        <Link to="/Useractivity" className="mr-4 p-2 hover:bg-[#ffffff33] ">Activity</Link>

        <div className="mr-4 p-2">
          <button className="flex justify-start gap-1 items-center" onClick={() => newSoftwareref.current.classList.remove('hidden')}>
            <Plus />
            Add New Software
          </button>
          <ModalWrapper modalRef={newSoftwareref}>
            <AddNewSoftware />
          </ModalWrapper>
        </div>
        <div className="mr-4 p-2">
          <button className="flex justify-start gap-1 items-center" onClick={() => newUserRef.current.classList.remove('hidden')}>
            <Plus />
            Add New User
          </button>
          <ModalWrapper modalRef={newUserRef}>
            <AddNewUser />
          </ModalWrapper>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="p-4">
          <button className="flex justify-start gap-1 items-center" onClick={() => userNavRef.current.classList.remove('hidden')}>
            {
              user?.image ? <img className="w-full h-full rounded-full" src={user.image} alt="" /> : <Avatar />
            }

          </button>
          <ModalWrapper modalRef={userNavRef}>
            <UserNavbar />
          </ModalWrapper>
        </div>
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
  );
}
