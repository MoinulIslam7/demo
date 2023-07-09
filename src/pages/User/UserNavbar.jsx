import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Minus, X } from '@phosphor-icons/react';
import { useAuth } from '../../Contexts/AuthProvider';
import { Logo } from '../../Assets/SVGcomponents';
import UserNav from '../../Shared/userNav/UserNav';
import Modal from '../../Shared/ModalWrapper/Modal';
import ImageShow from '../../Shared/ImageShow/ImageShow';
/**
 * Renders the user navigation bar with various icons and a dropdown menu.
 *
 * This component displays a navigation bar at the top of the page,
 * typically used for user-related actions.
 * It includes a logo, user avatar, and several icons for different actions.
 * Clicking on the user avatar opens
 * a dropdown menu with additional user-related options.
 *
 * @returns {JSX.Element} The rendered user navigation bar.
 */

export default function UserNavbar() {
  const userNavRef = useRef();
  const { user } = useAuth();

  return (
    <div className="bg-heading flex justify-between items-center px-5 text-white cursor-pointer">
      <div className="flex justify-start items-center">
        <Link to="/home"><Logo /></Link>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="p-1">
          <button className="flex justify-start gap-1 items-center" onClick={() => userNavRef.current.classList.remove('hidden')}>
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-white">
              <ImageShow path={user?.avatar} />
            </div>
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
