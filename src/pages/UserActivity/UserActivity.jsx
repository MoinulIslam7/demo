import React, { useRef, useState, useEffect } from 'react';
import { CaretDown, Plus } from '@phosphor-icons/react';
import { useParams } from 'react-router-dom';
import {
  Ellipse,
} from '../../Assets/SVGcomponents';
import Tooltip from '../../Shared/Tooltip/Tooltip';
import './UserActivity.css';
import img1 from '../../Assets/Images/img1.jpg';
import img2 from '../../Assets/Images/img2.jpg';
import img3 from '../../Assets/Images/img3.jpg';
import img4 from '../../Assets/Images/img4.jpg';
import DateComponent from './DateComponent';
import SoftwarePermission from './SoftwarePermission';
import AdminNavbar from '../Admin/AdminNavbar';
import { useAuth } from '../../Contexts/AuthProvider';
import Modal from '../../Shared/ModalWrapper/Modal';
import ImageShow from '../../Shared/ImageShow/ImageShow';

/**
 * Renders the User Activity component.
 * @returns {JSX.Element} User Activity component.
 */

function UserActivity() {
  const [selectedUser, setSelectedUser] = useState({});
  const { id } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const softwareRef = useRef();
  const { allusers } = useAuth();
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (id) {
      const user = allusers.find((u) => u.id === id);
      if (user) {
        setSelectedUser(user);
      }
    }
  }, [id, allusers]);

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
            <div ref={ref} className="relative bg-white cursor-pointer">
              <div
                className="flex justify-between items-center whitespace-nowrap rounded border border-borderColor font-semibold px-2 py-2 w-auto"
                id={`dropdownMenuButton_${selectedUser?.id || ''}`}
                onClick={toggleDropdown}
                onKeyDown={() => { }}
                role="contentinfo"
              >
                <div className="flex justify-start items-center gap-4">
                  <div className="w-10 h-10 rounded-[50px] overflow-hidden">
                    <ImageShow path={selectedUser.avatar} />
                  </div>
                  <div>
                    {selectedUser.id ? selectedUser.name : 'Select User'}
                  </div>
                </div>
                <span className="ml-2">
                  <CaretDown size={20} />
                </span>
              </div>
              {isDropdownOpen && (
                <ul
                  className="absolute z-50 float-left m-0 w-40 list-none overflow-hidden rounded-lg border-none bg-white text-left text-textPrimary shadow-lg"
                  aria-labelledby={`dropdownMenuButton_${selectedUser?.id || ''}`}
                >
                  {allusers.map((user) => (
                    <li key={user.id} className="flex justify-start items-left">
                      <div className="w-10 h-10 rounded-[50px] overflow-hidden ml-2 my-1">
                        <ImageShow path={user.avatar} />
                      </div>
                      <button
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2"
                        onClick={() => handleUserSelect(user)}
                      >
                        {user.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <DateComponent />
          </div>
        </div>
        {selectedUser.id && (
          <div className="px-[90px] flex justify-start items-center pb-5 ">
            <div className="w-4/12">
              <p className="text-body text-[20px] leading-6 mb-7">User Details</p>
              <div className="flex justify-start items-center gap-2">
                <div className="w-20 h-20 rounded-[50px] overflow-hidden ml-2 my-1">
                  <ImageShow path={selectedUser.avatar} />
                </div>
                <div>
                  <p className="text-[20px] leading-6">{selectedUser?.name}</p>
                  <p className="text-body">{selectedUser?.email}</p>
                </div>
              </div>
            </div>
            <div className="w-8/12">
              <p className="text-body text-[20px] leading-6 mb-7">Software Permission list</p>
              <div className="flex justify-start items-center gap-3">
                {selectedUser?.app?.slice(0, 7).map((s) => (
                  <div
                    key={s.id}
                    className="p-5 bg-white w-24 h-24 border border-borderColor rounded-3xl flex justify-center items-center"
                  >
                    <div className="w-16 h-16">
                      <ImageShow path={s.image} />
                    </div>
                  </div>
                ))}
                <div>
                  <div
                    onClick={() => softwareRef.current.classList.remove('hidden')}
                    role="contentinfo"
                    onKeyDown={() => { }}
                    className="py-5 bg-white w-24 h-24 border border-borderColor rounded-3xl flex justify-center items-center cursor-pointer"
                  >
                    <Plus color="#50AB27" />
                  </div>
                  <Modal modalRef={softwareRef}>
                    <SoftwarePermission
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                    />
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        )}
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
