import React, { useRef, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import useOnclickOutside from '../../Hooks/UseOnClickOutSide';
import { useAuth } from '../../Contexts/AuthProvider';
import EditUser from '../../pages/EditUser/EditUser';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

function Dropdown({ id }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const ref = useRef();
  useOnclickOutside(ref, () => setIsDropdownOpen(false));
  const { removeUser } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleOpenEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const handleDeleteUser = () => {
    removeUser(id);
    setIsDropdownOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center whitespace-nowrap rounded border border-borderColor font-semibold px-6 pb-2 pt-2.5 w-28"
        type="button"
        id={`dropdownMenuButton_${id}`}
        aria-expanded={isDropdownOpen}
        onClick={toggleDropdown}
      >
        Action
        <span className="ml-2 w-2">
          <CaretDown size={20} />
        </span>
      </button>
      {isDropdownOpen && (
        <ul
          className="absolute z-50  m-0 w-28 list-none overflow-hidden rounded-lg border-none bg-white text-left text-textPrimary shadow-lg"
          aria-labelledby={`dropdownMenuButton_${id}`}
        >
          <li>
            <Link
              to={`/useractivity/${id}`}
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-center"
            >
              Activity
            </Link>
          </li>
          <li>
            <div>
              <ModalWrapper isOpen={isOpenEdit} toggleModal={toggleOpenEdit}>
                <div className="content">
                  <EditUser setIsOpenEdit={setIsOpenEdit} id={id} />
                </div>
              </ModalWrapper>
              <button
                onClick={toggleOpenEdit}
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2"
              >
                Edit
              </button>
            </div>
          </li>
          <li>
            <button
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2"
              onClick={handleDeleteUser}
            >
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
