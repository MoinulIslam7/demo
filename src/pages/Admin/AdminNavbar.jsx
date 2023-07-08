import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  Minus,
  Plus,
  X,
} from '@phosphor-icons/react';
import AddNewSoftware from '../AddNewSoftware/AddNewSoftware';
import AddNewUser from '../AddNewUser/AddNewUser';
import ModalWrapper from '../../Shared/ModalWrapper/ModalWrapper';
import { Avatar, Logo } from '../../Assets/SVGcomponents';
import { useAuth } from '../../Contexts/AuthProvider';
import UserNav from '../../Shared/userNav/UserNav';
import Modal from '../../Shared/ModalWrapper/Modal';

/**
 * Renders the Admin Navbar component.
 * @returns {JSX.Element} Admin Navbar component.
 */

export default function AdminNavbar() {
  const userNavRef = useRef();
  const { user } = useAuth();

  const handleModal = (ref) => {
    if (ref) {
      ref.current?.classList?.remove('hidden');
    }
  };

  const [isAddNewUserOpen, setIsAddNewUserOpen] = useState(false);
  const [isAddNewSoftwareOpen, setIsAddNewSoftwareOpen] = useState(false);

  const toggleAddNewUser = () => {
    setIsAddNewUserOpen(!isAddNewUserOpen);
  };

  const toggleAddNewSoftware = () => {
    setIsAddNewSoftwareOpen(!isAddNewSoftwareOpen);
  };

  return (
    <div className="bg-heading flex justify-between items-center px-5 text-white cursor-pointer">
      <div className="flex justify-start items-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="ml-3 mr-11 opacity-30">
          <p>V1.0</p>
        </div>
        <Link to="/" className="mr-4 p-2 hover:bg-[#ffffff33]">
          Home
        </Link>
        <Link to="/Useractivity" className="mr-4 p-2 hover:bg-[#ffffff33]">
          Activity
        </Link>

        <div>
          <ModalWrapper isOpen={isAddNewSoftwareOpen} toggleModal={toggleAddNewSoftware}>
            <div className="content">
              <AddNewSoftware setIsAddNewSoftwareOpen={setIsAddNewSoftwareOpen} />
            </div>
          </ModalWrapper>
          <button className="mr-4 p-2 flex justify-center items-center gap-1" onClick={toggleAddNewSoftware}>
            <Plus />
            Add New Software
          </button>
        </div>
        <div>
          <ModalWrapper isOpen={isAddNewUserOpen} toggleModal={toggleAddNewUser}>
            <div className="content">
              <AddNewUser setIsModalOpen={setIsAddNewUserOpen} />
            </div>
          </ModalWrapper>

          <button className="mr-4 p-2 flex justify-center items-center gap-1" onClick={toggleAddNewUser}>
            <Plus />
            Add New User
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="p-4">
          <button className="flex justify-start gap-1 items-center" onClick={() => handleModal(userNavRef)}>
            {user?.image ? <img className="w-full h-full rounded-full" src={user.image} alt="" /> : <Avatar />}
          </button>
          <Modal modalRef={userNavRef}>
            <UserNav />
          </Modal>
        </div>
        <div className="hover:bg-[#ffffff33] p-4">
          <Minus color="#ffffffa6" />
        </div>
        <div className="hover:bg-[#ffffff33] p-4">
          <Copy color="#ffffffa6" />
        </div>
        <div className="hover:bg-[#ffffff33] p-4">
          <X color="#ffffffa6" />
        </div>
      </div>
    </div>
  );
}
