import React, { useState } from 'react';
import '../Input/Input.css';
/**
 * Renders a role input component.
 *
 * This component provides an input field with a dropdown menu of role options.
 * The user can select a role from the dropdown, and the selected role is managed
 * and updated through the `selectedOption` and `setSelectedOption` props.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @param {string} props.selectedOption - The currently selected role.
 * @param {function} props.setSelectedOption - The function to update the selected role.
 * @returns {JSX.Element} The rendered role input component.
 */

function RoleInput({ label, selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['user', 'super admin', 'admin'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="w-full inputDiv">
      <div className="flex justify-start items-center border border-primary rounded-[50px] outerInput">
        <input
          type="text"
          value={selectedOption}
          onChange={() => { }}
          onClick={toggleDropdown}
          className="w-full customInput"
          readOnly
        />
        <label htmlFor="Input" className={`${selectedOption ? ' customLabel' : 'absolute left-14'}`}>
          {label}
        </label>
        {isOpen && (
          <ul className="absolute z-50 w-full mt-48 bg-white rounded-md shadow-lg">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => selectOption(option)}
                onKeyDown={() => { }}
                className="px-14 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RoleInput;
