import { CaretDown } from '@phosphor-icons/react';
import React, { useRef, useState } from 'react';
import useOnclickOutside from '../../Hooks/UseOnClickOutSide';

function Dropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef();
  useOnclickOutside(ref, () => setIsDropdownOpen(false));

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center whitespace-nowrap rounded border border-borderColor font-semibold px-6 pb-2 pt-2.5 w-28"
        type="button"
        id="dropdownMenuButton1"
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
          className="absolute z-50 float-left m-0 w-28 list-none overflow-hidden rounded-lg border-none bg-white text-left text-textPrimary shadow-lg"
          aria-labelledby="dropdownMenuButton1"
        >
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2"
              href="./Dropdown.jsx"
            >
              Activity
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2 "
              href="./Dropdown.jsx"
            >
              Edit
            </a>
          </li>
          <li>
            <a
              className="block w-full whitespace-nowrap bg-transparent px-4 py-2"
              href="./Dropdown.jsx"
            >
              Delete
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
