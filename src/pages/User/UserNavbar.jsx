import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Minus, X } from '@phosphor-icons/react';
import { useAuth } from '../../Contexts/AuthProvider';
import { Avatar, Logo } from '../../Assets/SVGcomponents';
import UserNav from '../../Shared/userNav/UserNav';
import Modal from '../../Shared/ModalWrapper/Modal';

export default function UserNavbar() {
  const userNavRef = useRef();
  const { user } = useAuth();

  return (
    <div className="bg-heading flex justify-between items-center px-5 text-white cursor-pointer">
      <div className="flex justify-start items-center">
        <Link to="/home"><Logo /></Link>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="p-4">
          <button className="flex justify-start gap-1 items-center" onClick={() => userNavRef.current.classList.remove('hidden')}>
            {
              user?.image ? <img className="w-full h-full rounded-full" src={user.image} alt="" /> : <Avatar />
            }
          </button>
          <Modal modalRef={userNavRef}>
            <UserNav />
          </Modal>
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
